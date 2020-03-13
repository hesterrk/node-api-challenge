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











module.exports = router;
