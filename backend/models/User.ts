import mongoose, {Document} from "mongoose";


export interface UserI extends Document {
    firstname: string;
    lastname: string;
    email: string;
    userCategory: "Job seeker" | "Recruiter" | "Admin";
    sector: string;
    password: string;
}

const UserSchema = new mongoose.Schema<UserI>({
    firstname:{
        type:String,
        required: [true, "Your first name is required"]
    },
    lastname:{
        type:String,
        required: [true, "Your last name is required"]
    },
    email:{
        type:String,
        required: [true, "Your email address is required"],
        validate: {
            validator: async function (value:string) {
                // Check if the email format is valid
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if (!emailRegex.test(value)) {
                    throw new Error('Invalid email format. Please provide a valid email address.');
                }

                // Check if the email is already in use
                const existingMember = await User.findOne({ email: value });
                if (existingMember) {
                    throw new Error('Email already exists');
                }  
            }
        }
    },
    userCategory:{
        type:String,
        required: [true, "The user category is required"],
        enum:{
            values: ["Job seeker", "Recruiter", "Admin"],
            message: "The user category must be either 'Job seeker' or 'Recruiter'" 
        }
    },
    sector:{
        type:String
    },
   
    password:{
        type:String,
        required: [true, "The password is required."]
    }
},{timestamps:true});

const User = mongoose.model<UserI>('User', UserSchema);

export default User;