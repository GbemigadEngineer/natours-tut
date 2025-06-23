"use strict";

const Tour = require("../models/tourModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Get overview
exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render("overview", {
    title: "ALL TOURS",
    tours,
  });
});

// Get tour
exports.getTour = catchAsync(async (req, res) => {
  // 1)Get the tour data from the collection
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });

  if (!tour) {
    return next(new AppError("There is no tour with that name.", 404));
  }

  //   3) Render template using data from 1)
  res.status(200).render("tour", {
    title: `${tour.name} Tour`,
    tour,
  });
});

// Login

exports.getLoginForm = (req, res, next) => {
  res.status(200).render("login", {
    title: "login page",
  });
};

// View Account
exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your Account",
  });
};

// Update User Data
exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).render("account", {
    title: "Your Account",
    user: updatedUser,
  });
});
