import {GetStaticPropsContext} from "next";

export default function Assurance({ uid }: { uid: string }) {
  return (
    <div>
      <h1>hello - {uid}</h1>
    </div>
  )
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ uid: string }>) {
  return {
    props: {
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
