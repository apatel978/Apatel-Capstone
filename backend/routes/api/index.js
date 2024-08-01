const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const goalsRouter = require('./goals.js');
const workoutRouter = require('./workouts.js')
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/goals', goalsRouter);

router.use('/workouts', workoutRouter)

module.exports = router;
