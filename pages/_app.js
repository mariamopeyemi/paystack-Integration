import "@/styles/globals.css";
import "@/styles/animation.css";
import { Inter } from "@next/font/google";
import Head from "next/head";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Milade Store</title>
        <link rel="icon" href="/yebox-logo.svg" sizes="32x32" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div className={`${inter.variable} font-sans`}>
        {Component?.layout ? (
          <Component.layout>
            <Component {...pageProps} />
          </Component.layout>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </>
  );
}
