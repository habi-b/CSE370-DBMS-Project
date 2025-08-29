const db = require('../config/db');

exports.getFinancialInsights = async (req, res) => {
    const userId = req.user.userId;
    
    try {
        const [transactions] = await db.query(`
            SELECT t.*, a.account_type, a.account_number 
            FROM transactions t 
            JOIN accounts a ON t.account_id = a.account_id 
            WHERE a.user_id = ? 
            ORDER BY t.transaction_date DESC
        `, [userId]);
        
        const [goals] = await db.query(`
            SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC
        `, [userId]);
        
        const [bills] = await db.query(`
            SELECT * FROM bills WHERE user_id = ? ORDER BY due_date ASC
        `, [userId]);
        
        const [accounts] = await db.query(`
            SELECT * FROM accounts WHERE user_id = ?
        `, [userId]);
        
        const insights = await generateFinancialInsights(
            transactions, 
            goals, 
            bills, 
            accounts,
            userId
        );
        
        res.status(200).json(insights);
    } catch (error) {
        console.error('Error generating financial insights:', error);
        res.status(500).json({ message: 'Server error while generating financial insights.' });
    }
};

async function generateFinancialInsights(transactions, goals, bills, accounts, userId) {
    const incomeVsExpense = analyzeIncomeVsExpense(transactions);

    const insights = {
        spendingPatterns: analyzeSpendingPatterns(transactions),
        savingsProgress: analyzeSavingsProgress(goals),
        billAnalysis: analyzeBillPayments(bills),
        incomeVsExpense,
        financialHealth: await calculateFinancialHealthScore(transactions, goals, bills, accounts, userId),
        recommendations: []
    };

    insights.spendingPatterns.trends = calculateMonthlyTrends(insights.spendingPatterns.monthly);

    generateRecommendations(insights);

    return insights;
}

function calculateMonthlyTrends(monthlySpending) {
    const months = Object.keys(monthlySpending).sort();
    if (months.length < 2) {
        return { message: "Not enough data to calculate trends" };
    }

    const currentMonth = months[months.length - 1];
    const previousMonth = months[months.length - 2];

    const currentTotal = monthlySpending[currentMonth].total;
    const previousTotal = monthlySpending[previousMonth].total;

    const diff = currentTotal - previousTotal;

    const trends = {
        overall: {
            absoluteChange: diff,
            direction: diff >= 0 ? 'up' : 'down'
        },
        byCategory: {}
    };

    Object.keys(monthlySpending[currentMonth].byCategory).forEach(category => {
        const current = monthlySpending[currentMonth].byCategory[category];
        const previous = monthlySpending[previousMonth].byCategory[category] || 0;
        const categoryDiff = current - previous;

        trends.byCategory[category] = {
            absoluteChange: categoryDiff,
            direction: categoryDiff >= 0 ? 'up' : 'down'
        };
    });

    return trends;
}

function analyzeSpendingPatterns(transactions) {
    const categories = {
        'Groceries': ['shwapno', 'grocery', 'market', 'food'],
        'Transportation': ['pathao', 'ride', 'uber', 'transport', 'bus'],
        'Utilities': ['desco', 'titas', 'wasa', 'bill', 'gas', 'electric'],
        'Entertainment': ['cineplex', 'restaurant', 'movie', 'entertain'],
        'Shopping': ['daraz', 'bata', 'aarong', 'purchase', 'shopping'],
        'Mobile': ['recharge', 'top-up', 'mobile', 'airtel', 'robi', 'gp', 'teletalk'],
        'Other': []
    };
    
    const monthlySpending = {};
    const categorySpending = {};
    
    Object.keys(categories).forEach(category => {
        categorySpending[category] = 0;
    });
    
    transactions.forEach(transaction => {
        if (transaction.transaction_type === 'Debit') {
            const date = new Date(transaction.transaction_date);
            const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            
            if (!monthlySpending[monthYear]) {
                monthlySpending[monthYear] = {
                    total: 0,
                    byCategory: {}
                };
                Object.keys(categories).forEach(category => {
                    monthlySpending[monthYear].byCategory[category] = 0;
                });
            }
            
            let categorized = false;
            const description = transaction.description.toLowerCase();
            
            for (const [category, keywords] of Object.entries(categories)) {
                if (keywords.some(keyword => description.includes(keyword))) {
                    categorySpending[category] += parseFloat(transaction.amount);
                    monthlySpending[monthYear].byCategory[category] += parseFloat(transaction.amount);
                    monthlySpending[monthYear].total += parseFloat(transaction.amount);
                    categorized = true;
                    break;
                }
            }
            
            if (!categorized) {
                categorySpending['Other'] += parseFloat(transaction.amount);
                monthlySpending[monthYear].byCategory['Other'] += parseFloat(transaction.amount);
                monthlySpending[monthYear].total += parseFloat(transaction.amount);
            }
        }
    });
    
    const monthlyTrends = calculateMonthlyTrends(monthlySpending);
    
    return {
        byCategory: categorySpending,
        monthly: monthlySpending,
        trends: monthlyTrends
    };
}

