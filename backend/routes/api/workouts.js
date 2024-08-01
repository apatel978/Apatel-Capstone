const express = require('express');
const router = express.Router();

const { User, Workout, sequelize } = require('../../db/models')
const { Op } = require('sequelize');

const { requireAuth, restoreUser } = require('../../utils/auth.js')

// GET route handlers

router.get('/current', requireAuth, async (req, res, next) => {

    let workouts = await Workout.findAll({
        where: {
            'userId': Number(req.user.id)
        }
    });

    let workoutList = [];
    workouts.forEach(workout => {
        workoutList.push(workout.toJSON())
    });

    workoutList.forEach(workout => {
        let create = workout.createdAt.toLocaleString();
        let up = workout.updatedAt.toLocaleString();
        workout.createdAt = create;
        workout.updatedAt = up;
        delete workout.description;
    });

    res.status(200);
    return res.json({ 'Workouts': workoutList })
});

router.get('/:workoutId', async (req, res, next) => {
    let workoutId = Number(req.params.workoutId);


    let workout = await Workout.findOne({
        where: {
            'id': workoutId
        }
    })

    if (!workout) {
        res.status(404);
        return res.json({ message: "Workout couldn't be found"})
    }

    if (Number(workout.userId) !== Number(req.user.id)) {
        res.status(403);
        return res.json({ message: "Forbidden" })
    }

    workout = {
        id: Number(workout.id),
        userId: Number(workout.userId),
        title: workout.title,
        workout: workout.workout,
        type: workout.type,
        description: workout.description,
        createdAt: workout.createdAt.toLocaleString(),
        updatedAt: workout.updatedAt.toLocaleString()
    }

    res.status(200);
    return res.json({
        id: Number(workout.id),
        userId: Number(workout.userId),
        title: workout.title,
        workout: workout.workout,
        type: workout.type,
        description: workout.description,
        createdAt: workout.createdAt,
        updatedAt: workout.updatedAt
    })

});

// POST route handlers

router.post('/', requireAuth, async (req, res, next) => {
    const { title, workout, type, description } = req.body;

    let errors = {};

    if (!title) {
        errors.title = "Title is required";
    }

    if (!workout) {
        errors.workout = "Workout is required";
    }

    if (!type) {
        errors.type = "Type is required";
    }

    if (!description) {
        errors.description = "Description is required";
    }

    if (Object.keys(errors).length !== 0) {
        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: errors
        })
    }

    let newWorkout = await Workout.create({
        userId: Number(req.user.id),
        title: title,
        workout: workout,
        type: type,
        description: description
    });

    res.status(201);
    return res.json({
        id: Number(newWorkout.id),
        userId: Number(newWorkout.userId),
        title: newWorkout.title,
        workout: newWorkout.workout,
        type: newWorkout.type,
        description: newWorkout.description,
        createdAt: newWorkout.createdAt.toLocaleString(),
        updatedAt: newWorkout.updatedAt.toLocaleString()
    });
});

// PUT route handlers

router.put('/:workoutId', requireAuth, async(req, res, next) => {
    const { title, workout, type, description } = req.body;
    let workoutId = Number(req.params.workoutId);
    let errors = {};

    let dbWorkout = await Workout.findOne({
        where: {
            'id': workoutId
        }
    });

    if (!dbWorkout) {
        res.status(404);
        return res.json({ message: "Workout couldn't be found" })
    };

    if (Number(dbWorkout.userId) !== Number(req.user.id)) {
        res.status(403);
        return res.json({ message: "Forbidden" })
    };

    if (!title) {
        errors.title = "Title is required";
    }

    if (!workout) {
        errors.workout = "Workout is required";
    }

    if (!type) {
        errors.type = "Type is required";
    }

    if (!description) {
        errors.description = "Description is required";
    }

    if (Object.keys(errors).length !== 0) {
        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: errors
        })
    }

    await dbWorkout.update({
        title: title,
        workout: workout,
        type: type,
        description: description
    });

    res.status(200);
    return res.json({
        id: Number(dbWorkout.id),
        userId: Number(dbWorkout.userId),
        title: dbWorkout.title,
        workout: dbWorkout.workout,
        type: dbWorkout.type,
        description: dbWorkout.description,
        createdAt: dbWorkout.createdAt.toLocaleString(),
        updatedAt: dbWorkout.updatedAt.toLocaleString()
    });
});

// DELETE route handlers

router.delete('/:workoutId', requireAuth, async (req, res, next) => {
    let workoutId = Number(req.params.workoutId);

    let workout = await Workout.findOne({
        where: {
            'id': workoutId
        }
    });

    if (!workout) {
        res.status(404);
        return res.json({ message: "Workout couldn't be found" })
    }

    if (Number(workout.userId) !== Number(req.user.id)) {
        res.status(403);
        return res.json({ message: "Forbidden" })
    }

    await workout.destroy()

    res.status(200);
    return res.json({ message: "Successfully deleted" })
});

module.exports = router;
