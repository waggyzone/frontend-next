import { Inter } from "@next/font/google";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  (async () => {
    const session = await getSession();
    console.log(session);
  })();

  const inner_html = () => <img src={`/Images/banner.png`}/>
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" w-screen h-screen pt-16 flex-1  flex  flex-row overflow-auto bg-no-repeat">
        <section id="home">
            <div className="w-screen flex justifiy-between items-center bg-no-repeat "
          style={{
         backgroundImage:`url(/Images/banner.png)`,
       }}
        >
          <div className="w-[300px]">

            <p>Theertha</p>
          </div>
          <div className="  h-fit w-fit bottom-1 mt-[20rem]  ">
            <img src={`/Images/Dog.png`} className="w-[65rem] h-[50rem] "/>
          </div>
        </div>
      </section>
        <section id="#1">
          <h1>service for every dog</h1>
       </section>
       
      </div>
    </>
  );
}

Home.auth = false;
