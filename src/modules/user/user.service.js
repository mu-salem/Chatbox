import User from "../../DB/models/user.model.js";

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
  user.isLoggedIn = false;
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
  const { name } = req.params;

  const user = await User.findOne({ name }).select(
    "-password -OTP -__v -provider"
  );

  if (!user) return next(new Error("User not found!"), { cause: 404 });

  return res.json({ success: true, results: { user } });
};

export const searchUsers = async (req, res, next) => {
  const { search } = req.query;

  if (!search || search.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  const users = await User.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phoneNumber: { $regex: search, $options: "i" } },
    ],
  }).select("-password -OTP -__v -provider");

  return res.json({
    success: true,
    count: users.length,
    users,
  });
};

export const addContact = async (req, res, next) => {
  const userId = req.user._id;
  const { id } = req.params;
  const user = await User.findById(userId);
  if (!user) return next(new Error("User not found!"), { cause: 404 });
  if (user.contacts.includes(id))
    return next(new Error("User already added to contacts!"), { cause: 400 });
  user.contacts.push(id);
  await user.save();
  return res.json({
    success: true,
    message: "User added to contacts!",
    results: { contacts: user.contacts },
  });
};

export const removeContact = async (req, res, next) => {
  const userId = req.user._id;
  const { id } = req.params;
  const user = await User.findById(userId);

  if (!user) return next(new Error("User not found!"), { cause: 404 });

  if (!user.contacts.includes(id))
    return next(new Error("User not found in contacts!"), { cause: 404 });

  user.contacts = user.contacts.filter((contact) => contact.toString() !== id);

  await user.save();

  return res.json({
    success: true,
    message: "User removed from contacts!",
    results: { contacts: user.contacts },
  });
};

export const getContacts = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate(
    "contacts",
    "-password -OTP -__v -provider"
  );
  if (!user) return next(new Error("User not found!"), { cause: 404 });
  return res.json({ success: true, results: { contacts: user.contacts } });
};
