'use client'

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Home() {
  const router = useRouter();

  useLayoutEffect(() => {
    router.push('/login');
  }, []);

  return (
    <>
    </>
  );
}
