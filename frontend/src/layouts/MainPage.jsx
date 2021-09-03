import { useEffect, useState } from 'react'
import { Server } from '../config'

import '../styles/LayoutsStyles/MainPage.css'

import SalesImg from "../components/Offers/SalesImg"
import OffersRow from '../components/Offers/OffersRow'
import SalesTwoExamples from '../components/Offers/SalesTwoExamples'
import MainCategoryMenu from '../components/MainCategoryMenu'

import { useBasket } from '../provider/appProvider'
import { useDispatch } from 'react-redux'
import { LOADING,SUCCESS,FAILURE } from '../reducer/actions/basketActions'

import { getBasket, getFavorites, getLocalBasket, getLocalFavorites} from '../handlers/fetches'


const MainPage = () => {
    const [products,setProducts] = useState()
    const [propositions,setPropositions] = useState()

    const dispatch = useDispatch()

    const getSaleData = async () => {
        try{
            const response = await fetch(`${Server}/api/products/`);
            const data = await response.json();

            setProducts(data)
        } catch (err) {
            console.error(err)
        }
    }

    const getPropositions = async () => {
        try{
            const response = await fetch(`${Server}/api/products/get?name=smart`);
            const data = await response.json();

            setPropositions(data)
        } catch(err){
            console.error(err)
        }
    }

    useEffect( () => {
        getSaleData()
        getPropositions()
        if(localStorage.getItem('token')){
            getFavorites(dispatch)
            getBasket(dispatch)
        } else {
            getLocalBasket(dispatch)
            getLocalFavorites(dispatch)
        }
            
    },[])

    return (
        <main className="main__home-page-wrap">
            <div className="main">

                <MainCategoryMenu />

                <SalesImg
                    src={'/img/Specjal_offer.png'}
                />

                <OffersRow 
                    data={products ? products.docs: null}
                    header={true}
                />

                <OffersRow 
                    data={propositions ? propositions.docs : null}
                />

            </div>
        </main>
    )
}

export default MainPage