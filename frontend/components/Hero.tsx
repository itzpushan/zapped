"use client";
import { SecondaryButton } from "./buttons/SecondaryButton";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { Feature } from "./Feature";
import { useRouter } from "next/navigation";
import { use, useReducer } from "react";
export const Hero = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-center">
        <div className="text-center pt-4 max-width max-w-lg">
          SCALE AI AGENTS WITH ZAPIER
        </div>
      </div>

      <div className="flex justify-center">
        <div className="text-6xl font-semibold text-center pt-6 max-width max-w-2xl">
          The most connected AI orchestration platform
        </div>
      </div>

      <div className="flex justify-center">
        <div className="text-xl font-normal text-center pt-8 max-width max-w-xl">
          Build and ship AI workflows in minutes—no IT bottlenecks, no
          complexity. Just results.
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <div className="flex">
          <PrimaryButton
            onClick={() => {
              router.push("/signup");
            }}
            size="big"
          >
            Get started free
          </PrimaryButton>
          <div className="pl-4"></div>
          <SecondaryButton onClick={() => {}} size="big">
            Contact Sales
          </SecondaryButton>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <Feature
          title={"Free forever"}
          subtitle={" for core features"}
        ></Feature>
        <Feature
          title={"More apps"}
          subtitle={"than any other platforms"}
        ></Feature>
        <Feature title={"Cutting-edge"} subtitle={" AI features"}></Feature>
      </div>
    </div>
  );
};
