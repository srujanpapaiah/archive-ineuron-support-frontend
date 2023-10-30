import Navbar from "@/app/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";
import ChatProvider from "./context/ChatProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iNeuron Support",

  description: "A portal for iNeuron support system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ChatProvider>
            <Navbar />
            {children}
          </ChatProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
