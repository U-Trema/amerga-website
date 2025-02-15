import '@mantine/core/styles.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Layout} from "@/components/Layout/Layout";
import {MantineProvider} from "@mantine/core";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
