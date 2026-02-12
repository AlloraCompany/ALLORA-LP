'use server'

import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const PEOPLE_QUERY = `*[_type == "people"]{..., "photo_url": photo.asset->url} | order(first_name asc)`;

const options = { next: { revalidate: 30 } };

export default async function getPeople() {
  const people = await client.fetch<SanityDocument[]>(PEOPLE_QUERY, {}, options);

  return people;
}
