const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_list')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Session)
Session.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings'})
Blog.belongsToMany(User, { through: ReadingList, as: 'readings'})
User.hasMany(ReadingList)
Blog.hasMany(ReadingList)
ReadingList.belongsTo(User)
ReadingList.belongsTo(Blog)

module.exports = { Blog, User, ReadingList, Session }
