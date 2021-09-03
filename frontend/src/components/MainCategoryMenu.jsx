import { Link } from "react-router-dom"

import { useParams } from "react-router"

const MainCategoryMenu = () => {
    const {category} = useParams()
    return (
        <aside className="main-category-menu">
            <ul>

            <li className={`main-category-menu__item ${'black-font'}`}>
                    <Link to="/">
                        Strona główna
                        {category === undefined 
                        ? <div className="link--active black-color"></div> 
                        : ""}
                    </Link>
                </li>

                <li className={`main-category-menu__item ${category === 'Computers' && 'red-font'}`}>
                    <Link to="/products/Computers">
                        Komputery
                        {category === 'Computers' 
                        ? <div className="link--active red-color"></div> 
                        : ""}
                    </Link>
                </li>

                <li className={`main-category-menu__item ${category === 'Clothes' && 'orange-font'}`}>
                    <Link to="/products/Clothes">
                        Odzież
                        {category === 'Clothes' 
                        ? <div className="link--active orange-color"></div> 
                        : ""}
                    </Link>
                </li>

                <li className={`main-category-menu__item ${category === 'Garden' && 'green-font'}`}>
                    <Link to="/products/Garden">
                        Dom i ogród
                        {category === 'Garden' 
                        ? <div className="link--active green-color"></div> 
                        : ""}
                    </Link>
                </li>

                <li className={`main-category-menu__item ${category === 'Food' && 'blue-font'}`}>
                    <Link to="/products/Food">
                        Spożywcze
                        {category === 'Food' 
                        ? <div className="link--active blue-color"></div> 
                        : ""}
                    </Link>
                </li>

                <li className={`main-category-menu__item ${category === 'Motorcycles' && 'purple-font'}`}>
                    <Link to="/products/Motorcycles">
                        Motoryzacja
                        {category === 'Motorcycles' 
                        ? <div className="link--active purple-color"></div> 
                        : ""}
                    </Link>
                </li>

                <li className={`main-category-menu__item ${category === 'Exclusive' && 'brown-font'}`}>
                    <Link to="/products/Exclusive">
                        Zegarki
                        {category === 'Exclusive' 
                        ? <div className="link--active brown-color"></div> 
                        : ""}
                    </Link>
                </li>

                <li className={`main-category-menu__item ${category === 'Consoles' && 'yellow-font'}`}>
                    <Link to="/products/Consoles">
                        Gry i konsole
                        {category === 'Consoles' 
                        ? <div className="link--active yellow-color"></div> 
                        : ""}
                    </Link>
                </li>

            </ul>
        </aside>
    )
}

export default MainCategoryMenu
