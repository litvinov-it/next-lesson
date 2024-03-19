import React, { Suspense } from "react";
import UserTable from "./user-table";
import Link from "next/link";

interface Props {
  searchParams: {
    sortOrder: string;
  };
}

const Skeleton = () => <div className="skeleton w-3/5 h-96 m-auto mt-8"></div>

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <div>
      <h1 className="text-3xl text-center mb-5 font-extrabold">Users</h1>
      <Link href="/users/new" className="btn btn-primary">
        Create User
      </Link>
      <Suspense fallback={<Skeleton />}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </div>
  );
};

export default UsersPage;
