import React, { useContext, useState, useRef } from "react"
import './Navbar.css'

import logo from '../Assets/ElixirsLogo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom"
import { ShopContext } from "../../Context/ShopContext"
import nav_dropdown from '../Assets/dropdown_icon.png'

const Navbar = () =>{

    const[menue,setMenue] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menueRef = useRef();
    const dropdown_toggle = (e) =>{
        menueRef.current.classList.toggle('nav-menue-visible');
        e.target.classList.toggle('open');

    }


    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt=""/>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menueRef} className="nav-menue">
                <li onClick={()=>{setMenue("shop")}}><Link style={{ textDecoration: 'none',color: 'Black' }} to='/'>Shop</Link>{menue==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenue("women")}}><Link style={{ textDecoration: 'none',color: 'Black' }} to='/women'>women</Link>{menue==="women"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenue("men")}}><Link style={{ textDecoration: 'none',color: 'Black' }} to='/men'>Men</Link>{menue==="men"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenue("Collections")}}><Link style={{ textDecoration: 'none',color: 'Black' }} to='/Collections'>Collections</Link>{menue==="Collections"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                :<Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt=""/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar