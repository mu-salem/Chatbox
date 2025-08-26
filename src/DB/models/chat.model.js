import { Types } from "mongoose";

const chatSchema = new Schema(
  {
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Types.ObjectId, ref: "User" }],
    group: { type: Types.ObjectId, ref: "Group" }, 
    lastMessage: { type: Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

export default model("Chat", chatSchema);
