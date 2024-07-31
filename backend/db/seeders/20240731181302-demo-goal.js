'use strict';

const { Goal, sequelize } = require('../models')

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
    await Goal.bulkCreate([
      {
        userId: 1,
        goal: "Lose weight",
        details: "Lose weight through proper meal planning and exercise",
        achieved: false,
      },
      {
        userId: 2,
        goal: "Build muscle",
        details: "Increase muscle mass through strength training and proper nutrition",
        achieved: true,
      },
      {
        userId: 3,
        goal: "Improve flexibility",
        details: "Enhance flexibility through regular yoga and stretching exercises",
        achieved: false,
      },
      {
        userId: 1,
        goal: "Run a marathon",
        details: "Train for a marathon by following a structured running program and maintaining a balanced diet",
        achieved: false,
      },
      {
        userId: 2,
        goal: "Reduce stress",
        details: "Implement stress reduction techniques such as meditation and mindfulness practices",
        achieved: false,
      },
      {
        userId: 3,
        goal: "Improve sleep quality",
        details: "Enhance sleep quality by establishing a consistent bedtime routine and minimizing screen time before bed",
        achieved: true,
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
    options.tableName = "Goals";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
