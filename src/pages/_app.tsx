//@ts-nocheck
import Layout from "@/component/Layout";
import DogLoader from "@/component/Loader/DogLoader";
import StateProvider from "@/context/waggyContext";
import "@/styles/globals.scss";
import { Prompt } from "@next/font/google";
import type { Session } from "next-auth";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const prompt = Prompt({ subsets: ["latin"], weight: "400" });
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session} refetchInterval>
      <StateProvider>
        <Layout className={prompt.className}>
          <Toaster position="top-right" reverseOrder={false} gutter={8} containerClassName="" />
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </StateProvider>
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
