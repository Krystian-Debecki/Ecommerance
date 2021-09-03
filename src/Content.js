import { Switch,Route } from 'react-router-dom'

import MainPage from './layouts/MainPage'
import ProductPage from './layouts/ProductPage'
import Error from './layouts/Error'
import Basket from './layouts/Basket'
import Favorites from './layouts/Favorites'
import User from './layouts/User'
import ProductsList from './layouts/ProductsList'
import DeliveryInfoPage from './layouts/DeliveryInfoPage'

import Contact from './layouts/Contact'
import Returns from './layouts/Returns'
import PrivatePolicy from './layouts/PrivatePolicy'
import About from './layouts/About'
import PaymentDelivery from './layouts/PaymentsDelivery'
import Statue from './layouts/Statue'
import UserRegisterPage from './layouts/UserRegitserPage'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getBasket, getFavorites, getLocalBasket,getLocalFavorites } from './handlers/fetches'

import './styles/App.css'

const Content = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        if(localStorage.getItem('token')){
            console.log('dsad')
            getBasket(dispatch)
            getFavorites(dispatch)
        } else {
            getLocalBasket(dispatch)
            getLocalFavorites(dispatch)
        }

    },[])
    
    return (
        <div className="content">
            <Switch>
                
                <Route
                    path="/" 
                    exact
                    component={MainPage} 
                />

                <Route 
                    path="/basket"
                    component={Basket}
                />

                <Route
                    path="/favorites"
                    component={Favorites}
                />

                <Route
                    path="/user"
                    component={User}
                />

                <Route
                    path="/sale/:sale"
                    component={ProductsList}
                />

                <Route
                    path="/search/:search"
                    component={ProductsList}
                />

                <Route
                    path="/products/:category"
                    component={ProductsList}
                />

                <Route 
                    path="/item/:id"
                    component={ProductPage}
                />

                 <Route
                    path="/contact"
                    component={Contact}
                />

                <Route
                    path="/returns"
                    component={Returns}
                />

                <Route
                    path="/private-policy"
                    component={PrivatePolicy}
                />

                <Route
                    path="/payment-delivery"
                    component={PaymentDelivery}
                />

                <Route
                    path="/about"
                    component={About}
                />

                <Route
                    path="/statue"
                    component={Statue}
                />

                <Route
                    path="/register"
                    component={UserRegisterPage}
                />

                <Route
                    path="/delivery-info"
                    component={DeliveryInfoPage}
                />

                <Route 
                    component={Error}
                />

            </Switch>
        </div>
    )
}


export default Content