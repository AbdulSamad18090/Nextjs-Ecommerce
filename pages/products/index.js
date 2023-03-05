import Navbar from '@/Components/Navbar'
import React, { useState } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link';

export async function getStaticProps(context) {
  const res = await fetch('https://fakestoreapi.com/products');
  const Data = await res.json();
  return {
    props: { Data }, // will be passed to the page component as props
  }
}

export default function products({ Data }) {
  const [products, setProducts] = useState(Data);
  return (
    <>
      <Navbar links={['home', 'products', 'about']} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
          {
            products.map((product, index) => {
              return (
                <Grid key={index} item xs={2} sm={4} md={4}>
                  <Link href={`/products/${product.id}`}>
                    <div className='card'>
                      <img className='product-image' src={product.image} alt="product-image" />
                      <div className="about-product">
                        <div style={{ border: '1px solid rgb(211, 211, 211)', padding: '20px 10px', marginTop: '10px', borderRadius: '10px', backgroundColor: '#fcfcfc', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                          <h4>{product.title}</h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Grid>
              )
            })
          }
        </Grid>
      </Box>
    </>
  )
}
