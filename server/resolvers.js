import { getCompany } from "./db/companies.js";
import { getJobs } from "./db/jobs.js";
export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    // companies:()=>getCompany()
  },
  Job: {
   company:(job)=>getCompany(job.companyId),
    title:(job) =>{ return job.title},
    date: (job) => {
      return toISODate(job.createdAt)
    },
  },
};

function toISODate(value){
return value.slice(0,'yyyy-mm-dd'.length);
}
