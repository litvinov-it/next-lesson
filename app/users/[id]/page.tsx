import { notFound } from 'next/navigation'
import React from 'react'

interface Props{
    params: {id: number}
}

const UserDetailPage = ({params: {id} }: Props) => {
  if (id > 10) notFound();
  
  return (
    <>
    <div>User id is {id}</div>
    </>
  )
}

export default UserDetailPage;