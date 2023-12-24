const Profile = require('../models/Profile');

const createNewProfile = async(req,res) =>{
    try {
        // Get the uploaded file path from the request object
        const profilePicPath = req.files['profilePic'][0].path;
        const resumePath = req.files['resume'][0].path;

        // Destructure other data properties from  the request object
        const { user,firstname,lastname,dateOfBirth,email,phoneContact,profession,
                personalDescription,website,github,linkedIn,twitter,facebook,instagram } = req.body;
        
        const profile = await Profile.create({ user,firstname,lastname,dateOfBirth,email,phoneContact,
                        profession,personalDescription,website,github,linkedIn,twitter,facebook,instagram,
                        profilePic:profilePicPath,resume:resumePath
                    });

        if(profile){
            return res.status(200).json(profile);
        }else{
            return res.status(400).json("Failed to create new job")
        }

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getProfiles = async() =>{

}

module.exports = {
    createNewProfile,getProfiles
}