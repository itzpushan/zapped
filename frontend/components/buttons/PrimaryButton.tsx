import { ReactNode } from "react";

export const PrimaryButton = ({
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
      className={`${size === "small" ? "text-sm" : "text-xl"} ${
        size === "small" ? "px-8 py-2" : "px-10 py-4"
      } bg-[#ff4f00] text-white rounded-full hover:shadow-md cursor-pointer text-center`}
    >
      {children}
    </div>
  );
};
