import userModel from "../models/user_models.js";

export const registerController = async (req, res) => {
    try {
        const { name, gender, address, amount } = req.body;
        //validations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!gender) {
            return res.send({ message: "Email is Required" });
        }
        if (!address) {
            return res.send({ message: "Password is Required" });
        }
        if (!amount) {
            return res.send({ message: "Phone no is Required" });
        }
        //check user
        const existingUser = await userModel.findOne({ name });
        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Name already registered",
            });
        }
        //register user
        //save
        const user = await new userModel({
            name, gender, address, amount
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }
};


export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel
            .find({});
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While getting users",
            error,
        });
    }
};

export const searchUsersController = async (req, res) => {
    try {
        const { query } = req.query; // Query parameter from the frontend

        if (!query || query.length < 3) {
            return res.status(400).send({ error: "At least 3 characters are required for search" });
        }

        const users = await userModel.find({
            name: { $regex: `^${query}`, $options: "i" },
        });

        res.status(200).send({ success: true, users });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in searching users",
            error,
        });
    }
};


export const updateUserController = async (req, res) => {
    try {
        const { name, gender, address, amount } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                gender: gender || user.gender,
                address: address || user.address,
                amount: amount || user.amount
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "User Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting category",
            error,
        });
    }
};