import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { TokenProvider } from "@/context/tokens";
import Layout from "@/components/Layout";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <TokenProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TokenProvider>
    </SessionProvider>
  );
};

export default MyApp;
