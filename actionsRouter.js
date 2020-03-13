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

router.get("/:id", validateActionId(), async (req, res) => {
  try {
    res.status(200).json(req.action);
  } catch (error) {
    next(error);
  }
});

//POST ACTION DEPENDS ON PROJECT ID






router.delete("/:id", validateActionId(), async (req, res, next) => {
  try {
    const count = await actions.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The action has been deleted" });
    } else {
      res.status(404).json({ message: "The action could not be found" });
    }
  } catch (error) {
    next(err);
  }
});

router.put(
  "/:id",
  validateActionId(),
  validateAction(),
  async (req, res, next) => {
    try {
      const action = await actions.update(req.params.id, req.body);
      res.status(200).json(action);
    } catch (error) {
      next(error);
    }
  }
);

//Custom Middleware

function validateActionId() {
  return (req, res, next) => {
    actions
      .get(req.params.id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(400).json({ message: "invalid action id" });
        }
      })
      .catch(err => {
        next(err);
      });
  };
}

function validateAction() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "missing action data" });
    } else if (
      !req.body.notes &&
      !req.body.description &&
      !req.body.project_id
    ) {
      return res.status(400).json({ message: "missing required three fields" });
    }
    next();
  };
}

module.exports = router;
