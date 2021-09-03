import '../styles/LayoutsStyles/MainPage.css'
import '../styles/LayoutsStyles/ProductPage.css'

import OffersRow from '../components/Offers/OffersRow'

import { useParams } from 'react-router'
import { Server } from '../config'
import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { ADD_TO_BASKET, CHANGE_IN_BASKET } from '../reducer/actions/basketActions'
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../reducer/actions/favoritesActions'
import { initialIsInFavState } from '../handlers/favoritesActions'

import { useBasket, useFavorites } from '../provider/appProvider'

const ProductPage = () =>{
    const [ product, setProduct ] = useState();
    const [ proposition, setProposition ] = useState();
    const favs = useFavorites()
    const basket = useBasket()
    
    const dispatch = useDispatch()
    const { id } = useParams();
    
    const setStartingValue = basket => {
        let value = 0;
        const inBasket = basket.find(item => item.id === id ) 
        if(inBasket) value = inBasket.inBasket
        return value
    }

    const showInBasket = item => {
        const show =  basket.find(el => el.id === item._id)
        if(show){
            const inBasket = show.inBasket
            return inBasket
        }

        return 0
        
    }

    const [inBasket,setInBasket] = useState(setStartingValue(basket))
    const [isInFav,setIsInFav] = useState(initialIsInFavState(favs,id))
    
    useEffect(() => {
        async function fetchData(){
            const res = await fetch(`${Server}/api/products/get?id=${id}`)
            const result = await res.json();
            setProduct(result.docs[0])

            const categoryRes = await fetch(`${Server}/api/products/get?category=${result.docs[0].category}`);
            const category = await categoryRes.json()
            setProposition(category)
        }


        try {
            fetchData()
        } catch (err) {
            console.error( err)
        }

        setIsInFav(initialIsInFavState(favs,id))
    }, [id])

    const handleClick = item => {

        const addToBasket = () => {
            if(basket.length > 0){
                for(let el of basket)
                    if(el.id === item._id){
                        return dispatch({
                            type: CHANGE_IN_BASKET,
                            payload: {
                                id: item._id,
                                inBasket,
            }})}}
        
            setInBasket(1)
            dispatch({
                type: ADD_TO_BASKET,
                payload: {
                    img: item.img,
                    id: item._id,
                    name: item.name,
                    left: item.left,
                    price: item.price,
            }})
    
            if(inBasket>0){
                setInBasket(inBasket)
                dispatch({
                    type: CHANGE_IN_BASKET,
                    payload: {
                        id: item._id,
                        inBasket,
            }})}
        }

        if(inBasket <= 0) return setInBasket(0)

        fetch(`http://localhost:3100/api/products/getLeft/${id}`)
        .then(res => res.json())
        .then(left => {
            if(parseInt(inBasket) > left.left){
                setInBasket(0)
                return alert('Nie można dodać do koszyka więcej sztuk niż zostało!')
        } else 
            addToBasket()
        })               
    }

    const handleChange = e => {
        setInBasket(e.target.value)
    }

    const handleRemoveFav = () => dispatch({
            type: REMOVE_FROM_FAVORITES,
            id,
        })
    
    
    const handleAddFav = product => {
        const {img,name,left,price} = product
    
        dispatch({
            type: ADD_TO_FAVORITES,
            payload: {
                img,
                id,
                name,
                left,
                price,
            }
        })
    }

    const handleFavoriesActions = product => {
        switch(isInFav){
            case false:
                setIsInFav(true)
                return handleAddFav(product)
            case true:
                setIsInFav(false)
                return handleRemoveFav()
            default: return;
        }
    }



    return (
        <main className="main product-page__wrap">

            <div className="product-page__info-wrap">
            <p className="product-page__add-to-fav product-page__mobile">
                    <span className="product-page__add-to-fav--pointer"
                    onClick={() =>handleFavoriesActions(product)}
                    >
                        {
                            isInFav
                            ? '💛 Ulubiony'
                            : '🤍 Dodaj do ulubionych'
                        }
                    </span>
                </p>

                <h2 className="product-page__product-name product-page__mobile">{product && product.name}</h2>

            <img 
                className="product-page__img"
                src={product && product.img}
                alt={product && product.name}
            />

            <div className="product-page__tools">

                <p className="product-page__add-to-fav">
                    <span className="product-page__add-to-fav--pointer"
                    onClick={() =>handleFavoriesActions(product)}
                    >
                        {
                            isInFav
                            ? '💛 Ulubiony'
                            : '🤍 Dodaj do ulubionych'
                        }
                    </span>
                </p>

                <h2 className="product-page__product-name">{product && product.name}</h2>
                <p className="product-page__category">{product && product.category}</p>
                <h3 className="product-page__price">{product && product.price} PLN </h3>
                <h3 className="product-page__category">Pozostało {product && product.left}</h3>
                <h5 className="product-page__price">W koszyku: {product && showInBasket(product)}</h5>

                <form className="product-page__add-to-basket-wrap" onSubmit={e => e.preventDefault()}>
                    <input 
                        type="number" 
                        className="product-page__products-amount"
                        value={inBasket}
                        onChange={handleChange}
                    />
                    <button 
                        className="
                            offer-row__button 
                            product-page__add-to-basket-btn"
                        onClick={() => handleClick(product)}
                    >
                        Dodaj do koszyka
                    </button>

                </form>

                <hr></hr>

                <ul className="product-page__desc">
                    <h3 className="product-page__desc-header">Opis produktu</h3>
                    {product && product.description.map((item,i) =>
                        <li 
                            className="product-page__desc-item"
                            key={'desc'+i}
                        >
                            {item}
                        </li> 
                    )}
                </ul>

            </div>
            </div>
            <OffersRow 
                data={proposition && proposition.docs}
            />

        </main>
    )
}

export default ProductPage