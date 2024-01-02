import mongoose, { Mongoose, Document } from "mongoose";
import Application from "./Application";
import Job from "./Job";

interface InterviewI extends Document{
    job: mongoose.Schema.Types.ObjectId;
    interviewStatus: string;
    interviewDate: Date;
    interviewTime: string;
    location: string;
    additionalNotes: string;
}

const InterviewSchema = new mongoose.Schema<InterviewI>({
    // applicant:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: Application,
    //     required: [true, "The applicant for the interview is required"]
    // },
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Job,
        required: [true, "The job being interviewed for is required"]
    },
    interviewStatus:{
        type: String,
        default: "Scheduled",
        enum: {
            values: ["Scheduled","Cancelled","Completed"],
            message: "The interview status must be one of 'Scheduled', 'Cancelled' or 'Completed'"
        }
    },
    interviewDate:{
        type: Date,
        required: [true, "The date for the interview is required"],
        validate:{
            validator: function(value:Date){
                // check if the date supplied is valid(not in the past)
                return value >= new Date()
            },
            message: "Enter a valid interview date, it can't be a past date!!"
        }
    },
    interviewTime:{
        type: String,
        required: [true, "The time for the interview is required"]
    },
    location:{
        type: String,
        required: [true, "The location for the interview is required"]
    },
    additionalNotes:{
        type:String,
        default: "None"
    }
    

},{timestamps:true});

const Interview = mongoose.model<InterviewI>('Interview', InterviewSchema);

export default Interview;