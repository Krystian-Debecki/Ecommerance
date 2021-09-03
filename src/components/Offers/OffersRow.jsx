import '../../styles/ComponentsStyles/Offers/OffersRow.css'

import OffersRowItem from './OffersRowItem'

const OffersRow = ({ header = false, data}) => {

    let items;
    data 
    ? items = data.map((item,i) => 
    <OffersRowItem 
        id={item._id}
        name={item.name}
        left={item.left}
        price={item.price}
        img={item.img}
        key={item._id}
        sale={item.sale} 
    />) 
    : items = []

    return (
        <div className="offers-row">
            {
                header &&
                (<div className="offer-row__header">
                    <h1>Polecane oferty</h1>
                    <h5>Najgorętsze oferty w najlepszych cenach! Kupuj już teraz!</h5>
                </div>)
            }

        <div className="offers-row__wrap">
            {items}
        </div>

        </div>
    )
}

export default OffersRow