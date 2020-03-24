const router = require("express").Router();

router.get("/", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({
          message:
            "you can checkout any time you like, but you can never leave...."
        });
      } else {
        res.status(200).json({ message: "logged out successful" });
      }
    });
  } else {
    res.status(200).json({ message: "I don't know you" });
  }
});

module.exports = router;
