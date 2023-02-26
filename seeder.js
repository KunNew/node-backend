import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'


import User from './models/userModel.js'
import Color from './models/colorModel.js'

import connectDB from './config/db.js'

import users from './data/user.js'
import colors1 from './data/color.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {

   
    await User.deleteMany()
    await Color.deleteMany()
    // const createdUsers = await User.insertMany(users)

    await User.insertMany(users)
    await Color.insertMany(colors1)


    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {

    await User.deleteMany()
    await Color.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}