import Navbar from '@/Components/Navbar'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Link from 'next/link';


let Cart = [];
const handleAddToCart = (data) => {
  let count = false;
  for(let i=0; i<Cart.length; i++){
    if (Cart[i].id == data.id) {
      count = true;
    }
  }
  if (count) {
    alert("Product is already in shopping cart!")
  } else {
    Cart.push(data);
    alert("Successfully Added to The Cart!");
  }
}
export async function getStaticPaths() {
  const res = await fetch('https://fakestoreapi.com/products')
  const data = await res.json();
  const paths = data.map((currElem) => {
    return {
      params: {
        productId: currElem.id.toString(),
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export function CartProducts() {
  return Cart;
}

export async function getStaticProps(context) {
  const id = context.params.productId;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  return {
    props: {
      data,
    }
  }
}

export default function productDescribtion({ data }) {
  const [products, setProducts] = useState([]);
  const [Cart, SetCart] = useState([]);

  const getProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <>
      <Navbar links={['home', 'products', 'about']} />
      <div className='product-description-page'>
        <h1>{data.category.toUpperCase()}</h1>
        <div className="product">
          <img className='img' src={data.image} alt="img" />
          <div className='description'>
            <h2>{data.title}</h2>
            <h4 style={{ textDecoration: 'underline' }}>Description:</h4>
            <p>{data.description}</p>
            <div className="pricing">
              <h4>Price: ${data.rating.count}</h4>
              <h4>Category: {data.category}</h4>
              <div className="rating">
                <h4>Rating: </h4>
                <Rating style={{ color: 'black', marginTop: '8px', marginRight: '10px' }} name="half-rating-read" defaultValue={data.rating.rate} precision={0.1} readOnly />
              </div>
            </div>
            <Button
              style={{ backgroundColor: 'black', margin: '30px 0px', width: '100%' }}
              variant="contained"
              onClick={() => { handleAddToCart(data) }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
        <h1 style={{ margin: '30px 10px', paddingTop: '20px' }}>RELATED PRODUCTS</h1>
        <div className="related-products">
          {
            products.map((product, index) => {
              if ((product.category == data.category) && (product.id != data.id)) {
                return (
                  <Grid key={index} item xs={2} sm={4} md={4}>
                    <Link href={`/products/${product.id}`}>
                      <div className='card' style={{ width: '300px' }}>
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
              }
            })
          }
        </div>
      </div>
    </>
  )
}
