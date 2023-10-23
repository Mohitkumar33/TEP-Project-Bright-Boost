import { AuthProvider } from "@/components/context/auth-context";
import LargeWithLogoLeft from "@/components/homePage/Footer";
import Navigation from "@/components/homePage/Navigation";
// import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const customTheme = extendTheme({
    colors: {
      customTeal: "#ED8936", // Define your custom color
    },
  });
  return (
    <>
      <AuthProvider>
        <ChakraProvider theme={customTheme}>
          <Head>
            <title>Bright Boost</title>
          </Head>
          <Navigation />
          <Component {...pageProps} />
          <LargeWithLogoLeft />
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}
