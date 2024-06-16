import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  User: {
    type: String,
  },
  Password: {
    type: String,
    required: true,
  },
  ConfirmPassword: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Country: {
    type: String,
    default: "",
  },
  State: {
    type: String,
    default: "",
  },
  PinCode: {
    type: String,
    default: "",
  },
  ProfilePhoto: {
    type: String,
    default: "",
  },
});
export const User = mongoose.model("User", UserSchema);
