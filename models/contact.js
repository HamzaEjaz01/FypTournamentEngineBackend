const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactScheema = Schema({
    email: { type: String, required: true, },
    name: {
        type: String,
        required: [true, "User name is must"],
        min: 3,
        max: 25,
    },
    description: { type: String, required: true },
});
module.exports = {
    Contact: mongoose.model("Contact", contactScheema),
};
