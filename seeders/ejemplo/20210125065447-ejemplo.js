'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('ejemplo', [{
      nombre: 'Primer Nombre',
      detalle: 'Primer Detalle',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nombre: 'Segundo Nombre',
      detalle: 'Segundo Detalle',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nombre: 'Tercer Nombre',
      detalle: 'Tercer Detalle',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('ejemplo', null, {});
  }
};
