import Interview from "../models/Interview"

const CheckInterviewDueStatus = async() => {
    try {
        const interviews = await Interview.find({});
        for(const interview of interviews){
            let currentDate : any = new Date();
            let interviewDate : any = new Date(interview.interviewDate);

            // Calculate the difference in days between interview date and current date
            const differenceInDays = Math.floor((currentDate - interviewDate) / (1000 * 60 * 60 * 24));

            // Check if the difference is exactly one day
            if (differenceInDays >= 1 && interview.interviewStatus === "Scheduled") {
                interview.interviewStatus = "Due";
                interview.save({ validateBeforeSave:false });
            }   
        }
    } catch (error) {
        console.log(error);
    }
}


export default CheckInterviewDueStatus;