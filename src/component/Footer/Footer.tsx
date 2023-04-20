import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center items-center flex-col bg-black-perl text-white bg-black">
      <div className="flex flex-row justify-evenly gap-10 w-full">
        <div className="flex flex-col">
          <a>Help</a>
          <a>Login</a>
        </div>
        <div className="flex flex-col">
          <a>Cookie Policy</a>
          <a>Privary Policy</a>
          <a>Terms of service</a>
          <a>Company Details</a>
        </div>
        <div className="flex flex-col">
          <a>Explore</a>
          <a>Company</a>
          <a>Partners</a>
          <a>Trips</a>
          <a>International Sites</a>
        </div>
      </div>
      <div>&#169; a2b Travels {new Date().getFullYear()}</div>
    </footer>
  );
};

export { Footer };
