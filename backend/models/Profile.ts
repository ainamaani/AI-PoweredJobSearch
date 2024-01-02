import mongoose,{Document} from "mongoose";

interface ProfileI extends Document{
    firstname: string;
    lastname: string;
    gender: string;
    nationality: string;
    dateOfBirth: Date;
    email: string;
    phoneContact: string;
    profilePic: string;
    category: string;
    profession: string;
    personalDescription: string;
    website: string;
    github: string;
    socialmedia:{
        linkedIn: string;
        twitter: string;
        facebook: string;
        instagram: string;
    }  
    resume: string;

}

const ProfileSchema = new mongoose.Schema<ProfileI>({
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:User,
    //     required:[true, "The user for the profile is required"]
    // },
    firstname:{
        type:String,
        required: [true, "The first name is required"]
    },
    lastname:{
        type:String,
        required: [true, "The last name is required"]
    },
    gender:{
        type:String,
        required: [true, "Gender is required"],
        enum: {
            values: ["male","female"],
            message: "The gender can only be male or female"
        }
    },
    nationality:{
        type:String,
        required: [true, "Nationality is required"]
    },
    dateOfBirth:{
        type:Date,
        required: [true, "The date of birth is required"],
        validate: {
            validator: function (value:Date) {
                // Define the minimum allowed year 
                const minimumYear = 2007;
                
                // Extract the year from the date of birth
                const birthYear = value.getFullYear();
                
                // Check if the birth year is after the minimum year
                return birthYear <= minimumYear;
            },
            message: 'Please enter a valid date of birth'
        }
    },
    email:{
        type:String,
        required: [true, "Email is required"],
        validate: {
            validator: async function (value:string) {
                // Check if the email format is valid
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if (!emailRegex.test(value)) {
                    throw new Error('Invalid email format. Please provide a valid email address.');
                }

                // Check if the email is already in use
                const existingMember = await Profile.findOne({ email: value });
                if (existingMember) {
                    throw new Error('Email already exists');
                }  
            }
        }
    },
    phoneContact:{
        type:String,
        required: [true, "The phone number is required"],
        validate: {
            validator: async function (value:string) {
                // Check if the phone number has at least 10 digits
                if(value.length < 10){
                    throw new Error('Phone number must be not less than 10 digits');
                }
                //check for uniqueness
                const existingPhoneNumber = await Profile.findOne({ phoneNumber:value });
                if(existingPhoneNumber){
                    throw new Error('This Phone number already exists');
                }
            }
        }
    },
    profilePic:{
        type:String,
        default:null
    },
    category:{
        type:String,
        required: [true, "The category is required"]
    },
    profession:{
        type:String,
        required: [true, "Your profession is required"]
    },
    personalDescription:{
        type:String,
        required: [true, "A description about yourself is required"]
    },
    website:{
        type:String,
        default:"None"
    },
    github:{
        type:String,
        default:"None"
    },
    socialmedia:{
        linkedIn:{
            type:String,
            default: "None"
        },
        twitter:{
            type:String,
            default: "None"
        },
        facebook:{
            type:String,
            default: "None"
        },
        instagram:{
            type:String,
            default:"None"
        }
    },
    resume:{
        type:String,
        required: [true, "Your resume/curriculum vitae is required"]
    }
},{timestamps:true})


const Profile = mongoose.model<ProfileI>('Profile',ProfileSchema);

export default Profile;