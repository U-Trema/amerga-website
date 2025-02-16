import {GetStaticPropsContext} from "next";
import {createClient} from "@/prismicio";

export default function Contact({ nav }: any) {
  console.log(nav)
  return (
    <div>
      <h1>contact</h1>
    </div>
  )
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