function analyzeSavingsProgress(goals) {
    const progress = [];
    
    goals.forEach(goal => {
        const percentage = (goal.current_amount / goal.target_amount) * 100;
        const monthlyNeeded = calculateMonthlyContributionNeeded(goal);
        
        progress.push({
            goalId: goal.goal_id,
            title: goal.title,
            currentAmount: goal.current_amount,
            targetAmount: goal.target_amount,
            progressPercentage: percentage,
            monthlyContribution: goal.monthly_contribution,
            monthlyNeeded: monthlyNeeded,
            onTrack: goal.monthly_contribution >= monthlyNeeded * 0.9,
            targetDate: goal.target_date
        });
    });
    
    return progress;
}

function calculateMonthlyContributionNeeded(goal) {
    if (!goal.target_date) return 0;
    
    const targetDate = new Date(goal.target_date);
    const now = new Date();
    const monthsRemaining = (targetDate.getFullYear() - now.getFullYear()) * 12 + 
                           (targetDate.getMonth() - now.getMonth());
    
    if (monthsRemaining <= 0) return 0;
    
    const amountNeeded = goal.target_amount - goal.current_amount;
    return amountNeeded / monthsRemaining;
}

function analyzeBillPayments(bills) {
    const now = new Date();
    
    const analysis = {
        totalMonthlyBills: 0,
        byStatus: { Paid: 0, Pending: 0 },
        upcomingBills: [],
        lateBills: []
    };
    
    bills.forEach(bill => {
        analysis.totalMonthlyBills += parseFloat(bill.amount);
        analysis.byStatus[bill.status] = (analysis.byStatus[bill.status] || 0) + 1;
        
        const dueDate = new Date(bill.due_date);
        const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
        
        if (bill.status === 'Pending') {
            if (daysUntilDue <= 7 && daysUntilDue >= 0) {
                analysis.upcomingBills.push({
                    ...bill,
                    daysUntilDue: daysUntilDue
                });
            } else if (daysUntilDue < 0) {
                analysis.lateBills.push({
                    ...bill,
                    daysOverdue: Math.abs(daysUntilDue)
                });
            }
        }
    });
    
    return analysis;
}

function analyzeIncomeVsExpense(transactions) {
    const normalizeType = (t) => (t || '').toString().trim().toLowerCase();
    const parseAmount = (a) => {
        if (typeof a === 'number') return a;
        const cleaned = String(a).replace(/[^\d.-]/g, '');
        const n = parseFloat(cleaned);
        return Number.isFinite(n) ? n : 0;
    };
    const monthKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

    const buckets = new Map();
    for (const tx of transactions) {
        const d = new Date(tx.transaction_date);
        if (isNaN(d)) continue;

        const key = monthKey(d);
        if (!buckets.has(key)) buckets.set(key, { income: 0, expenses: 0 });

        const type = normalizeType(tx.transaction_type);
        const amt = parseAmount(tx.amount);

        if (type === 'credit') {
            buckets.get(key).income += amt;
        } else if (type === 'debit') {
            buckets.get(key).expenses += amt;
        }
    }

    const now = new Date();
    const currentKey = monthKey(now);
    let targetKey = currentKey;

    if (!buckets.has(currentKey)) {
        const keys = Array.from(buckets.keys()).sort();
        if (keys.length === 0) {
            return {
                monthlyIncome: 0,
                monthlyExpenses: 0,
                netCashFlow: 0,
                savingsRate: 0,
                info: { month: currentKey, fallbackUsed: false }
            };
        }
        targetKey = keys[keys.length - 1];
    }

    const { income, expenses } = buckets.get(targetKey) || { income: 0, expenses: 0 };
    const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

    return {
        monthlyIncome: income,
        monthlyExpenses: expenses,
        netCashFlow: income - expenses,
        savingsRate,
        info: { month: targetKey, fallbackUsed: targetKey !== currentKey }
    };
}

