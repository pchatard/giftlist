import giftlistLogoDark from "/giftlist-dark.svg";
import giftlistLogoLight from "/giftlist.svg";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <>
      <Link to="/">
        <img
          className="dark:hidden"
          alt="Giftlist Logo"
          src={giftlistLogoLight}
        />
        <img
          className="hidden dark:block"
          alt="Giftlist Logo"
          src={giftlistLogoDark}
        />
      </Link>
    </>
  );
};
