import '../styles/LayoutsStyles/Basket.css'

import BasketItem from '../components/BasketItem'

import { useBasket } from '../provider/appProvider'
import { Link } from 'react-router-dom'

const Basket = () => {
    const basket = useBasket()
    console.log(basket)
    let fullPrice = 0;

    const ProductsList = basket.map((element, i) => {
        const {id,price,img,name,left,inBasket} = element;
        fullPrice += (price * inBasket);

        return (
            <BasketItem
                id={id}
                key={id}
                img={img}
                price={price}
                name={name}
                left={left}
                inBasket={inBasket}
            />
        )
    })


    return (
        <main className="main basket">
            <ul className="basket__product-list">
                {ProductsList}
            </ul>
            <div className="basket__tools">
                <h5>Do zapłaty:</h5>
                <h2 className="basket__full-price">{ parseFloat(fullPrice).toFixed(2) } PLN</h2>
                <Link to="/delivery-info">
                    <button className="offer-row__button">Przejdz do kasy</button>
                </Link>
            </div>
        </main>
    )
}

export default Basket