import MainCategoryMenu from '../components/MainCategoryMenu'
import OffersRow from '../components/Offers/OffersRow'

import { useEffect,useState } from 'react'
import { useParams } from 'react-router'
import { Server } from '../config'

import '../styles/LayoutsStyles/ProductsList.css'

const ProductsList = () => {
    const { category } = useParams();
    const { sale } = useParams()
    const { search} = useParams()
    const [ products, setProducts ] = useState()

    useEffect(() => {
        async function fetchData(){
            let data = []
            if(category){
                const response = await fetch(`${Server}/api/products/get?category=${category}`);
                data = await response.json();
            } 
            if(sale){
                const response = await fetch(`${Server}/api/products/getSales/${sale}`);
                data = await response.json();
                console.log(data)
            }
            if(search){
                const response = await fetch(`${Server}/api/products/get?name=${search}`);
                data = await response.json();
                console.log(data)
            }
            

            setProducts(data)
        }

        try{
            fetchData()
        }catch(err){
            console.error(err)
        }
    
    },[category,search])
    
    return (
        <main className="main product-list">
            <MainCategoryMenu />

            <OffersRow 
                data={products ? products.docs: null}
            />
        </main>
    )
}

export default ProductsList