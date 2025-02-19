import {GetStaticPropsContext} from "next";
import {createClient} from "@/prismicio";

export default function NousConnaitre({ nav }: { nav: any }) {
  return (
    <div>
      <h1>nous connaître</h1>
    </div>
  )
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData })
  const document = await client.getSingle("menu");
  const footer = await client.getSingle("footer");

  return {
    props: {
      nav: document,
      footer
    },
  };
}
