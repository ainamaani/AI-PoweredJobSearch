import Job from "../models/Job"

const CheckJobApplicationDeadline = async() =>{
    const jobs = await Job.find({});
    for (const job of jobs){
        if(job.status === "open"){
            let currentDateTime = new Date();
            let jobApplicationDeadline = new Date(job.applicationDeadline);

            if(currentDateTime > jobApplicationDeadline){
                job.status = "closed";
                await job.save({ validateBeforeSave:false });
            }
        }
    }
}

export default CheckJobApplicationDeadline;