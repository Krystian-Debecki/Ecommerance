import '../styles/ComponentsStyles/BurgerMenu.css'

import { Link } from 'react-router-dom'

const BurgerMenu = ({user}) => {
    return (
        <ul className="burger">

            <li className="burger__item">
                <Link to="/favorites">
                    Ulubione
                </Link>
            </li>

            <li className="burger__item">
                <Link to="/basket">
                    Koszyk
                </Link>
            </li>

            <li className={`burger__item ${user && 'nav__user-logged'} `}> 
                    <Link to="/user">
                        {user || 'Zaloguj się'}
                    </Link>
                </li>

            <li className="burger__item">
                    <Link to="/">
                        Strona główna
                    </Link>
                </li>

                <li className="burger__item">
                    <Link to="/products/Computers">
                        Komputery
                    </Link>
                </li>

                <li className="burger__item">
                    <Link to="/products/Clothes">
                        Odzież
                    </Link>
                </li>

                <li className="burger__item">
                    <Link to="/products/Garden">
                        Dom i ogród
                    </Link>
                </li>

                <li className="burger__item">
                    <Link to="/products/Food">
                        Spożywcze
                    </Link>
                </li>

                <li className="burger__item">
                    <Link to="/products/Motorcycles">
                        Motoryzacja                      
                    </Link>
                </li>

                <li className="burger__item">
                    <Link to="/products/Exclusive">
                        Zegarki
      
                    </Link>
                </li>

                <li className="burger__item">
                    <Link to="/products/Consoles">
                        Gry i konsole
                    </Link>
                </li>
        </ul>
    )
}

export default BurgerMenu