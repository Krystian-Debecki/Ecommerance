import { useUsers } from "../provider/appProvider"
import { useDispatch } from "react-redux";
import { USER_LOGOUT } from "../reducer/actions/userActions";
import { GET_LOCAL_BASKET,LOADING,FAILURE,SUCCESS } from "../reducer/actions/basketActions";
import { FAV_FAILURE,FAV_SUCCESS,FAV_LOADING } from "../reducer/actions/favoritesActions";
import { Server } from "../config";

import { getLocalFavorites, getLocalBasket } from "../handlers/fetches";

const Logout = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        const token = localStorage.getItem('token');

        if(token) {
            localStorage.setItem('token', "")
            getLocalBasket(dispatch)
            getLocalFavorites(dispatch)
            dispatch({
                type: USER_LOGOUT,
            })
        } 
        return;
    }

    return (
        <button 
            onClick={handleClick}
            className="user__logout-btn"
        >
            Wyloguj się
        </button>
    )
}



export default Logout