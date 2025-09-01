import { Token } from "../../DB/models/token.model";
import User from "./../../DB/models/user.model";

export const signup = async (req, res, next) => {
  const { email } = req.body;
  const isUser = await User.findOne(email);

  if (isUser) return next(new Error("User already exists!"), { cause: 400 });

  const user = await User.create({ ...req.body });

  return res.json({ success: true, message: "User created successfully!" });
};

export const signin = async (req, res, next) => {
  const isUser = await User.findOne({ email: req.body.email });
  if (!isUser) return next(new Error("Email is invalid!"), { cause: 404 });

  const match = bcrypt.compareSync(req.body.password, isUser.password);
  if (!match) return next(new Error("Password is invalid!"), { cause: 401 });

  const token = jwt.sign({ email: isUser.email }, process.env.SECRET_KEY);
  await Token.create({
    token,
    user: isUser._id,
    agent: req.headers["user-agent"],
  });

  isUser.status = "online";
  await isUser.save();

  return res.json({ success: true, message: "Welcome!", token });
};
