"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const LoginButton = () => {
  const { status, data: session } = useSession();

  return (
    <>
      {status === "loading" && <div>loading...</div>}
      {status === "authenticated" && <div>
      {session.user!.name + ' '}
      <Link href='/api/auth/signout'>signout</Link>
        </div>}
      {status === "unauthenticated" && <Link href="/api/auth/signin">signin</Link>}
    </>
  );
};

export default LoginButton;
