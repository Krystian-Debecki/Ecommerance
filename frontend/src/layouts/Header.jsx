import { Link } from 'react-router-dom'

import Logo from '../logo.png'

import Navigation from '../components/Navigation'
import Search from '../components/Search'


import '../styles/LayoutsStyles/Header.css'

import { useUsers } from '../provider/appProvider'

import { useEffect, useState } from 'react'

import { Server } from '../config'

const Header = () => {
    const {logged} =  useUsers()
    const [user,setUser] = useState();

    useEffect(() => {
        const getUserName = async () => {
            let response = await fetch(`${Server}/api/login/getName`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            })
            response = await response.json();
            
            console.log(response)
            if(response) return setUser(response)
        }

        if(logged) return getUserName()
        setUser("")
    },[logged])

    return (
        <header className="header">

                <Link to="/" >

                    <img
                        src={Logo}
                        alt="Logo"
                        className="header__logo"
                    />

                </Link>

                <Search />

                <Navigation user={user || ""}/>

        </header>
    )
}

export default Header