"use client";
import LoaderCercle from "@/components/LoaderCercle";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  });
  return <LoaderCercle />;
}
