import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ynp6mei5",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});