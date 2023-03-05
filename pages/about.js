import Navbar from '@/Components/Navbar'
import React from 'react'

export default function about() {
  return (
    <>
      <Navbar links={['home', 'products', 'about']} />
      <h1>About Page</h1>
    </>
  )
}
