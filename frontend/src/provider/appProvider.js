import { createStore } from "redux";
import { useSelector } from "react-redux";

import rootReducer from "../reducer/reducer";

const store = createStore(rootReducer);

console.log(store.getState())

export default store


export const useBasket = () => useSelector(state => state.basketReducer)
export const useFavorites = () => useSelector(state => state.favoritesReducer)
export const useUsers = () => useSelector(state => state.userReducer)