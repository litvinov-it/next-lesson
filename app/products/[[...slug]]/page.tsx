import React from 'react'


interface Props{
    params: {slug?: string[] },
    searchParams: {sortOrder?: string}
}
const ProductPage = ({params: {slug}, searchParams: {sortOrder} }: Props) => {
  return (
        <>
            {slug && slug.map((s, i) => <div key={i}>{s}</div>)}
            {
                sortOrder && <div>Order BY {sortOrder}</div>
            }
        </>
  )
}

export default ProductPage;