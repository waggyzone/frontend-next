import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { User } from "./User";
import { ChangePassword } from "./ChangePassword";
import { OrderHistory } from "./OrderHistory";
import { useRouter } from "next/router";

const Profile: NextPage<{ slug?: string[] }> = ({ slug = "user" }) => {
  const [currentPage, setCurrentPage] = useState("profile");
  const { asPath } = useRouter();
  return (
    <div className="pt-16 flex-1  h-screen w-screen flex flex-row">
      <aside className="flex-[0.15] bg-emerald-100 ">
        <div className="flex flex-col justify-between items-start px-3 pt-4 gap-2">
          <button
            onClick={() => setCurrentPage("profile")}
            className={` ${
              currentPage === "profile" ? "bg-blue-500" : "bg-transparent"
            } hover:bg-green-200 w-full text-start`}>
            Profile
          </button>
          <button
            onClick={() => setCurrentPage("contact")}
            className={` ${
              currentPage === "contact" ? "bg-blue-500" : "bg-transparent"
            } hover:bg-green-200 w-full text-start`}>
            Contact
          </button>

          <button
            onClick={() => setCurrentPage("order")}
            className={` ${
              currentPage === "order" ? "bg-blue-500" : "bg-transparent"
            } hover:bg-green-200 w-full text-start`}>
            Order History
          </button>
          <button
            onClick={() => setCurrentPage("changepassword")}
            className={` ${
              currentPage === "changepassword" ? "bg-blue-500" : "bg-transparent"
            } hover:bg-green-200 w-full text-start`}>
            Change Password
          </button>
        </div>
      </aside>
      <div className=" flex-[0.85]   w-screen h-screen bg-white">
        {currentPage === "profile" && <User />}
        {/* {currentPage === "contact" && <h1>contact</h1>} */}
        {currentPage === "order" && <OrderHistory />}
        {currentPage === "changepassword" && <ChangePassword />}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Profile;
Profile.auth = true;
