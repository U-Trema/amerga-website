import "@/styles/globals.css";
import '@mantine/core/styles.css';
import type { AppProps } from "next/app";
import {Layout} from "@/components/Layout/Layout";
import {createTheme, MantineProvider} from "@mantine/core";
import {PrismicPreview} from "@prismicio/next";
import {repositoryName} from "@/prismicio";

const theme = createTheme({
  fontFamily: 'Libre Franklin, sans-serif',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Layout {...pageProps}>
        <Component {...pageProps}/>
        <PrismicPreview repositoryName={ repositoryName }/>
      </Layout>
    </MantineProvider>
  );
}
