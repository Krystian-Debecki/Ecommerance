import { Link } from 'react-router-dom'

import '../styles/ComponentsStyles/Navigation.css'

import { useBasket, useFavorites } from '../provider/appProvider'

import { useState } from 'react'

import BurgerMenu from './BurgerMenu'

import FavIcon from './FavsIcon'
import BasketIcon from './BasketIcon'
import BurgerIcon from './BurgerIcon'

const Navigation = ({user}) =>{
    const basket = useBasket()
    const favs = useFavorites()

    const [burger,setBurger] = useState(false)
    
    const handleClick = () => {
        setBurger(!burger)
    }

    return (
        <ul className="nav" >

                <li className="nav__item nav__no-burger"> 
                <Link to="/favorites">
                    <FavIcon />
                    {
                        favs.length 
                        ? (<div className="nav__basket-items nav__favs-items">
                            {favs.length}
                            </div>)
                        : null
                    } </Link>
                </li>
           

            
                <li className="nav__item nav__no-burger"> 
                <Link to="/basket">
                    {
                        basket.length 
                        ? (<div className="nav__basket-items">
                            {basket.length}
                            </div>)
                        : null
                    }
                    
                    <BasketIcon />
                    </Link>
                </li>
            

            
                <li className={`nav__item ${user && 'nav__user-logged'} nav__no-burger`}> 
                    <Link to="/user">
                        {user || 'Zaloguj się'}
                        </Link>
                </li>
             
                    {
                        
                        burger 
                        ? (<li 
                            onClick={handleClick} 
                            className="nav__item nav__burger nav__burger-off"
                            >
                                X
                            </li>)

                        : (<li 
                            onClick={handleClick} 
                            className="nav__item nav__burger">
                                <BurgerIcon />
                            </li>)
                    }
                    
                   { burger && <BurgerMenu user={user}/> }
        </ul>
    )
}

export default Navigation