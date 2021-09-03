import init from './initialStates/favInit'

import { Server } from '../config';

import 
    { 
    ADD_TO_FAVORITES, 
    REMOVE_FROM_FAVORITES,
    FAV_SUCCESS,
    FAV_FAILURE,
    FAV_LOADING
    } 
from './actions/favoritesActions'

const changeUserFavorites = async (newBasket) => {
    let id = [];
    newBasket.forEach(item => id.push(item.id) )

    let response = await fetch(`${Server}/api/user/saveFavorites`,{
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(id),
        method:"PUT"
    })

    console.log(response)
}

const changeLocalFavorites = async (newFavorites) => {
    let id = [];
    let inFavorites = []
    newFavorites.forEach(item => {
        id.push(item.id)
    })

    console.log(newFavorites)

    localStorage.setItem('favorites', id)

    console.log(localStorage.getItem('favorites').split(','))
}

function favoritesReducer(state = init, action) {
    switch (action.type) {
        case FAV_LOADING: return []

        case FAV_SUCCESS: 
            return action.payload.favorites;

        case FAV_FAILURE: 
            return []

        case ADD_TO_FAVORITES:
            if(localStorage.getItem('token')){
                changeUserFavorites([...state,{...action.payload}])
            }else{
                changeLocalFavorites([...state,{...action.payload}])
            }
            
            return [
                ...state,
                {...action.payload}
            ]

        case REMOVE_FROM_FAVORITES: 
        const favorites = state.filter(element => element.id !== action.id);
        if(localStorage.getItem('token')){
            changeUserFavorites(favorites)
        }else{
            changeLocalFavorites([favorites])
        }
            return favorites

        default:
            return state
    }
}

export default favoritesReducer