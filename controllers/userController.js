import { client } from "../config/connection.js";

const fetchUser = async (req, res) => {
  try {
    const usrCollection = client.db('qwerty').collection('user');

    const names = await usrCollection.find({}).toArray();

    return res.status(200).json(names);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is not defined"
      })
    }
  
    const usrCollection = client.db('qwerty').collection('user');
  
    // client (mongodb session) -> database (qwerty) -> collection [table] (user)
  
    const result = await usrCollection.insertOne({ name })
  
    if (!result) {
      return res.status(500).json({
        message: "Error while inserting user"
      })
    }
  
    return res.status(201).json({
      message: "Added successfully"
    })
  } catch (error) {
    console.error("Error while adding user:", error)
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const { name, new_name } = req.body;

    if (!name || !new_name) {
      return res.status(400).json({
        message: "Name not defined"
      });
    }

    const usrCollection = client.db('qwerty').collection('user');

    const result = await usrCollection.findOneAndUpdate(
      {
        name: name
      },
      {
        $set: {
          name: new_name
        }
      },
    );

    if (!result) {
      return res.status(500).json({
        message: "Error while updating user"
      });

    }

    return res.status(201).json({
      message: "Updated successfully"
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({
        message: "Name not defined"
      })
    }

    const usrCollection = client.db('qwerty').collection('user')

    const result = await usrCollection.deleteOne({ name: name })

    if (!result) {
      return res.status(500).json({
        message: "Couldn't delete this user"
      })
    }

    return res.status(200).json({
      message: `Deleted user: ${name}`
    })
  } catch (error) {
    console.error("Error deleting user: ", error)
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

const giftUser = async (req, res) => {
  try {
    const { name } = req.body;

    // shifted to middleware

    return res.status(200).json({
      message: `Gifted 1000rs to ${name}`
    })
  } catch (error) {
    console.error("Error while gifting item to user: ", error)
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}


export {
  fetchUser,
  addUser,
  updateUser,
  deleteUser,
  giftUser
}