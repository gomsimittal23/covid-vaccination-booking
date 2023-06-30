const Center = require("../model/Center");

const createCenter = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const newCenter = new Center({
    ...req.body,
  });

  newCenter
    .save()
    .then(() => {
      res.status(200).json("Vaccination center added successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(`Error: ${err}`);
    });
};

const removeCenter = async (req, res) => {
  console.log(req.body);

  res.setHeader("Content-Type", "application/json");

  if (!req.body) {
    res.status(400).json("Please provide the ID");
  }

  const center = await Center.findByIdAndRemove(req.body.id);

  if (center) {
    // console.log(center);
    res.status(200).json("Center deleted successfully");
  } else {
    res.status(400).json("Incorrect ID");
  }
};

const viewCenters = async (req, res) => {
  console.log(req.body);

  res.setHeader("Content-Type", "application/json");

  try {
    const centers = await Center.find(req.body);
    res.status(200).json(centers);
  } catch (error) {
    res.status(400).json(`Error ${error}`);
  }
};

module.exports = {
  createCenter,
  removeCenter,
  viewCenters,
};
