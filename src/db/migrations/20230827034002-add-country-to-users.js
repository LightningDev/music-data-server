'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'country', {
      type: Sequelize.STRING(3),
      allowNull: false
    });
  },

  async down (queryInterface, _) {
    await queryInterface.removeColumn('user', 'country');
  }
};
