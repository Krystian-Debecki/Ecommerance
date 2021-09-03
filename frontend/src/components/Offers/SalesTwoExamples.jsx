import Offer from "./OffersRowItem"
import '../../styles/ComponentsStyles/Offers/SalesTwoExamples.css'

const SalesTwoExamples = ({saleSrc,offer1,offer2}) =>{
    return (
        <div className="sales-two-examples">
            <div className="sales-two-examples__img-wrap">
                <img 
                    src={saleSrc}
                    alt="ALT"
                    className="sales-two-examples__img"
                />
            </div>
            <Offer />
            <Offer />
        </div>
    )
}

export default SalesTwoExamples