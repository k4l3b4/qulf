import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "Qulf - Authentication for Python, done right.",
  description: "The official website for Qulf",
  openGraph: {
    title: "Qulf - Authentication for Python, done right.",
    description: "The official website for Qulf",
    images: [
      {
        url: "https://qulf.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Qulf",
      },
    ],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
