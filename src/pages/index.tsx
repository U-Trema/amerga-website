import { createClient } from "@/prismicio";
import {homepageCVA} from "@/styles/page.styles";
import {GetStaticPropsContext} from "next";

export default function Home({ nav }: { nav: any }) {
  console.log('%cprops', 'color: orange; font-size: 12px;', nav)

  return (
    <div className={homepageCVA.root()}>
      <h1>home</h1>
    </div>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData })
  const document = await client.getSingle("menu");

  return {
    props: {
      nav: document,
    },
  };
}
