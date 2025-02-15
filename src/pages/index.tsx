import {homepageCVA} from "@/styles/page.styles";

export default function Home() {
  return (
    <div className={homepageCVA.root()}>
      <h1>home</h1>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      nav: 'nav'
    },
  };
}
