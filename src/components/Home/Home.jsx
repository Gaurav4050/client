import React from 'react'
import { useAuth } from '../../Context/useAuth'
import { Link } from 'react-router-dom'

const Home = () => {
    const auth= useAuth()
    const handleClick = () => {
        console.log('Home')
        auth.login()
    }
    console.log(auth)
  return (
    <>
    <h1>{auth.user}</h1>
    <button onClick={()=>handleClick()}>Home</button>

    <Link to="/contact">About</Link>
    </>
  )
}

export default Home