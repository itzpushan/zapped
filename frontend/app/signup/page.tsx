"use client";
import { AppBar } from "@/components/AppBar";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <AppBar></AppBar>
      <div className="flex justify-center">
        <div className="flex pt-8">
          <div className="flex-1 pt-20  px-4">
            <div className="font-semibold text-3xl pb-4">
              AI Automation starts and scales with Zapier
            </div>
            <div className="pb-6 pt-4">
              <CheckFeature label="Integrate 8,000+ apps and 300+ AI tools without code"></CheckFeature>
            </div>
            <div className="pb-6">
              <CheckFeature label="Build AI-powered workflows in minutes, not weeks"></CheckFeature>
            </div>
            <CheckFeature label="14-day trial of all premium features and apps"></CheckFeature>
          </div>
          <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
            <Input
              label={"Name"}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Your name"
            ></Input>

            <Input
              label={"Email"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Your Email"
            ></Input>

            <Input
              label={"Password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            ></Input>
            <div className="pt-4">
              <PrimaryButton
                onClick={async () => {
                  // Handle signup logic here
                  const res = await axios.post(
                    `${BACKEND_URL}/api/v1/user/signup`,
                    {
                      email: email,
                      password: password,
                      name: name,
                    }
                  );
                  router.push("/login");
                }}
                size="big"
              >
                Get started free
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
