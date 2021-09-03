import BasketItem from "./BasketItem"

import { useBasket } from "../provider/appProvider"

const UserBasket = () => {
    const basket = useBasket();

    const list = basket.map(item => <BasketItem 
        id={item.id}
        key={item.id}
        img={item.img}
        price={item.price}
        name={item.name}
        left={item.left}
        inBasket={item.inBasket}
    />)
    return (
        <div className="user__basket-list">
            {list}
        </div>
    )
}

export default UserBasket