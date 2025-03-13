import {GetStaticPropsContext, InferGetStaticPropsType} from 'next'
import {createClient} from '@/prismicio'
import {HeroSection} from '@/components/Hero/Hero';
import {ContentSection} from '@/components/Content/Content';

type Params = { uid: string }

export default function Assurance({page}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <HeroSection data={page.data.hero}/>
      <ContentSection data={page.data.content}/>
    </>
  )
}

export async function getStaticProps({params, previewData}: GetStaticPropsContext<Params>) {
  const client = createClient({previewData})

  const [document, footer, page] = await Promise.all([
    client.getSingle('menu'),
    client.getSingle('footer'),
    client.getByUID('assurances', params!.uid),
  ])

  return {
    props: {
      nav: document,
      uid: params!.uid,
      footer,
      page
    },
  }
}

export async function getStaticPaths() {
  const client = createClient()

  const pages = await client.getAllByType('assurances')
  const paths = pages.map((page) => (`/assurances/${page.uid}`))

  return {paths, fallback: false}
}
