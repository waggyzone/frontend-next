import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import Shop from "../Icon/Shop.Icon";

const Header: React.FC = () => {
  const { status } = useSession();
  /**
   * @namespace Header
   * @name onLogOutClick
   * @param event
   */
  const onLogOutClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    signOut();
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
      <div>logo</div>
      <nav className="space-x-6 flex flex-row">
        <Link href="/">Home</Link>
        <Link href="/product">Product</Link>
        <Link href="/accessories">Accessories</Link>
        <Link href="/store">Store</Link>
        <Link href="/cart">Cart</Link>

        {status === "authenticated" ? (
          <button onClick={(event) => onLogOutClick(event)}>Logout</button>
        ) : (
          <button onClick={(event) => onLoginClick(event)}>Login</button>
        )}
        {status === "unauthenticated" ? (
          <button onClick={(event) => onRegisterClick(event)}>Register</button>
        ) : null}
        <Shop />
      </nav>
    </header>
  );
};

export default Header;
