import React, { useState } from 'react'
import Navbar from '@/Components/Navbar'
import { CartProducts } from './products/[productId]'
import Link from 'next/link';
import { Button } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function cart() {
  //const products = CartProducts();
  const [products, setProducts] = useState(CartProducts());
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity != 1) {
      setQuantity(quantity - 1)
    }
  }

  const deleteCartItem = (index) => {
    /* setProducts(products.splice(index, 1)); */
  }

  if (products.length == 0) {
    return (
      <>
        <Navbar links={['home', 'products', 'about']} />
        <div className="cart-page" style={{ padding: '30px' }}>
          <h1 style={{ textAlign: 'center' }}>YOUR SHOPPING CART</h1>
          <div className="cart-items-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: '7px' }}>Your Cart is Empty!</h3>
            <Link href={'/products'} style={{ textDecoration: 'none' }}>
              <Button variant='contained' sx={{
                backgroundColor: 'black',
                "&:hover": {
                  backgroundColor: 'orange',
                  color: 'black'
                }
              }}>shop now</Button>
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
            products.map((product, index) => {
              return (
                <div key={index} className="cart-item">
                  <img className='cart-item-image' src={product.image} alt="img" />
                  <div className="divider"></div>
                  <div className="title">
                    <Link href={`/products/${product.id}`} style={{ color: 'black' }}>
                      <h>{product.title}</h>
                    </Link>
                  </div>
                  <div className="divider"></div>
                  <div className="quantity-inc-dec">
                    <button className='inc-dec' onClick={handleDecrement}>-</button>
                    <span className='quantity'> {quantity} </span>
                    <button className='inc-dec' onClick={handleIncrement} sx={{ backgroundColor: 'black' }}>+</button>
                  </div>
                  <div className="divider"></div>
                  <div className="price">
                    <h3>${quantity * product.rating.count}</h3>
                  </div>
                  <div className="divider"></div>
                  <div className="delete">
                    <DeleteOutlinedIcon fontSize='large' htmlColor='red' style={{ cursor: 'pointer' }}
                      onClick={() => { deleteCartItem(index) }}
                    />
                  </div>
                </div>
              )
            })
          }
        </div>

      </div>
    </>
  )
}
