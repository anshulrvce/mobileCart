var mongoose = require("mongoose");
var cartSchema = mongoose.Schema({
		"id" : String,
        "name": String,
        "capacity": String,
        "price": Number,
        "image": String
    });

module.exports = mongoose.model("cart", cartSchema);