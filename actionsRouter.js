const express = require("express");
const actions = require("./data/helpers/actionModel");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const action = await actions.get();
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: "list of actions not here! " });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
