import { client } from "../config/connection.js";

const checkValidUser = async (req, res, next) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({
        message: "Name not defined"
      });
    }

    const usrCollection = client.db('qwerty').collection('user');

    const checkResult = await usrCollection.findOne({ name: name })

    if (!checkResult) {
      return res.status(400).json({
        message: "User not found"
      })
    }

    next();
  } catch (error) {
    console.error("Error while checking for user: ", error);
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

export default checkValidUser