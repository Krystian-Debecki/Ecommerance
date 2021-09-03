import { combineReducers } from "redux";

import basketReducer from "./basketReducer";
import favoritesReducer from './favoritesReducer'
import userReducer from './userReducer'

console.log(basketReducer)

const rootReducer = combineReducers({
    basketReducer,
    favoritesReducer,
    userReducer,
})

export default rootReducer