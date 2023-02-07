import { Inter } from "@next/font/google";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  (async () => {
    const session = await getSession();
    console.log(session);
  })();
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" w-screen h-screen pt-16 flex-1 bg-orange-600 flex  flex-row overflow-auto">
        <div className="home__container__left  flex bg-blue-600 h-screen w-full flex-col">
          <div>
            <h1 className="home__container__left_h1 text-8xl font-bold">
              Find a <span className="text-white">New</span>
            </h1>
            <p className="text-8xl font-bold">pet for you</p>
            <p className="text-3xl break-words w-11/12">
              {" "}
              With us,you can find pets or sell them more easily and quickly
            </p>
            <button>Schedule a Call</button>
          </div>
        </div>
        <div className="home__container__right flex bg-fuchsia-500 h-screen w-full">2</div>
      </div>
    </>
  );
}

Home.auth = false;
