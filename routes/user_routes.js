import express from "express";
import {
    deleteUserController,
    getAllUsersController,
    registerController,
    searchUsersController, updateUserController
} from "../controllers/user_controllers.js";

const router = express.Router();

router.post("/register", registerController);
router.get("/users", getAllUsersController);
router.get("/search", searchUsersController);
router.put("/update/:id", updateUserController)
router.delete("/delete/:id", deleteUserController)

export default router;
