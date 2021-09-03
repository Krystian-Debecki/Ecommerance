import '../styles/ComponentsStyles/BasketItem.css'

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { DEL_FROM_BASKET } from '../reducer/actions/basketActions'

const BasketItem = ({img,id=1,name='PLACEHOLDER',left=10,price=200,inBasket}) => {
    console.log(price)
    const dispatch = useDispatch();

    const handleClick = () =>{
        dispatch({
            type: DEL_FROM_BASKET,
            id,
        })
    }

    return (
        <li className="basket-item">
            <Link to={`/item/${id}`}>
                <img 
                    src={img}
                    alt={name}
                    className="basket-item__img"
                />
            </Link>


            <p className="basket-item__info">
                <Link to={`/item/${id}`}>
                    <span className="basket-item__product-name">{name}</span>
                </Link>
                <span className="basket-item__products-in-basket">W koszyku: <span className="basket-item__price">{inBasket}</span></span>
                <span>Cena: <span className="basket-item__price">{(price*inBasket).toFixed(2)} zł</span> </span>
            </p>

            <button 
                className="offer-row__button basket-item__delete"
                onClick={handleClick}
            >
                Usuń
            </button>

        </li>   
    )
}

export default BasketItem