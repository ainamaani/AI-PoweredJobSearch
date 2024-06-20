import mongoose,{Document, Schema} from "mongoose";
import User from "./User";

interface CompanyI extends Document {
    company : string,
    companyDescription : string,
    companyEmail : string,
    member : string,
    companyLogo : string,
    industry : string,
    location : string,
    followers : mongoose.Types.ObjectId[];
    companyWebsiteUrl : string
}


const CompanySchema = new mongoose.Schema<CompanyI>({
    company : {
        type: String,
        required: [true, "The company name is required"]
    },
    companyDescription : {
        type: String,
        required: [true, "The company description is required"]
    },
    companyEmail : {
        type: String,
        required: [true, "The company email is required"]
    },
    member : {
        type: String,
        required: [true, "The company member's email is required"]
    },
    companyLogo : {
        type: String
    },
    industry : {
        type: String,
        required: [true, "The company industry is required"]
    },
    followers : [
        {
            type: Schema.Types.ObjectId,
            ref: User
        }
    ],
    location : {
        type: String,
        required: [true, "The company location is required"]
    },
    companyWebsiteUrl : {
        type: String
    }

},{timestamps:true});

const Company = mongoose.model<CompanyI>('Company', CompanySchema);

export default Company;