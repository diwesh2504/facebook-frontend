import React from 'react';

const NavBar=()=>{

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
      <ul className="nav">
        
        <li className="nav-item">
          <a className="nav-link" href="#">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            About
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Contact Us
          </a>
          </li>
    </ul>
    </nav>
    );
}

export default NavBar;