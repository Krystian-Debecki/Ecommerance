import '../../styles/ComponentsStyles/Offers/SalesImg.css'

import { Link } from 'react-router-dom'

const SalesImg = ({src,type}) => {
    
    return (
        <div className="sales-img__wrap">
            <Link to="/sale/swieta">
                <img 
                    className = { `fullImg ${type}`}
                    src={src}
                    alt={'SALES'}
                />
            </Link>
        </div>
    )
}

export default SalesImg