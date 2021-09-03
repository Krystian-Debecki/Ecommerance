import {Link, useParams} from 'react-router-dom'

import '../../styles/ComponentsStyles/FavoritesItem.css'

import { ADD_TO_BASKET,INC_IN_BASKET } from '../../reducer/actions/basketActions'
import { REMOVE_FROM_FAVORITES, ADD_TO_FAVORITES } from '../../reducer/actions/favoritesActions'
import { useDispatch } from 'react-redux'
import { useFavorites, useBasket } from '../../provider/appProvider'
import { useState, useEffect } from 'react'
import { initialIsInFavState } from '../../handlers/favoritesActions'


const Offer = ({
    img, 
    isfav=false, 
    id, 
    name='PLACEHOLDER', 
    left=0, 
    price=0,
    sale="",
}) => {

    const dispatch = useDispatch()
    const favs = useFavorites();
    const basket = useBasket();
    
    const [isInFav,setIsInFav] = useState(initialIsInFavState(favs,id))

    const payload = {
            img,
            id,
            name,
            left,
            price,
    }

    

    const handleAddToBasket = () => {
        if(basket.length > 0){
            for(let item of basket)
                if(item.id === id)
                    return;
        }
    
        dispatch({
            type: ADD_TO_BASKET,
            payload,
        })
    }
    
   const handleRemoveFav = () => dispatch({
            type: REMOVE_FROM_FAVORITES,
            id,
        })
    
    
    const handleAddFav = () => dispatch({
            type: ADD_TO_FAVORITES,
            payload,
        })
    

    const handleFavoriesActions = () => {
        switch(isInFav){
            case false:
                setIsInFav(true)
                return handleAddFav()
            case true:
                setIsInFav(false)
                return handleRemoveFav()
            default: return;
        }
    }

    return (

        <div className="offer-row__content">

            <Link to={`/item/${id}`} >
                <div className="offer-row__img-wrap">
                    
                <img 
                    className="offer-row__img"
                    src={img}
                    alt="offer-img"
                />

                </div>
            </Link>

            <Link to={`/item/${id}`} >
                <h3 className="offer-row__name">
                    {name}
                </h3>
            </Link>

            <div>
                <span className="offer-row__items-left">Zostało {left} sztuk</span>
                <h3 className="offer-row__price">
                    {   !sale 
                        ? <span>{price} zł </span>
                        : <span><span 
                            className="offer-row__before-disc-price"
                            >   
                                {price}
                        </span>
                            <span 
                                className="offer-row__after-disc-price"
                            >
                                {(price-price*sale.discount).toFixed(2)} zł
                        </span></span>
                        
                    } 

                    <span 
                        className="offer-row__add-to-fav" 
                        onClick={handleFavoriesActions}
                    >
                        {
                            isInFav
                            ? '💛'
                            : '🤍'
                        }
                    </span>

                </h3>
                
            </div>

            <button 
                className="offer-row__button"
                onClick={ handleAddToBasket }    
            >
                Dodaj do koszyka
            </button>

            {
                isfav ?
                <button 
                    className="offer-row__button favorites-item__delete"
                    onClick={handleRemoveFav}>
                    
                    Usuń</button> 
                : null
            }
            

        </div>

    )

}

export default Offer