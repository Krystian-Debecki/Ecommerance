import { Link } from "react-router-dom"

const SearchItem = ({img,name,id,focus}) => {


    return (
        <li 
            key={id}
            className="search-item"
        >
            <Link to={`/item/${id}`}>
                <img src={img}  className="search-item__img"/>
                <h3 className="search-item__name">{name}</h3>
            </Link>
        </li>
    )
}

export default SearchItem