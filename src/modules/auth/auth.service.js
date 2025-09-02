import { Token } from "../../DB/models/token.model";
import User from './../../DB/models/user.model';
import randomstring from "randomstring";
import { eventEmitter } from './../../utils/emails/email.event';
import { hash } from "../../utils/hashing/hash";
import { OTP_TYPES, subjects } from "../../constants/subjects";

export const signup = async(req,res,next) => {
    const {email} = req.body;
    const isUser = await User.findOne({email});
    
    if (isUser) return next(new Error("User already exists!"), { cause: 400 });
    
    const OTP = randomstring.generate({length:6,charset:"alphanumeric"});
    eventEmitter.emit("SIGNUP",email,OTP,subjects.signup);

    const hashedOTP = hash({plainText:OTP});

    const user = await User.create({
        ...req.body,
        isActivated : true,
        OTP : [
            {
                code : hashedOTP,
                type : OTP_TYPES.SIGNUP,
                expiresIn : new Date(Date.now() + 10 * 60 * 1000)
            }
        ]
    });

    return res.json({success:true,message:"User created successfully!"});
}

export const signin = async(req,res,next) => {
    const isUser = await User.findOne({email:req.body.email});
    if (!isUser) return next(new Error("Email is invalid!"), { cause: 404 });

    const match = bcrypt.compareSync(req.body.password,isUser.password);
    if (!match) return next(new Error("Password is invalid!"), { cause: 401 });

    const token = jwt.sign({email:isUser.email},process.env.SECRET_KEY)
    await Token.create({token,user:isUser._id,agent:req.headers["user-agent"]})

    isUser.status = "online"
    await isUser.save()

    return res.json({success:true , message:"Welcome!" , token});
}