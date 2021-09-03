import '../styles/LayoutsStyles/UserPage.css'

import Logout from "../components/Logout"

import UserBasket from '../components/UserBasket'
import UserFavs from '../components/UserFavs'

import { getBasket, getFavorites } from '../handlers/fetches'

import { useState, useEffect } from 'react'
import { useUsers } from '../provider/appProvider'
import { Server } from '../config'
import { useDispatch } from 'react-redux'

const UserPage = () => {
    const [state,setState] = useState();
    const dispatch = useDispatch()
    const handleClick = (show) => {
        return setState(show)
    }

    const {logged} =  useUsers()
    const [user,setUser] = useState('');

    useEffect(() => {
        const getUserName = async () => {
            let response = await fetch(`${Server}/api/login/getName`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            })
            response = await response.json();
            
            if(response) return setUser(response)
        }

        if(logged) {
            if(localStorage.getItem('token')){
                getBasket(dispatch)
                getFavorites(dispatch)
            }
            return getUserName()
        }
        setUser("")
    },[logged])

    return (
        <div className="user">
            <div className="user__info">
                <div className="user__main-info">
                    <div className="user__logo-wrap">
                        <img src="./img/user_img.png" className="user__logo"/>
                    </div>
                    <h2 className="user__name">{user || 'User Name'}</h2>
                        <Logout />                       
                </div>
                
            </div>

            <div className="user__content">
                <ul className="user__data-list">
                    <span className="user__border-grow"></span>

                    <li 
                        className={
                            `user__data-list-item 
                            ${state === 'favorites' && 'user__data-list-item--active'}`}
                        onClick={()=> handleClick('favorites')}
                    >
                        Ulubione
                    </li>

                    <li 
                        className={
                            `user__data-list-item 
                            ${state === 'basket' && 'user__data-list-item--active'}`}
                        onClick={()=> handleClick('basket')}
                    >
                        Koszyk
                    </li>

                    <span className="user__border-grow"></span>
                </ul>
                <div className="user__data">
                    {state === 'favorites' && <UserFavs />}
                    {state === 'basket' && <UserBasket />}              
                </div>
            </div>
        </div>
    )
}

export default UserPage