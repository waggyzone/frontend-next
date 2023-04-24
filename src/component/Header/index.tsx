import useCartContext from "@/hook/useCartContext";
import userService from "@/service/user";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React from "react";
import { Logo } from "../Icon/Logo";
import Shop from "../Icon/Shop.Icon";
const Header: React.FC = () => {
  const { data: session, status } = useSession();

  const { cart } = useCartContext();

  const { asPath, isReady } = useRouter();
  /**
   * @namespace Header
   * @name onLogOutClick
   * @param event
   */
  const onLogOutClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // event.preventDefault();
    signOut();

    if (session) {
      await userService.clearCache(session?.user.refresh_token);
    }
  };
  /**
   * @namespace Header
   * @name onLoginClick
   * @param event
   */
  const onLoginClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    signIn();
  };
  /**
   * @namespace Header
   * @name onRegisterClick
   * @param event
   */
  const onRegisterClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    Router.replace("/auth/register");
  };

  return (
    <header className="flex flex-row justify-between w-screen px-[4.6875rem] h-16 items-center fixed z-30 top-0 bg-slate-50">
      <div>
        <Logo />
      </div>
      <nav className="space-x-6 flex flex-row">
        <Link
          className={`${
            asPath === "/" ? "border-black border-b" : ""
          } hover:text-emerald-600 hover:border-red-700 hover:border-b transition-all`}
          href="/">
          Home
        </Link>
        <Link
          className={`${
            asPath === "/product" ? "border-black border-b" : ""
          } hover:text-emerald-600 hover:border-red-700 hover:border-b transition-all`}
          href="/product">
          Product
        </Link>
        <Link
          className={`${
            asPath === "/accessories" ? "border-black border-b" : ""
          } hover:text-emerald-600 hover:border-red-700 hover:border-b transition-all`}
          href="/accessories">
          Accessories
        </Link>
        <Link
          className={`${
            asPath === "/store" ? "border-black border-b" : ""
          } hover:text-emerald-600 hover:border-red-700 hover:border-b transition-all`}
          href="/store">
          Store
        </Link>
        <Link
          className={`${
            asPath === "/addpet" ? "border-black border-b" : ""
          } hover:text-emerald-600 hover:border-red-700 hover:border-b transition-all`}
          href="/addpet">
          Pet
        </Link>
        <Link
          className={`${
            asPath === "/profile" ? "border-black border-b" : ""
          } hover:text-emerald-600 hover:border-red-700 hover:border-b transition-all`}
          href="/profile">
          Profile
        </Link>
        {session?.user.role === "admin" ? (
          <Link
            className={`${
              asPath === "/admin" ? "border-black border-b" : ""
            } hover:text-emerald-600 hover:border-red-700 hover:border-b transition-all`}
            href="/admin">
            Me
          </Link>
        ) : null}

        {status === "authenticated" ? (
          <button onClick={(event) => onLogOutClick(event)}>Logout</button>
        ) : (
          <button onClick={(event) => onLoginClick(event)}>Login</button>
        )}
        {status === "unauthenticated" ? (
          <button onClick={(event) => onRegisterClick(event)}>Register</button>
        ) : null}
        <Link
          href="/cart"
          className={` relative ${
            asPath === "/cart" ? "border-black border-b" : ""
          } hover:text-emerald-600 hover:border-red-700 hover:border-b transition-all`}>
          {cart > 0 ? (
            <span className="absolute -top-2 -right-2 bg-[#48cae4] rounded-full w-5 h-5 text-center flex justify-center items-center  text-base text-white">
              {cart}
            </span>
          ) : null}

          <Shop />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
