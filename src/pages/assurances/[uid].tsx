import {GetStaticPropsContext} from "next";
import {createClient} from "@/prismicio";

export default function Assurances({ uid, nav }: { uid: string, nav: any }) {
  console.log('%cnav', 'color: pink; font-size: 12px;', nav)
  return (
    <div>
      <h1>hello - {uid}</h1>
    </div>
  )
}

export async function getStaticProps({ params, previewData }: GetStaticPropsContext<{ uid: string }> & GetStaticPropsContext) {
  const client = createClient({ previewData })
  const document = await client.getSingle("menu");

  return {
    props: {
      nav: document,
      uid: params!.uid,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: ['/assurances/auto', '/assurances/habitation'],
    fallback: true,
  }
}
