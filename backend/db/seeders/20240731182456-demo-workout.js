'use strict';

const { Workout } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Workout.bulkCreate([
      {
        userId: 1,
        title: 'Pull Day',
        workout: "Vert. Pull, Rows, Dumbbell Curls, Shrugs, Cable Row, all 4 x 8-12",
        type: "Upper Body - Pull",
        desciption: "Vert pull at 100lb, rows at 90, curls at 35, shrugs using bar, cable rows at 100. Should hit between 8 and 12 reps before failure"
      },
      {
        userId: 1,
        title: 'Push Day',
        workout: "Bench Press, Overhead Press, Tricep Dips, Lateral Raises, Cable Fly, all 4 x 8-12",
        type: "Upper Body - Push",
        desciption: "Bench press at 150lb, overhead press at 100, tricep dips with body weight, lateral raises at 20, cable fly at 60. Should hit between 8 and 12 reps before failure"
      },
      {
        userId: 1,
        title: 'Leg Day',
        workout: "Squats, Deadlifts, Leg Press, Lunges, Calf Raises, all 4 x 8-12",
        type: "Lower Body",
        desciption: "Squats at 200lb, deadlifts at 250, leg press at 300, lunges with 40lb dumbbells, calf raises at 200. Should hit between 8 and 12 reps before failure"
      },
      {
        userId: 3,
        title: 'Core Day',
        workout: "Planks, Russian Twists, Leg Raises, Bicycle Crunches, Sit-ups, all 4 x 15-20",
        type: "Core",
        desciption: "Planks for 1 minute, Russian twists with 20lb, leg raises with body weight, bicycle crunches with body weight, sit-ups with body weight. Should hit between 15 and 20 reps before failure"
      },
      {
        userId: 1,
        title: 'Cardio Day',
        workout: "Running, Cycling, Jump Rope, HIIT, Rowing, all 4 x 20-30 minutes",
        type: "Cardio",
        desciption: "Running at moderate pace, cycling on stationary bike, jump rope for endurance, HIIT with body weight, rowing at moderate resistance. Should maintain consistent intensity throughout each session"
      },
      {
        userId: 3,
        title: 'Full Body',
        workout: "Deadlifts, Bench Press, Pull-ups, Squats, Shoulder Press, all 4 x 8-12",
        type: "Full Body",
        desciption: "Deadlifts at 250lb, bench press at 150, pull-ups with body weight, squats at 200, shoulder press at 100. Should hit between 8 and 12 reps before failure"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Workouts";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