async function calculateFinancialHealthScore(transactions, goals, bills, accounts, userId) {
    let score = 100;
    
    const lateBills = bills.filter(bill => {
        const dueDate = new Date(bill.due_date);
        return bill.status === 'Pending' && dueDate < new Date();
    });
    score -= lateBills.length * 5;
    
    const incomeExpense = analyzeIncomeVsExpense(transactions);
    if (incomeExpense.savingsRate < 10) score -= 10;
    if (incomeExpense.savingsRate < 0) score -= 20;
    
    const totalSavings = accounts
        .filter(acc => acc.account_type === 'Savings')
        .reduce((sum, acc) => sum + parseFloat(acc.balance), 0);
    
    const monthlyExpenses = incomeExpense.monthlyExpenses;
    const emergencyFundMonths = monthlyExpenses > 0 ? totalSavings / monthlyExpenses : 12;
    
    if (emergencyFundMonths < 3) score -= 15;
    if (emergencyFundMonths > 6) score += 10;
    
    const onTrackGoals = goals.filter(goal => {
        const monthlyNeeded = calculateMonthlyContributionNeeded(goal);
        return goal.monthly_contribution >= monthlyNeeded * 0.9;
    }).length;
    
    const goalProgressRatio = goals.length > 0 ? onTrackGoals / goals.length : 1;
    if (goalProgressRatio < 0.5) score -= 10;
    if (goalProgressRatio >= 0.8) score += 5;
    
    return Math.max(0, Math.min(100, Math.round(score)));
}

function generateRecommendations(insights) {
    const { spendingPatterns, savingsProgress, billAnalysis, incomeVsExpense, financialHealth } = insights;

    if (
        spendingPatterns.trends.overall &&
        typeof spendingPatterns.trends.overall.absoluteChange === "number" &&
        spendingPatterns.trends.overall.absoluteChange !== 0
    ) {
        const diff = spendingPatterns.trends.overall.absoluteChange;
        const dir = spendingPatterns.trends.overall.direction;

        if (dir === "up") {
            insights.recommendations.push({
                type: "spending",
                priority: "medium",
                message: `Your spending increased by ৳${Math.abs(diff).toLocaleString()} compared to last month.`,
                action: "Review monthly spending"
            });
        } else {
            insights.recommendations.push({
                type: "spending",
                priority: "low",
                message: `Good job! Your spending decreased by ৳${Math.abs(diff).toLocaleString()} compared to last month.`,
                action: "Keep up the savings"
            });
        }
    }

    Object.entries(spendingPatterns.byCategory).forEach(([category, amount]) => {
        if (incomeVsExpense.monthlyIncome > 0 && amount > incomeVsExpense.monthlyIncome * 0.3) {
            insights.recommendations.push({
                type: "spending",
                priority: "high",
                message: `You're spending a large portion of your income on ${category} (৳${amount.toLocaleString()}).`,
                action: "Review category spending"
            });
        }
    });

    savingsProgress.forEach(goal => {
        if (!goal.onTrack) {
            insights.recommendations.push({
                type: "savings",
                priority: goal.priority === "High" ? "high" : "medium",
                message: `Your "${goal.title}" goal is not on track. Consider increasing your monthly contribution from ৳${goal.monthlyContribution} to ৳${goal.monthlyNeeded.toFixed(2)}.`,
                action: "Adjust savings goal"
            });
        }
    });

    if (billAnalysis.lateBills.length > 0) {
        insights.recommendations.push({
            type: "bills",
            priority: "high",
            message: `You have ${billAnalysis.lateBills.length} overdue bill(s). Late payments may affect your credit score.`,
            action: "Pay overdue bills"
        });
    }

    if (billAnalysis.upcomingBills.length > 0) {
        insights.recommendations.push({
            type: "bills",
            priority: "medium",
            message: `You have ${billAnalysis.upcomingBills.length} bill(s) due in the next week.`,
            action: "Schedule bill payments"
        });
    }

    if (financialHealth < 70) {
        insights.recommendations.push({
            type: "general",
            priority: "medium",
            message: `Your financial health score is ${financialHealth}/100. Focus on building emergency savings and reducing debt.`,
            action: "Improve financial health"
        });
    }

    insights.recommendations.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}
