import { matchedData } from "express-validator";
import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";

//Create profile
export const createProfile = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const profile = await ProfileModel.create(validatedData);
    return res.status(201).json({
      message: "Profile created",
      profile: profile,
    });
  } catch (err) {
    console.error("Server error while creating a profile", err);
    return res
      .status(500)
      .json({ message: "Server error while creating a profile" });
  }
};

//Get all profiles
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.findAll({
      include: {
        model: UserModel,
        as: "user",
        attributes: {
          exclude: ["password"],
        },
      },
    });

    if (!profiles) {
      return res.status(400).json({
        mesage: "There are no profiles in the DB",
      });
    }

    return res.status(200).json({
      message: "Profiles founded",
      profiles: profiles,
    });
  } catch (err) {
    console.error("Server error while getting all the profiles", err);
    return res.status(500).json({
      message: "Server error while getting all the profiles",
    });
  }
};

//Get one profile
export const getOneProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findByPk(req.params.id, {
      include: {
        model: UserModel,
        as: "user",
        attributes: {
          exclude: ["password"],
        },
      },
    });
    return res.status(200).json({
      message: "Profile founded",
      profile: profile,
    });
  } catch (err) {
    console.error("Server error while getting one profile", err);
    return res
      .status(500)
      .json({ message: "Server error while getting one profile" });
  }
};

//Update a profile
export const updateProfile = async (req, res) => {
  try {
    const validatedData = matchedData(req, { locations: ["body"] });
    if (Object.keys(validatedData) === 0) {
      return res.status(400).json({
        message: "You did not send anything to update",
      });
    }
    await ProfileModel.update(validatedData, {
      where: { id: req.params.id },
    });
    return res.status(200).json({
      message: "Profile updated",
    });
  } catch (err) {
    console.error("Server error while updating a profile", err);
    return res.status(500).json({
      message: "Server error while updating a profile",
    });
  }
};

//Delete a profile
export const deleteProfile = async (req, res) => {
  try {
    await ProfileModel.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      message: "Profile deleted",
    });
  } catch (err) {
    console.error("Server error while deleting a profile", err);
    return res.status(500).json({
      message: "Server error while deleting a prifile",
    });
  }
};
