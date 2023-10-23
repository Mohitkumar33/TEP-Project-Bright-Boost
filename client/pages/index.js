import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import { Header } from "@/components/Header";
import { Button, ButtonGroup } from "@chakra-ui/react";
import CallToActionWithIllustration from "@/components/HomePage";
import LargeWithLogoLeft from "@/components/homePage/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main>
        <CallToActionWithIllustration />
      </main>
    </>
  );
}
