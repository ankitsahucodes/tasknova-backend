const UserDB = require("../models/user.model")

async function getAllUsers() {
  try {
     const allUsers = await UserDB.find();
     return allUsers
  } catch (error) {
    throw error
  }
}

module.exports = {
    getAllUsers
}