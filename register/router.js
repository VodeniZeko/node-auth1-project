const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("../user/user-model.js");

router.post("/", (req, res) => {
  const userInfo = req.body;
  // const ROUNDS = process.env.HASHING_ROUNDS || 8;
  // const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

  // userInfo.password = hash;

  Users.add(userInfo)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(500).json({ error: "something went wrong" }));
});

module.exports = router;
