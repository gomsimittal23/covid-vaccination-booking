const User = require("../model/User");

const createUser = (req, res) => {
  console.log(req.body);

  res.setHeader("Content-type", "application/json");

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json("User Already Exist");
    } else {
      const newUser = new User({
        ...req.body,
      });

      newUser
        .save()
        .then(() => {
          res.status(200).json("Added a user");
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(`Error ${err}`);
        });
    }
  });
};

const loginUser = async (req, res) => {
  console.log(req.body);

  res.setHeader("Content-Type", "application/json");

  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    res.status(200).json({
      name: user.name,
      email: user.email,
    });
    // res.status(200).json("Login Success");
  } else {
    res.status(400).json("Invalid Email/Password");
  }
};

module.exports = {
  createUser,
  loginUser,
};
