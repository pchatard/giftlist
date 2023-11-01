import giftlistLogoDark from "/giftlist-dark.svg";
import giftlistLogoLight from "/giftlist.svg";

export const Logo = () => {
  return (
    <>
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
    </>
  );
};
