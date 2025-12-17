import { getCompany } from "./db/companies.js";
import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js";
export const resolvers = {
  Query: {
    company:(_root,{id})=>getCompany(id),
    job:(_root, {id})=>getJob(id),
    jobs: () => getJobs(),
  },
  Company:{
    jobs:(company)=>getJobsByCompany(company.id)
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
