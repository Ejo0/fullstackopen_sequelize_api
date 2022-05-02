const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      default: false,
      allowNull: false,
      validate: {
        min: {
          args: 1991,
          msg: "Min year is 1991"
        },
        isMaxCurrentYear(value) {
          if (value > new Date().getFullYear()) {
            throw new Error('Max year is current year')
          }
        }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      default: false,
      validate: {
        min: 1991,
        isMaxCurrentYear(value) {
          if (value > new Date().getFullYear()) {
            throw new Error('Max year is current year')
          }
        }
      }
    })
  },
}
