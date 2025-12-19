import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";
import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js";
export const resolvers = {
  Query: {
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw NotFoundError("No Company Found with id " + id);
      }
      return company;
    },
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw NotFoundError("No job with this id " + id);
      }
      return job;
    },
    jobs: () => getJobs(),
  },
  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },
  Job: {
    company: (job) => getCompany(job.companyId),
    title: (job) => {
      return job.title;
    },
    date: (job) => {
      return toISODate(job.createdAt);
    },
  },
};

function NotFoundError(message) {
  return new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  });
}

function toISODate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
