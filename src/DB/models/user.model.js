import { Schema, model, Types } from "mongoose";
import { hash } from "../../utils/hashing/hash.js";
import { OTP_TYPES, providers } from "../../utils/constants/authConstants.js";
import {
  defaultPublicID_profilePic,
  defaultSecureURL_profilePic,
} from "../../utils/constants/cloudinaryConstants.js";
import { dncrypt, encrypt } from "../../utils/encryption/encryption.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider == providers.SYSTEM ? true : false;
      },
    },
    provider: {
      type: String,
      enum: Object.values(providers),
      default: providers.SYSTEM,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    profilePic: {
      secure_url: { type: String, default: defaultSecureURL_profilePic },
      public_id: { type: String, default: defaultPublicID_profilePic },
    },
    friends: [{ type: Types.ObjectId, ref: "User" }],
    groups: [{ type: Types.ObjectId, ref: "Group" }],
    stories: [{ type: Types.ObjectId, ref: "Story" }],
    OTP: [
      {
        code: String,
        type: { type: String, enum: Object.values(OTP_TYPES) },
        expiresIn: Date,
      },
    ],
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    changeCredentialTime: {
      type: Date,
    },
  },
  { timestamps: true, strictQuery: true }
);

// Hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = hash({ plainText: this.password });
  }
  if (this.isModified("phoneNumber")) {
    this.phoneNumber = encrypt({ plainText: this.phoneNumber });
  }
  next();
});

// Decrypt
userSchema.post("init", function (doc) {
  if (doc.phoneNumber) {
    doc.phoneNumber = dncrypt({ cipherText: doc.phoneNumber });
  }
});

const User = model("User", userSchema);
export default User;
