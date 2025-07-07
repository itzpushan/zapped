"use client";
import { chdir } from "process";
import { ReactNode } from "react";

export const LinkButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex justify-center px-2 py-2  cursor-pointer hover:bg-[#ebe9df] font-light text-sm rounded-xl"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
