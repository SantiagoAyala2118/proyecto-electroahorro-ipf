import { PersonModel } from "../models/person.model.js";
import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
//Create a person
export const createPerson = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const person = await PersonModel.create(validatedData);
    return res.status(201).json({
      message: "Person created",
      person,
    });
  } catch (err) {
    console.error("Server error while creating a person", err);
    return res.status(500).json({
      msg: "Server error while creating a person",
    });
  }
};

//Get all people
export const getAllPeople = async (req, res) => {
  try {
    const people = await PersonModel.findAll({
      attributes: {
        exclude: ["dni"],
      },
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: {
            exclude: ["password"],
          },
          include: {
            model: ProfileModel,
            as: "profile",
          },
        },
      ],
    });
    return res.status(200).json({
      people: people,
    });
  } catch (err) {
    console.error("Server error while getting all people", err);
    return res.status(500).json({
      message: "Server error while getting all people",
    });
  }
};

//Get a person
export const getAPerson = async (req, res) => {
  try {
    const person = await PersonModel.findByPk(req.params.id, {
      attributes: {
        exclude: ["dni"],
      },
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: ProfileModel,
          as: "profile",
        },
      ],
    });
    return res.status(200).json({
      person: person,
    });
  } catch (err) {
    console.error("Server error while getting a person", err);
    return res.status(500).json({
      message: "Server error while getting a person",
    });
  }
};

//Update a person
export const updatePerson = async (req, res) => {
  try {
    const validatedData = matchedData(req, { locations: ["body"] });

    if (Object.keys(validatedData) === 0) {
      return res.status(400).json({
        message: "You did not send anything to update",
      });
    }

    const [personUpdated] = await PersonModel.update(validatedData, {
      where: { id: req.params.id },
    });
    return res.status(200).json({
      message: "Person updated",
    });
  } catch (err) {
    console.error("Server error while updating a person", err);
    return res.status(500).json({
      message: "Server error while updating a person",
    });
  }
};

//Delete a person
export const deletePerson = async (req, res) => {
  try {
    await PersonModel.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      message: "Person deleted",
    });
  } catch (err) {
    console.error("Server error while deleting a person", err);
    return res.status(500).json({
      message: "Server error while deleting a person",
    });
  }
};
