//@ts-nocheck
import Layout from "@/component/Layout";
import DogLoader from "@/component/Loader/DogLoader";
import "@/styles/globals.scss";
import { Prompt } from "@next/font/google";
import type { Session } from "next-auth";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import Router from "next/router";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";

const prompt = Prompt({ subsets: ["latin"], weight: "400" });
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      <SWRConfig>
        <RecoilRoot>
          <Layout className={prompt.className}>
            <Toaster position="top-right" reverseOrder={false} gutter={8} containerClassName="" />
            {Component.auth ? (
              <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
            ) : (
              <React.Fragment>{getLayout(<Component {...pageProps} />)}</React.Fragment>
            )}
          </Layout>
        </RecoilRoot>
      </SWRConfig>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      setTimeout(() => {
        if (!session) signIn();
      }, 2000);
    }
  }, [session, status]);
  if (status === "authenticated") {
    if (status !== "authenticated") {
      Router.replace("/auth/login");
    }
    return children;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <DogLoader />
    </div>
  );
}
