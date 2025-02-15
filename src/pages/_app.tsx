import '@mantine/core/styles.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Layout} from "@/components/Layout/Layout";
import {MantineProvider} from "@mantine/core";
import {PrismicPreview} from "@prismicio/next";
import {repositoryName} from "@/prismicio";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
        <PrismicPreview repositoryName={ repositoryName }/>
      </Layout>
    </MantineProvider>
  );
}
