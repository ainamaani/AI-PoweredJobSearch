const Profile = require('../models/Profile');

const createNewProfile = async(req,res) =>{
    try {
        // Get the uploaded file path from the request object
        const profilePicPath = req.files['profilePic'][0].path;
        const resumePath = req.files['resume'][0].path;

        // Destructure other data properties from  the request object
        const { firstname,lastname,dateOfBirth,gender,nationality,email,phoneContact,profession,
                personalDescription,website,github,linkedIn,twitter,facebook,instagram } = req.body;
        
        const profile = await Profile.create({firstname,lastname,dateOfBirth,email,gender,nationality,phoneContact,
                        profession,personalDescription,website,github,linkedIn,twitter,facebook,instagram,
                        profilePic:profilePicPath,resume:resumePath
                    });

        if(profile){
            return res.status(200).json(profile);
        }else{
            return res.status(400).json("Failed to create new job");
        }

    } catch (error) {
        // Check if the error is a validation error
      if (error.name === 'ValidationError' || error.code === 11000) {
          const errors = {};
  
          // Iterate through the validation errors and build the errors object
          for (const field in error.errors) {
            errors[field] = error.errors[field].message;
          }
          return res.status(400).json({ errors });
      }
      // Handle other types of errors (e.g., database errors) here
      return res.status(500).json({ error: error.message });
  }
}

const getProfiles = async(req,res) =>{
    try {
        const profiles = await Profile.find({}).sort({ createdAt: -1 });
        if(profiles){
            return res.status(200).json(profiles);
        }else{
            return res.status(400).json({ error: "Failed to fetch user profiles" });
        }
        
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createNewProfile,getProfiles
}