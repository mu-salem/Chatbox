const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    owner: { type: Types.ObjectId, ref: "User", required: true },
    admins: [{ type: Types.ObjectId, ref: "User" }],
    members: [
      {
        user: { type: Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["ADMIN", "MEMBER"], default: "MEMBER" },
        joinDate: { type: Date, default: Date.now },
      },
    ],
    groupPic: {
      secure_url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

// Pre-save hook
groupSchema.pre("save", function (next) {
  if (this.isNew) {
    this.admins = [this.owner];
    this.members.push({
      user: this.owner,
      role: "ADMIN",
      joinDate: new Date(),
    });
  }
  next();
});

// Add a new admin
groupSchema.methods.addAdmin = function (userId) {
  if (!this.admins.includes(userId)) {
    this.admins.push(userId);
    const member = this.members.find(
      (m) => m.user.toString() === userId.toString()
    );
    if (member) member.role = "ADMIN";
  }
  return this.save();
};

// Remove admin privileges
groupSchema.methods.removeAdmin = function (userId) {
  this.admins = this.admins.filter((id) => id.toString() !== userId.toString());
  const member = this.members.find(
    (m) => m.user.toString() === userId.toString()
  );
  if (member) member.role = "MEMBER";
  return this.save();
};

const Group = model("Group", groupSchema);
export default Group;
