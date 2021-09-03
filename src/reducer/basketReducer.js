
import { ADD_TO_BASKET, 
    DEL_FROM_BASKET, 
    CHANGE_IN_BASKET,
    SUCCESS,FAILURE,
    LOADING,
    GET_LOCAL_BASKET } from './actions/basketActions'

import { Server } from '../config'

import init from './initialStates/basketInit'

const changeUserBasket = async (newBasket) => {
    let id = [];
    let inBasket = []

    newBasket.forEach(item => {
        id.push(item.id)
        inBasket.push(item.inBasket || 1)
    })

    let response = await fetch(`${Server}/api/user/saveBasket`,{
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ basket: id, inBasket:inBasket}),
        method:"PUT"
    })

    console.log(response)
}

const changeLocalBasket = async (newBasket) => {
    let id = [];
    let inBasket = []
    newBasket.forEach(item => {
        id.push(item.id)
        inBasket.push(item.inBasket<=1?1:item.inBasket)
    })

    console.log(newBasket)

    localStorage.setItem('basket', id)
    localStorage.setItem('inBasket', inBasket)

    console.log(localStorage.getItem('basket').split(','))
    console.log(localStorage.getItem('inBasket').split(','))
}

function basketReducer( state = init, action){
    let basket = []
    switch(action.type){
        case LOADING: return []

        case GET_LOCAL_BASKET: 
            console.log('ototo',localStorage.getItem('basket').split(','))
            return [action.payload]

        case SUCCESS: 
            return action.payload.basket;

        case FAILURE: 
            return []

        case ADD_TO_BASKET :
            if(localStorage.getItem('token')){
                changeUserBasket([...state,{...action.payload}])
            } else {
                changeLocalBasket([...state,{...action.payload}])
            }

            return  [ ...state, {...action.payload, inBasket: 1} ]

        case DEL_FROM_BASKET:
            basket = state.filter(element => element.id !== action.id)
            if(localStorage.getItem('token')){
                changeUserBasket(basket)
            } else {
                changeLocalBasket(basket)
            }
            return basket

        case CHANGE_IN_BASKET:
            basket = [...state];
            for( let item of basket){
                if(item.id === action.payload.id) item.inBasket = action.payload.inBasket
            }
            if(localStorage.getItem('token')){
                changeUserBasket(basket)
            } else {
                changeLocalBasket(basket)
            }
            return basket;

        default:
            return state
    }
}

export default basketReducer 
