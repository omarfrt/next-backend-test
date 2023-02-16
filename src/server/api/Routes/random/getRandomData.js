const express = require("express");
const router = express.Router();

const getRandomData = router.get("/", async (req, res, next) => {
    const forever = new Date(
      new Date() - new Date().getTimezoneOffset()
    ).getTime();
    const recipes = {
      count: 8,
      page: 1,
      recipe:"lkhobz w amlou",
      time: forever,
    };
  
    const stories = {
      count: 8,
      story:"klit lkhobz b amlou w darli srisra",
      page: 1,
      time: forever,
    };
  
    res.status(200).json({ recipes, stories });
  });
  
  module.exports = getRandomData;