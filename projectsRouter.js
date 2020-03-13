const express = require("express");
const projects = require("./data/helpers/projectModel");
const router = express.Router();

//GET All Projects

// router.get("/", (req, res, next) => {
//     projects
//       .get()
//       .then(project => {
//           if(project) {
//         res.status(200).json(project);
//           } else {
//               res.status(404).json({ message: "list of projects not here! "})
//           }
//       })
//       .catch(err => {
//         next(err);
//       });
//   });

router.get("/", async (req, res, next) => {
  try {
    const project = await projects.get();
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "list of projects not here! " });
    }
  } catch (error) {
    next(error);
  }
});

//GET BY ID

//   router.get("/:id", validateProjectId(), (req, res) => {
//     res.status(200).json(req.project);

//     });

router.get("/:id", validateProjectId(), async (req, res) => {
  try {
    res.status(200).json(req.project);
  } catch (error) {
    next(error);
  }
});

//GET list of actions for specific project

// router.get("/:id/actions", validateProjectId(), (req, res, next) => {

//     projects.getProjectActions(req.params.id)
//     .then(actions => {
//         if(actions) {
//             res.status(200).json(actions)
//         } else {
//             res.status(404).json({ message: "The project does not have actions." });
//         }
//     })
//     .catch(err => {
//         next(err)
//     })

// });

router.get("/:id/actions", validateProjectId(), async (req, res, next) => {
  try {
    const actions = await projects.getProjectActions(req.params.id);
    if (actions) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: "The project does not have actions." });
    }
  } catch (error) {
    next(error);
  }
});










//Custom Middleware

//checks project's body (name and description) for POST and PUT request (not for api/projects/:id/actions)
function validateProject() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "missing project data" });
    } else if (!req.body.name && !req.body.description) {
      return res
        .status(400)
        .json({ message: "missing required name and description fields" });
    }
    next();
  };
}

//Checks if id is valid
function validateProjectId() {
  return (req, res, next) => {
    projects
      .get(req.params.id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(400).json({ message: "invalid project id" });
        }
      })
      .catch(err => {
        next(err);
      });
  };
}

//Checks if action body is validated

function validateActionBody() {
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
