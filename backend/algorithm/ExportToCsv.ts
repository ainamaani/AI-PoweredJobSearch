// import * as csv from "fast-csv";
// import * as fs from "fs";
// import Job from "../models/Job";

// async function exportJobsToCsv() {
//     try {
//         const stream = fs.createWriteStream('jobs.csv');
//         const csvStream = csv.format({ headers:true });

//         csvStream.pipe(stream);

//         const jobs = await Job.find({}).lean().exec({ timeout: 30000 });

//         jobs.forEach((job)=>{
//             // Remove timestamps and _id before writing to CSV
//             delete job.createdAt;
//             delete job.updatedAt;
//             delete job._id;

//             csvStream.write(job);
//         });

//         csvStream.end();
//         stream.end();

//         console.log("Export successful");
//     } catch (error) {
//         console.log("Error during the exportation to csv", error);
//     }
// }

// // call the function to export the jobs to csv
// exportJobsToCsv();



