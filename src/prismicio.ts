import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";
import {FilledContentRelationshipField} from "@prismicio/client";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

export type LinkType = FilledContentRelationshipField<'home' | 'contact' | 'nous_connaitre' | 'assurances'>

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig["routes"] = [
  {
  	type: "home",
  	path: "/",
  },
  {
    type: "contact",
    path: "/contact",
  }
];

export function linkResolver(doc: LinkType) {
  if (doc?.type === "home") return '/'
  if (doc?.type === "contact") return '/contact'
  if (doc?.type === "nous_connaitre") return '/nous-connaitre'
  if (doc?.type === "assurances") return `/assurances/${doc.uid}`

  return doc.uid!
}

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.ACCESS_TOKEN,
    routes,
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
