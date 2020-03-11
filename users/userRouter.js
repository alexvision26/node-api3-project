const express = require("express");

const Users = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  Users.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error retrieving users" });
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  Users.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error retrieving users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error retrieving user" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getUserPosts(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error retrieving posts" });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      if (user.id) {
        console.log(user);
        next();
      } else {
        res.status(400).json({ errorMessage: "User not found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error finding credentials" });
    });
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!req.body) {
    res.status(400).json({ errorMessage: "Missing user data" });
  } else if (!name) {
    res.status(400).json({ errorMessage: "Missing required text field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
