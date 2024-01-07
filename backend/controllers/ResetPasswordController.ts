import ResetPassword from "../models/ResetPassword";
import { Express, Request, Response } from "express";
import User from "../models/User";
import generateResetPasswordCode from "../functions/GenerateResetCode";
import sendEmail from "../functions/SendEmail";
import bcrypt from "bcrypt";

const handlePasswordResetCode = async(req: Request,res: Response) =>{
    try {
        const { email } = req.body;
        // check if the user email has been provided
        if(!email){
            return res.status(400).json({ error: "Please provide an email" });
        }
        // check if the user with the email exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ error: "User with that email does not exist" });
        }

        let resetCode = generateResetPasswordCode();

        // send reset reset code to email
        sendEmail(email,'Password Reset',
        `Dear ${user.firstname} ${user.lastname},

Your password reset code is ${resetCode}

Sincerely,

Ainamaani Isaac
System Administrator
CareerConnect`
        );

        // check if the member already requested to reset password
        const userAlreadyRequested = await ResetPassword.findOne({ user: user._id });

        if(userAlreadyRequested){
            userAlreadyRequested.resetPasswordCode = resetCode;
            // save new object in the database after changing the resetPasswordCode property
            await userAlreadyRequested.save({ validateBeforeSave: false }); 
            return res.status(200).json(userAlreadyRequested);
        }else{
            const newResetPassword = await ResetPassword.create({ user: user._id, resetPasswordCode: resetCode });

            if(newResetPassword){
                return res.status(200).json(newResetPassword);
            }else{
                return res.status(400).json({ error: "Failed to add new reset password object" });
            }
        }


    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

const getPasswordResetRequests = async(req: Request, res: Response) =>{
    try {
        const resetRequests = await ResetPassword.find({}).populate('user').sort({ createdAt: -1 });
        if(resetRequests){
            return res.status(200).json(resetRequests);
        }else{
            return res.status(400).json({ error: "Failed fro fetch password reset requests" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

const handleResetFogottenPassword = async(req: Request, res: Response) =>{
    try {
        const { email, passwordResetCode, newPassword } = req.body;

        if(!email || !passwordResetCode || !newPassword){
            return res.status(400).json({ error: "All fields are required" });
        }

        // grab the id of the user trying to reset password
        const userResettingPasswordId = await User.findOne({ email }).select('_id');
        if(!userResettingPasswordId){
            return res.status(400).json({ error: "The user trying to reset the password could not be found" });
        }
        // get the member trying to reset details
        const userResetting = await ResetPassword.findOne({ user: userResettingPasswordId });
        if(userResetting){
            // get the reset code sent
            const sentResetCode = userResetting.resetPasswordCode;
            // check if the sent code is the same as the provided code
            if(sentResetCode === passwordResetCode){
                // generate the salt to hash the new password
                const salt = await bcrypt.genSalt(10);
                // hash the new password using the generated salt
                const hashedNewPassword = await bcrypt.hash(newPassword, salt);

                // fetch user whose password is to be changed
                const userChangingPassword = await User.findOne({ email });
                if(userChangingPassword){
                    userChangingPassword.password = hashedNewPassword;
                    userChangingPassword.save({ validateBeforeSave: false });
                    return res.status(200).json(userChangingPassword);
                }else{
                    return res.status(400).json({ error: "Member doesn't exist" });
                }
            }else{
                return res.status(400).json({ error: "The reset code isn't correct, check your email for a correct one and try again!!" })
            }
        }else{
            return res.status(400).json({ error: "No reset code was sent to this email" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

export default{
    handlePasswordResetCode,
    handleResetFogottenPassword,
    getPasswordResetRequests
}