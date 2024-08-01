const express = require('express');
const router = express.Router();

const { User, Goal, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { requireAuth, restoreUser } = require('../../utils/auth.js')

// GET route handlers

router.get('/current', requireAuth, async (req, res, next) => {

    let goals = await Goal.findAll({
        where: {
            'userId': Number(req.user.id)
        }
    });

    let goalList = [];
    goals.forEach(goal => {
        goalList.push(goal.toJSON())
    });

    goalList.forEach(goal => {
        let create = goal.createdAt.toLocaleString();
        let up = goal.updatedAt.toLocaleString();
        goal.createdAt = create;
        goal.updatedAt = up;
        delete goal.details;
    });

    res.status(200);
    return res.json({ 'Goals': goalList })
});

router.get('/:goalId', async (req, res, next) => {
    let goalId = Number(req.params.goalId);


    let goal = await Goal.findOne({
        where: {
            'id': goalId
        }
    })

    if (!goal) {
        res.status(404);
        return res.json({ message: "Goal couldn't be found"})
    }

    if (Number(goal.userId) !== Number(req.user.id)) {
        res.status(403);
        return res.json({ message: "Forbidden" })
    }

    goal = {
        id: Number(goal.id),
        userId: Number(goal.userId),
        goal: goal.goal,
        details: goal.details,
        achieved: goal.achieved,
        createdAt: goal.createdAt.toLocaleString(),
        updatedAt: goal.updatedAt.toLocaleString()
    }

    res.status(200);
    return res.json({
        id: Number(goal.id),
        userId: Number(goal.userId),
        goal: goal.goal,
        details: goal.details,
        achieved: goal.achieved,
        createdAt: goal.createdAt,
        updatedAt: goal.updatedAt
    })

});

// POST route handlers

router.post('/', requireAuth, async (req, res, next) => {
    const { goal, details, achieved } = req.body;

    let errors = {};

    if (!goal) {
        errors.goal = "Goal is required";
    }

    if (!details) {
        errors.details = "Details is required";
    }

    if (Object.keys(errors).length !== 0) {
        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: errors
        })
    }

    let newGoal = await Goal.create({
        userId: Number(req.user.id),
        goal: goal,
        details: details,
        achieved: achieved,
    });

    res.status(201);
    return res.json({
        id: Number(newGoal.id),
        userId: Number(newGoal.userId),
        goal: newGoal.goal,
        details: newGoal.details,
        achieved: newGoal.achieved,
        createdAt: newGoal.createdAt.toLocaleString(),
        updatedAt: newGoal.updatedAt.toLocaleString()
    });

});

// PUT Route Handlers

router.put('/:goalId', requireAuth, async(req, res, next) => {
    const { goal, details, achieved } = req.body;
    let goalId = Number(req.params.goalId);
    let errors = {};

    let dbGoal = await Goal.findOne({
        where: {
            'id': goalId,

        }
    });

    if (!dbGoal) {
        res.status(404);
        return res.json({ message: "Goal couldn't be found" })
    };

    if (Number(dbGoal.userId) !== Number(req.user.id)) {
        res.status(403);
        return res.json({ message: "Forbidden" })
    }

    if (!goal) {
        errors.goal = "Goal is required";
    }

    if (!details) {
        errors.details = "Details is required";
    }

    if (Object.keys(errors).length !== 0) {
        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: errors
        })
    }

    await dbGoal.update({
        goal: goal,
        details: details,
        achieved: achieved,
    });

    res.status(200);
    return res.json({
        id: Number(dbGoal.id),
        userId: Number(dbGoal.userId),
        goal: dbGoal.goal,
        details: dbGoal.details,
        achieved: dbGoal.achieved,
        createdAt: dbGoal.createdAt.toLocaleString(),
        updatedAt: dbGoal.updatedAt.toLocaleString()
    });

});

// DELETE Route Handlers

router.delete('/:goalId', requireAuth, async (req, res, next) => {
    let goalId = Number(req.params.goalId);

    let goal = await Goal.findOne({
        where: {
            'id': goalId
        }
    });

    if (!goal) {
        res.status(404);
        return res.json({ message: "Goal couldn't be found" })
    }

    if (Number(goal.userId) !== Number(req.user.id)) {
        res.status(403);
        return res.json({ message: "Forbidden" })
    }

    await goal.destroy()

    res.status(200);
    return res.json({ message: "Successfully deleted" })
});

module.exports = router;
