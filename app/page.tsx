import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/product-card";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <h1>User: {session ? session.user!.name : 'undefined'}</h1>
      <ProductCard/>
    </div>
  );
}
