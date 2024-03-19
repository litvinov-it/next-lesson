import Link from 'next/link';
import React from 'react';
import {sort} from 'fast-sort';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
  sortOrder: string
}

const UserTable = async({sortOrder}: Props) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await res.json();

    const sortedUsers = sort(users).asc(sortOrder == 'email' ? user =>  user.email : user => user.name)

  return (
    <div className='flex flex-col items-center'>
    <table className="table-md w-3/5 mt-5">
        <thead>
          <tr>
            <th className='border border-gray-300'><Link href="/users?sortOrder=name">Name</Link></th>
            <th className='border border-gray-300'><Link href="/users?sortOrder=email">Email</Link></th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr  key={user.id}>
              <td className='border border-gray-300'>{user.name}</td>
              <td className='border border-gray-300'>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  )
}

export default UserTable