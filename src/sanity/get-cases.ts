'use server'

import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";


const options = { next: { revalidate: 30 } };

// const CASES_QUERY = `*[_type == "case"][0..4]{_id, title, slug, short_desc, "cover_url": img_cover.asset->url} | order(published_at asc)`;

export default async function getCases({
  latest = false,
  slug = "",
}) {
  const CASES_QUERY = `*[_type == "case" ${slug != "" ? `&& slug.current match "${slug}"` : ""}]${latest ? "[0..4]" : ""}{_id, title, clubber, "slug": slug.current, short_desc, tags, body, "cover_url": img_cover.asset->url} | order(published_at asc)`;
  // console.log(CASES_QUERY)
  const cases = await client.fetch<SanityDocument[]>(CASES_QUERY, {}, options);

  if (slug != "") {
    return cases[0];
  }
  return cases;
}
