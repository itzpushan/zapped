"use client";
import { ReactNode } from "react";

export const DarkButton = ({
  children,
  onClick,
  size = "small",
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "small" | "big";
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col justify-center px-8 py-2 text-white rounded bg-purple-800 hover:shadow-md cursor-pointer`}
    >
      {children}
    </div>
  );
};
