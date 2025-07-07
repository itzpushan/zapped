"use client";
import { AppBar } from "@/components/AppBar";
import { DarkButton } from "@/components/buttons/DarkButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { useRouter } from "next/navigation";
import { LinkButton } from "@/components/buttons/LinkButton";

interface Zap {
  id: string;
  triggerId: string;
  userId: number;
  actions: {
    id: string;
    zapId: string;
    actionId: string;
    sortingOrder: number;
    type: {
      id: string;
      name: string;
      image: string;
    };
  }[];
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
      image: string;
    };
  };
}

function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(() => {
    const res = axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setZaps(res.data.zaps);
        setLoading(false);
      });
  }, []);

  return { loading, zaps };
}

export default function () {
  const router = useRouter();
  const { loading, zaps } = useZaps();
  return (
    <div>
      <AppBar />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <div className="flex justify-between pr-8">
            <div className="text-2xl font-bold">My Zaps</div>
            <DarkButton
              onClick={() => {
                router.push("/zap/create");
              }}
            >
              Create
            </DarkButton>
          </div>
        </div>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <div className="flex justify-center pt-8">
          <ZapTable zaps={zaps} />
        </div>
      )}
    </div>
  );
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
  const router = useRouter();
  return (
    <div className="p-8 max-w-screen-lg w-full">
      <div className="flex">
        <div className="flex justify-center flex-1 p-4">Name</div>
        <div className="flex justify-center flex-1 p-4">ID</div>
        <div className="flex justify-center flex-1 p-4">Webhook URL</div>
        <div className="flex justify-center flex-1 p-4">Go</div>
      </div>
      {zaps.map((z) => (
        <div className="flex border-b border-t py-4">
          <div className="flex justify-center flex-1 p-4">
            <img src={z.trigger.type.image} className="w-[30px] h-[30px]" />
            {z.actions.map((x) => (
              <img src={x.type.image} className="w-[30px] h-[30px]" />
            ))}
          </div>
          <div className="flex justify-center flex-1 p-4">{z.id}</div>
          <div className="flex justify-center flex-1 p-4">{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</div>
          <div className="flex justify-center flex-1 p-4">
            <LinkButton
              onClick={() => {
                router.push("/zap/" + z.id);
              }}
            >
              Go
            </LinkButton>
          </div>
        </div>
      ))}
    </div>
  );
}
