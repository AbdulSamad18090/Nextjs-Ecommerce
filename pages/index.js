import React from 'react'
import Navbar from '../Components/Navbar';

export default function home() {
  return (
    <>
      <Navbar links={['home', 'products', 'about']} />
      <h1>Home Page</h1>
    </>
  )
}
