/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'

export const NavBar = () => {
    const [ isActive, setActive ] = useState(false)

    return <nav className='navbar is-black' role='navigation' aria-label='main navigation'>
        <div className='container'>
            <div className='navbar-brand'>
                <a className='navbar-item'>
                    <img src='SocialQ.png' style={{ height:44, maxHeight: 'none' }} alt={'SocialQ logo'}/>
                    <p className='navbar-item' style={{ fontSize: '2.25em', color:'white', marginLeft:'0.5rem' }}>
                        Engageable 
                    </p>
                </a>

                <a 
                    role='button' 
                    className={`navbar-burger ${isActive ? 'is-active': ''}`}
                    aria-label='menu' 
                    aria-expanded='false' 
                    data-target='navbarBasicExample'
                    onClick={()=> setActive(!isActive)}
                >
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                </a>
            </div>
        </div>
    </nav>
}
