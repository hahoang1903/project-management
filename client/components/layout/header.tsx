import React from "react";

type HeaderProps = {
  name: string;
  controlComponent?: React.ReactNode;
  isSmallText?: boolean;
};

const Header = ({
  name,
  controlComponent,
  isSmallText = false,
}: HeaderProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <h1
        className={`font-semibold dark:text-white ${isSmallText ? "text-lg @2xl:text-xl" : "text-xl @2xl:text-2xl"}`}
      >
        {name}
      </h1>
      {controlComponent}
    </div>
  );
};

export default Header;
