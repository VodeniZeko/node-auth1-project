const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("../user/user-model.js");

router.post("/", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = {
          id: user.id,
          username: user.username
        };

        res.status(200).json({ hello: user.username });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "error finding the user" });
    });
});

module.exports = router;
