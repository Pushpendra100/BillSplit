import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const roboto_mono = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BillSplit",
  description: "Split your bills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="LiMByCmWU5Z_bvLHICkUfK9YNm-uie-N_g90teU7J8E" />
      </head>
      <GoogleOAuthProvider clientId={ process.env.OAUTH_CLIENT_ID || ""} >
        <body className={roboto_mono.className}>
          {children}
          <Toaster />
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
