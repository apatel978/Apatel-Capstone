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

module.exports = router;
