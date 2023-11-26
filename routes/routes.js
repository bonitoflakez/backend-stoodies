import express from "express";

import { fetchUser, addUser, updateUser, deleteUser, giftUser } from "../controllers/userController.js";
import checkValidUser from "../middleware/checkValidUser.js";

const router = express.Router();

router.get("/get", fetchUser)
router.post("/data", addUser)
router.put("/update", updateUser)
router.delete("/delete", deleteUser)

router.post("/gift", checkValidUser, giftUser)

export default router;