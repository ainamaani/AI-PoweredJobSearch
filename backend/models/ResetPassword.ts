import mongoose, {Document} from "mongoose";
import User from "./User";

interface ResetPasswordI extends Document{
    user: mongoose.Schema.Types.ObjectId;
    resetPasswordCode: string;
}

const ResetPasswordSchema = new mongoose.Schema<ResetPasswordI>({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    resetPasswordCode:{
        type: String,
        required: true
    }
},{timestamps:true});

const ResetPassword = mongoose.model<ResetPasswordI>('ResetPassword', ResetPasswordSchema);

export default ResetPassword;