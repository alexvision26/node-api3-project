const express = require("express");

const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error creating user" });
    });
});

router.post("/:id/posts", validatePost, (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const newObj = {
    user_id: id,
    text: text
  };
  Posts.insert(newObj)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error making post" });
    });
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
  const { id } = req.params;
  Users.remove(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error deleting user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Users.update(id, req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error updating user" });
    });
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
    res.status(400).json({ errorMessage: "Missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!req.body) {
    res.status(400).json({ errorMessage: "Missing post data" });
  } else if (!text) {
    res.status(400).json({ errorMessage: "Missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
