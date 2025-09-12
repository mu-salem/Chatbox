import User from "../../DB/models/user.model.js";
import cloudinary from "../../utils/file uploading/cloudinary.config.js";
import { compareHash } from "../../utils/hashing/hash.js";

export const getLoginUserProfile = async (req, res, next) => {
  const user = await User.findOne({
    _id: req.user._id,
    isLoggedIn: true,
  }).select("-password -OTP -__v -provider");

  if (!user) return next(new Error("User not found!"), { cause: 404 });
  return res.json({ success: true, results: { user } });
};

export const updateProfile = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    { new: true, runValidators: true }
  ).select("-password -OTP -__v -provider");
  if (!user) return next(new Error("User not found!"), { cause: 404 });
  return res.json({
    success: true,
    message: "Profile updated",
    results: { user },
  });
};

export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return next(new Error("User not found!"), { cause: 404 });

  if (!compareHash({ plainText: oldPassword, hash: user.password }))
    return next(new Error("Old password is incorrect!"), { cause: 400 });

  user.password = newPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};

export const updateProfilePic = async (req, res, next) => {
  const userId = req.user._id;
  const { file } = req;

  if (!file) return next(new Error("No file uploaded!", { cause: 400 }));

  const user = await User.findById(userId);
  if (!user) return next(new Error("User not found!", { cause: 404 }));

  if (user.profilePic?.public_id) {
    await cloudinary.uploader.destroy(user.profilePic.public_id);
  }

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    file.path,
    {
      folder: `${process.env.CLOUD_FOLDER_NAME}/users/${userId}/profilePicture`,
    }
  );

  user.profilePic = {
    secure_url: secure_url,
    public_id: public_id,
  };

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Profile picture uploaded successfully",
    results: { profilePic: user.profilePic },
  });
};

export const getUserByName = async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOne({ username }).select(
    "-password -OTP -__v -provider"
  );

  if (!user) return next(new Error("User not found!"), { cause: 404 });

  return res.json({ success: true, results: { user } });
};

export const searchUsers = async (req, res, next) => {
  const { username } = req.query;

  if (!username || username.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  const users = await User.find({
    username: { $regex: `^${username}`, $options: "i" },
  }).select("-password -OTP -__v -provider");

  return res.json({
    success: true,
    count: users.length,
    users,
  });
};

export const addFriend = async (req, res, next) => {
  const userId = req.user._id;
  const { username } = req.params;

  const user = await User.findById(userId);
  if (!user) return next(new Error("User not found!"), { cause: 404 });

  const friend = await User.findOne({ username });
  if (!friend)
    return next(new Error("User with this username not found!"), {
      cause: 404,
    });

  if (user.friends.includes(friend._id))
    return next(new Error("User already added to friends!"), { cause: 400 });

  user.friends.push(friend._id);
  await user.save();

  return res.json({
    success: true,
    message: "User added to friends!",
    results: { friends: user.friends },
  });
};

export const removeFriend = async (req, res, next) => {
  const userId = req.user._id;
  const { username } = req.params;

  const user = await User.findById(userId);
  if (!user) return next(new Error("User not found!"), { cause: 404 });

  const friend = await User.findOne({ username });
  if (!friend)
    return next(new Error("User with this username not found!"), {
      cause: 404,
    });

  if (!user.friends.includes(friend._id))
    return next(new Error("User not found in friends!"), { cause: 404 });

  user.friends = user.friends.filter(
    (f) => f.toString() !== friend._id.toString()
  );

  await user.save();

  return res.json({
    success: true,
    message: "User removed from friends!",
    results: { friends: user.friends },
  });
};

export const getFriends = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate(
    "friends",
    "username firstLetter profilePic bio status"
  );

  if (!user) return next(new Error("User not found!"), { cause: 404 });

  const grouped = {};

  user.friends.forEach((friend) => {
    const letter = friend.firstLetter ? friend.firstLetter.toUpperCase() : "#";

    if (!grouped[letter]) {
      grouped[letter] = [];
    }

    grouped[letter].push(friend);
  });

  return res.json({
    success: true,
    results: { friends: grouped },
  });
};
