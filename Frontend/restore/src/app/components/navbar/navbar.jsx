import React from 'react';
import Link from 'next/link';
import './Navbar.css';
import { FaBars, FaHome } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import Searchbar from '../searchbar/searchbar';

export const Navbar = () => {
  return (
    <nav className='container'>
      <Link className='link' href={'/home'}>
        <FaHome fontSize={30} />
      </Link>
      <FaBars />
      <FiShoppingCart />
      <Link className='link' href={'/user'}>
        User
      </Link>
      <Link className='link' href={'/'}>
        Signup/Login
      </Link>
      <Searchbar />
    </nav>
  );
};
