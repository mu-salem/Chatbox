import { model, Schema, Types } from "mongoose";

const storySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    media: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
      type: { type: String, enum: ["image", "video"], required: true },
    },

    viewedBy: [
      {
        user: { type: Types.ObjectId, ref: "User", required: true },
        viewedAt: { type: Date, default: Date.now },
      },
    ],

    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const Story = model("Story", storySchema);
export default Story;
