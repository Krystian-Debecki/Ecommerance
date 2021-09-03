import { useState } from "react"

import { Server } from '../config'
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { USER_LOGIN } from "../reducer/actions/userActions";

import { LOADING,SUCCESS,FAILURE } from "../reducer/actions/basketActions";

import { FAV_FAILURE,FAV_SUCCESS,FAV_LOADING } from "../reducer/actions/favoritesActions";
import { getBasket, getFavorites } from "../handlers/fetches";

const UserLoginPage = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')

    const dispatch = useDispatch()

    const handleClick = async () => {
        if(!password) return alert('Nie podano hasła')
        if(!email) return alert('Nie podano emailu')

        const auth = {
            password,
            email,
        }
        
        const response = await fetch(`${Server}/api/login`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(auth)
        })

        const data = await response.json()

        if(!data.token) return alert("Coś poszło nie tak")
        
        localStorage.setItem('token', data.token)
        dispatch({
            type:USER_LOGIN
        })

        if(localStorage.getItem('token')){
            getBasket(dispatch)
            getFavorites(dispatch)
        }
            
    }

    return (
        <main className="main">
            <form onClick={e => e.preventDefault()} className="form">
                <label htmlFor="email" className="label">
                    <span className="label__text">Adres email: </span>
                    <input 
                        type="email"
                        pattern='/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
                        id="email" 
                        className="input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>

                <label htmlFor="password" className="label">
                <span className="label__text">Hasło: </span> 
                    <input 
                        type="password" 
                        id="password" 
                        className="input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>

                <button onClick={handleClick} className="offer-row__button label__btn">
                    Zaloguj się
                </button>

                    <p className="register-yourself">
                        Nie masz jeszcze konta? 
                        <Link to="/register">
                            <span className="register-yourself__link"> Zarejestruj się</span>
                        </Link>
                    </p>
                
            </form>
        </main>
    )
}

export default UserLoginPage