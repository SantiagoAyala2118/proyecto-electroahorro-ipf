import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { PersonModel } from "../models/person.model.js";

//Create an user
export const createUser = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const user = await UserModel.create(validatedData);
    return res.status(201).json({
      message: "User created succesfuly",
      user: user,
    });
  } catch (err) {
    console.error("Server error while creating an user", err);
    return res.status(500).json({
      message: "Server error while creating an user",
    });
  }
};

//Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: {
        exclude: ["password", "person_id"],
      },
      include: {
        model: PersonModel,
        as: "person",
        attributes: {
          exclude: ["dni"],
        },
      },
    });
    if (users.length === 0) {
      return res.status(400).json({
        message: "There is no users in the DB",
      });
    }

    return res.status(200).json({
      users,
    });
  } catch (err) {
    console.error("Server error while getting all users", err);
    return res.status(500).json({
      message: "Server error while getting all users",
    });
  }
};

//Get one user
export const getOneUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id, {
      attributes: {
        exclude: ["password", "person_id"],
      },
      include: {
        model: PersonModel,
        as: "person",
        exclude: ["dni"],
      },
    });

    if (!user) {
      return res.status(500).json({
        message: "There is no user in the DB with that id",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (err) {
    console.error("Server error while getting one user", err);
    return res.status(500).json({
      message: "Server error while getting one user",
    });
  }
};

//Update an user
export const updateUser = async (req, res) => {
  try {
    const validatedData = matchedData(req, { locations: ["body"] });

    if (Object.keys(validatedData) === 0) {
      return res.status(400).json({
        message: "You did not send anything to update",
      });
    }

    await UserModel.update(validatedData, { where: { id: req.params.id } });

    return res.status(200).json({
      message: "User updated",
    });
  } catch (err) {
    console.error("Server error while updating an user", err);
    return res.status(500).json({
      message: "Server error while updating an user",
    });
  }
};

//Deleting an user
export const deletUser = async (req, res) => {
  try {
    await UserModel.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      message: "User deleted",
    });
  } catch (err) {
    console.error("Server error while deleting an user", err);
    return res.status(500).json({
      message: "Server error while deleting an user",
    });
  }
};
