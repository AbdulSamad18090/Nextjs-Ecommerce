import Navbar from '@/Components/Navbar'
import React from 'react'
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';



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
            <Button style={{ backgroundColor: 'black', margin: '30px 0px', width: '100%' }} variant="contained">Add to Cart</Button>
          </div>
        </div>
      </div>
    </>
  )
}
