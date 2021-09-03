
const UserFavsItem = ({ img, id = 1, name = 'PLACEHOLDER', left = 10, price = 200 }) => {

    return (
        <li className="basket-item user-favs-item">

            <img
                src={img}
                alt={name}
                className="basket-item__img"
            />

            <p className="basket-item__info">
                <span className="basket-item__product-name">{name}</span>
                <span className="basket-item__products-in-basket">W koszyku: 3</span>
                <span>Cena: {price} PLN</span>
            </p>
            <div>

            </div>


        </li>
    )
}

export default UserFavsItem