const express = require("express");
const router = express.Router();
const { Item } = require("../models/item");
const { validate } = require("../models/item");

router.post("/", async (req, res) => {
  //validate the request
  //console.log(req.body);

  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let item = new Item({
    user_id: req.body.user_id,
    status: req.body.status,
    itemname: req.body.itemname,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    condition: req.body.condition,
    images: req.body.images,
    state: req.body.state,
    location: req.body.location,
    sellername: req.body.sellername,
    selleremail: req.body.selleremail,
    sellerphone: req.body.sellerphone,
  });

  const response = await item.save();

  res.status(200).send(response);
});

router.get("/", async (req, res) => {
  const items = await Item.find({ status: "approve" });
  //console.log("Hamza");
  //console.log(items);
  res.status(200).send(items);
});

router.get("/myitems/:id", async (req, res) => {
  //console.log("iner");
  //console.log(req.params.id);
  const items = await Item.find({ user_id: req.params.id });
  //console.log(items);
  res.status(200).send(items);
});

router.delete("/myitems/:id", async (req, res) => {
  //First check this tournament is exists or not...
  //console.log("hahha");
  //console.log(req.params.id);
  let item = await Item.findOne({ _id: req.params.id });
  if (!item) return res.status(400).send("Item not found");

  //If all is okay, then remove this tournament
  item = await Item.findByIdAndRemove(req.params.id);

  res.status(200).send(item);
});

module.exports = router;
