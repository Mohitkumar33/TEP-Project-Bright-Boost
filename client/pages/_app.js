import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  const customTheme = extendTheme({
    colors: {
      customTeal: "#ED8936", // Define your custom color
    },
  });
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
