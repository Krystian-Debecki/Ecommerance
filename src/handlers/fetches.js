import { Server } from "../config";

import { FAV_FAILURE,FAV_SUCCESS,FAV_LOADING } from "../reducer/actions/favoritesActions";
import { GET_LOCAL_BASKET,LOADING,FAILURE,SUCCESS } from "../reducer/actions/basketActions";

export const getLocalFavorites = async dispatch => {
    console.log('localF')
    console.log(localStorage.getItem('favorites'))
    dispatch({ type: FAV_LOADING})
        
    const response = await fetch(`${Server}/api/user/getLocalFavorites`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(localStorage.getItem('favorites').split(',')) 
    })
    const data = await response.json()

    let favorites = data.map((item,i) => { 
        return ({ ...item, id: item._id }
    )})

    if(favorites) 
        return dispatch({ type: FAV_SUCCESS, payload:{ favorites,}})

    
    return dispatch({ type: FAV_FAILURE})
}


export const getLocalBasket = async dispatch => {
    console.log('localB')
    dispatch({ type: LOADING})
    
    const response = await fetch(`${Server}/api/user/getLocalBasket`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(localStorage.getItem('basket').split(',')) 
    })
    const data = await response.json()

    let basket = data.map((item,i) => { 
        return ({ ...item, id: item._id }
    )})

    const inBasket = localStorage.getItem('inBasket').split(',').map(item => {
        if(item === "") return 1;
        return item 
    })

    console.log(inBasket)
    if(basket) {
        basket = basket.map((element,i) => {
            return {...element,inBasket: inBasket[i]}
        });
        
        return dispatch({ type: SUCCESS, payload:{ basket,}})

    }
    return dispatch({ type: FAILURE})
}

export async function getBasket(dispatch){
    console.log('B')
    dispatch({ type: LOADING})
    const response = await fetch(`${Server}/api/user/getBasket`,{
        headers: {'x-auth-token': localStorage.getItem('token')} 
    })
    const data = await response.json()

    const basket = data.basket.map((item,i) => { 
        return ({ ...item, inBasket: data.inBasket[i], id: item._id }
    )})

    console.log(basket)
    if(basket) return dispatch({ type: SUCCESS, payload:{ basket }})
    return dispatch({ type: FAILURE})

}

export async function getFavorites(dispatch){
    console.log('F')
    dispatch({ type: FAV_LOADING})
    const response = await fetch(`${Server}/api/user/getFavorites`,{
        headers: {'x-auth-token': localStorage.getItem('token')} 
    })
    const data = await response.json()

    const favorites = data.favorites.map((item,i) => { 
        return ({ ...item, id: item._id }
    )})

    if(favorites) return dispatch({ type: FAV_SUCCESS, payload:{ favorites:favorites }})
    return dispatch({ type: FAV_FAILURE})

}
