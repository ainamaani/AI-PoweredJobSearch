import mongoose,{Document} from "mongoose";

export interface RoadMapI extends Document {
    profession: string;
    role: string;
    description: string;
    steps: {
      title: string;
      subSteps: {
        name: string;
        url: string;
      }[];
    }[];
    roleBackgroundImage: string;
    roleFrontImage: string;
}

const RoadMapSchema = new mongoose.Schema<RoadMapI>({
    profession : {
        type : String,
        required: [true, "The profession must be provided"]
    },
    role : {
        type: String,
        required: [true, "The role under the given profession is required"]
    },
    description : {
        type: String,
        required: [true, "The role description is required"]
    },
    steps: [{
        title: {
          type: String,
          required: [true, "The step title is required"]
        },
        subSteps: [{
          name: {
            type: String,
            required: [true, "The sub step name is required"]
          },
          url: {
            type: String,
            required: [true, "The sub step url is required"]
          }
        }]
    }],
    roleBackgroundImage : {
        type : String,
        required : [true, "The role background image is required"]   
    },
    roleFrontImage : {
        type : String,
        required: [true, "The role front image is required"]
    }
},{timestamps:true});

const RoadMap = mongoose.model<RoadMapI>('RoadMap',RoadMapSchema);

export default RoadMap;