"use strict";

const Tour = require("../models/tourModel");
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

//   3) Render template using data from 1)
  res.status(200).render("tour", {
    title: tour.name,
    tour,
  });
});
