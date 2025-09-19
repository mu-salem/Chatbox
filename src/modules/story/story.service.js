import User from "../../DB/models/user.model.js";
import cloudinary from "../../utils/file uploading/cloudinary.config.js";
import Story from "./../../DB/models/story.model.js";

export const createStory = async (req, res, next) => {
  const userId = req.user._id;
  const { file } = req;

  if (!file) return next(new Error("No file uploaded!", { cause: 400 }));

  const user = await User.findById(userId);
  if (!user) return next(new Error("User not found!", { cause: 404 }));

  const { secure_url, public_id, resource_type } =
    await cloudinary.uploader.upload(file.path, {
      folder: `${process.env.CLOUD_FOLDER_NAME}/users/${userId}/stories`,
      resource_type: "auto",
    });

  const story = await Story.create({
    user: userId,
    media: {
      secure_url: secure_url,
      public_id: public_id,
      type: resource_type,
    },
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  await story.save();

  return res.status(201).json({
    success: true,
    message: "Story created successfully",
    results: story,
  });
};

export const getStories = async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate("friends", "_id");
  if (!user) return next(new Error("User not found!", { cause: 404 }));

  const userAndFriendsIds = [userId, ...user.friends.map((f) => f._id)];

  const stories = await Story.find({
    user: { $in: userAndFriendsIds },
    expiresAt: { $gt: new Date() },
  })
    .populate("user", "username profilePic")
    .sort({ createdAt: 1 });

  return res.status(200).json({
    success: true,
    results: stories,
  });
};

export const getStoryById = async (req, res, next) => {
  const { storyId } = req.params;
  const userId = req.user._id;

  const story = await Story.findById(storyId).populate(
    "user",
    "username profilePic"
  );

  if (!story) return next(new Error("Story not found!", { cause: 404 }));

  if (story.expiresAt < new Date()) {
    return next(new Error("Story has expired!", { cause: 410 }));
  }

  return res.status(200).json({
    success: true,
    results: story,
  });
};

export const viewStory = async (req, res, next) => {
  const { storyId } = req.params;
  const userId = req.user._id;

  const story = await Story.findById(storyId);

  if (!story) return next(new Error("Story not found!", { cause: 404 }));

  if (story.expiresAt < new Date()) {
    return next(new Error("Story has expired!", { cause: 410 }));
  }

  const alreadyViewed = story.viewedBy.some(
    (view) => view.user.toString() === userId.toString()
  );

  if (!alreadyViewed) {
    story.viewedBy.push({ user: userId });
    await story.save();
  }

  return res.status(200).json({
    success: true,
    message: "Story viewed successfully",
    results: {
      storyId: story._id,
      totalViews: story.viewedBy.length,
    },
  });
};


export const deleteStory = async (req, res, next) => {
  const { storyId } = req.params;
  const userId = req.user._id;

  const story = await Story.findById(storyId);
  if (!story) return next(new Error("Story not found!", { cause: 404 }));

  if (story.user.toString() !== userId.toString()) {
    return next(new Error("You are not authorized to delete this story!", { cause: 403 }));
  }

  if (story.media?.public_id) {
    await cloudinary.uploader.destroy(story.media.public_id);
  }

  await story.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Story deleted successfully",
  });
};

export const getStoryViewers = async (req, res, next) => {
  const { storyId } = req.params;
  const userId = req.user._id;

  const story = await Story.findById(storyId).populate(
    "viewedBy.user",
    "username profilePic"
  );

  if (!story) return next(new Error("Story not found!", { cause: 404 }));

  if (story.user.toString() !== userId.toString()) {
    return next(
      new Error("You are not authorized to view story viewers!", { cause: 403 })
    );
  }

  return res.status(200).json({
    success: true,
    count: story.viewedBy.length,
    results: story.viewedBy,
  });
};
