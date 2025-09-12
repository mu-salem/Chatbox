import { Types } from "mongoose";

const messageSchema = new Schema(
  {
    sender: { type: Types.ObjectId, ref: "User", required: true },
    chat: { type: Types.ObjectId, ref: "Chat", required: true },
    type: {
      type: String,
      enum: ["text", "image", "voice", "video", "location", "contact", "document", "call"],
      default: "text",
    },
    content: String,
    media: {
      secure_url: String,
      public_id: String,
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
    contact: {
      name: String,
      phone: String,
    },
    call: {
      callType: { type: String, enum: ["voice", "video"] },
      duration: Number,
    },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);
export default Message;
