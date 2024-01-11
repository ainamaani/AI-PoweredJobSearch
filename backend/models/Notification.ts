import mongoose,{Document} from "mongoose";
import User from "./User";

export interface NotificationI extends Document{
    _id: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    subject: string;
    message: string;
    dateOfNotification: Date;
    isUnread: boolean,
    type: string
}

const NotificationsSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: [true, "The recipient of the notification is required"]
    },
    subject:{
        type:String,
        required: [true, "The notification subject is required"]
    },
    message:{
        type:String,
        required: [true, "The notification notifications"]
    },
    isUnread:{
        type:Boolean,
        default: true
    },
    type:{
        type:String,
        required: [true, "The notification type is required"]
    }
    
},{timestamps:true})

const Notification = mongoose.model('Notification', NotificationsSchema);

export default Notification;