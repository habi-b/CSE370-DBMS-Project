const db = require('../config/db');

// Get all goals for the logged-in user
exports.getGoals = async (req, res) => {
    const userId = req.user.userId;
    try {
        const [goals] = await db.query('SELECT * FROM goals WHERE user_id = ?', [userId]);
        res.status(200).json(goals);
    } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ message: 'Server error while fetching goals.' });
    }
};

// Create a new savings goal
exports.createGoal = async (req, res) => {
    const userId = req.user.userId;
    const { title, target_amount, priority, monthly_contribution, target_date, current_amount } = req.body;

    // Basic validation
    if (!title || !target_amount || !priority || !target_date) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO goals (user_id, title, target_amount, priority, monthly_contribution, target_date, current_amount) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, title, target_amount, priority, monthly_contribution, target_date, current_amount || 0]
        );
        // Send the newly created goal
        const [newGoal] = await db.query('SELECT * FROM goals WHERE goal_id = ?', [result.insertId]);
        res.status(201).json(newGoal[0]);
    } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({ message: 'Server error while creating goal.' });
    }
};

// Add a contribution to a specific goal
exports.contributeToGoal = async (req, res) => {
    const userId = req.user.userId;
    const { goalId } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid contribution amount.' });
    }

    try {
        // First, get the goal to ensure it belongs to the user and is not already completed
        const [goals] = await db.query('SELECT * FROM goals WHERE goal_id = ? AND user_id = ?', [goalId, userId]);
        if (goals.length === 0) {
            return res.status(404).json({ message: 'Goal not found or you do not have permission to access it.' });
        }
        const goal = goals[0];

        // Prevent contributing more than the target amount
        const newAmount = parseFloat(goal.current_amount) + parseFloat(amount);
        if (newAmount > goal.target_amount) {
            return res.status(400).json({ message: 'Contribution exceeds the target amount.' });
        }

        // Update the goal's current amount
        await db.query('UPDATE goals SET current_amount = ? WHERE goal_id = ?', [newAmount, goalId]);

        // Fetch and return the updated goal
        const [updatedGoal] = await db.query('SELECT * FROM goals WHERE goal_id = ?', [goalId]);
        res.status(200).json(updatedGoal[0]);
    } catch (error) {
        console.error('Error contributing to goal:', error);
        res.status(500).json({ message: 'Server error while making contribution.' });
    }
};


// Delete a savings goal
exports.deleteGoal = async (req, res) => {
    const userId = req.user.userId;
    const { goalId } = req.params;

    try {
        const [result] = await db.query('DELETE FROM goals WHERE goal_id = ? AND user_id = ?', [goalId, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Goal not found or you do not have permission to delete it.' });
        }

        res.status(200).json({ message: 'Goal deleted successfully.' });
    } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ message: 'Server error while deleting goal.' });
    }
};
