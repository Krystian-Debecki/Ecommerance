import { useState } from "react"

import '../styles/LayoutsStyles/Forms.css'

import { Server } from '../config'
import { useHistory } from "react-router"

const UserRegisterPage = ({userIsLogged}) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const history = useHistory()

    const handleClick = () => {
        if(!name) return alert('Nie podano nazwu użytkownika')
        if(!password) return alert('Nie podano hasła')
        if(!email) return alert('Nie podano emailu')

        const data = {
            name,
            password,
            email,
        }
        
        fetch(`${Server}/api/login/register`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(response =>{
            if(response.message){
                return alert(response.message)
            }

            alert('Udało się zarejestrować użytkownika!')             
            history.push('/user')
    })
        .catch(err => console.error(err))
        

    }

    return (
        <main className="main">
            <form onClick={e => e.preventDefault()} className="form">

                <label htmlFor="login" className="label">
                <span className="label__text">Nazwa: </span>
                    <input 
                        type="text" 
                        id="name" 
                        className="input"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>

                <label htmlFor="email" className="label">
                    <span className="label__text">Adres email: </span>
                    <input 
                        className="input"
                        type="email"
                        pattern='/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
                        id="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>

                <label htmlFor="password" className="label">
                <span className="label__text">Hasło: </span>
                    <input 
                        className="input"
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>

                <button onClick={handleClick} className="offer-row__button label__btn">
                    Zarejestruj się
                </button>
            </form>
        </main>
    )
}

export default UserRegisterPage