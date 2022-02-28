// Requirements
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  } /* unique : true used by mongoose-unique-validator, can't create 2 account with the same email*/,
  password: { type: String, required: true },
});

// Apply mongoose-unique-validator
userSchema.plugin(uniqueValidator);

// Export userSchema
module.exports = mongoose.model("User", userSchema);
