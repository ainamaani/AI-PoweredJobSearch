import mongoose from 'mongoose';
import Job from './Job';

const ApplicationSchema = new mongoose.Schema({
    // applicant:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: User,
    //     required: [true, "The applicant is required"]
    // },
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Job,
        required: [true, "The job being applied for required"]
    },
    applicationDate:{
        type: Date,
        required: [true, "The application date is required"]
    },
    resume:{
        type:String,
        required: [true, "The resume of the applicant is required"]
    },
    applicationLetter:{
        type:String,
        required: [true, "The application letter of the applicant is required"]
    },
    applicationStatus:{
        type:String,
        default: "Pending",
        enum :{
            values: ["Pending","Declined","Accepted"],
            message: "The application status has to be one of 'Pending','Declined' or 'Accepted'"
        }
    }
},{timestamps:true});

const Application = mongoose.model('Application', ApplicationSchema);

export default Application;