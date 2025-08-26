const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    admin: { type: Types.ObjectId, ref: "User", required: true },
    members: [{ type: Types.ObjectId, ref: "User" }],
    groupPic: {
      secure_url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);


const Group = model("Group", groupSchema);
export default Group;
