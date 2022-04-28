// task 13.3
require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await sequelize.query('SELECT author, title, likes FROM blogs',
      { type: QueryTypes.SELECT})

    blogs.forEach(b => console.log(`${b.author}: '${b.title}', ${b.likes} likes`))

    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to database:', error)
  }
}

main()