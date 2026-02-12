'use server'

import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const CLIENTS_QUERY = `*[_type == "client"]{..., "logo_url": logo.asset->url}`;

const options = { next: { revalidate: 30 } };

export default async function getClients() {
  const clients = await client.fetch<SanityDocument[]>(CLIENTS_QUERY, {}, options);

  return clients;
}
