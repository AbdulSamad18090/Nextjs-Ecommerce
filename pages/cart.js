import React from 'react'
import Navbar from '@/Components/Navbar'
import { CartProducts } from './products/[productId]'
import Link from 'next/link';
import { Button } from '@mui/material';

export default function cart() {
  const products = CartProducts();
  if (products.length == 0) {
    return (
      <>
        <Navbar links={['home', 'products', 'about']} />
        <div className="cart-page" style={{ padding: '30px' }}>
          <h1 style={{ textAlign: 'center' }}>YOUR SHOPPING CART</h1>
          <div className="cart-items-container" style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3 style={{margin: '7px'}}>Your Cart is Empty!</h3>
            <Link href={'/products'} style={{textDecoration: 'none'}}>
              <Button variant='contained' style={{ backgroundColor: 'black'}}>shop now</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar links={['home', 'products', 'about']} />
      <div className="cart-page" style={{ padding: '30px' }}>
        <h1 style={{ textAlign: 'center' }}>YOUR SHOPPING CART</h1>

        <div className="cart-items-container">
          {
            products.map((product) => {
              return (
                <div className="cart-item">
                  <h3>{product.id}</h3>
                  <h3>{product.title}</h3>
                </div>
              )
            })
          }
        </div>

      </div>
    </>
  )
}
