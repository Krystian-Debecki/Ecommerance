import { Link } from 'react-router-dom'

import '../styles/LayoutsStyles/Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <ul className="footer__link-list">
 
                    <Link to="/contact">
                        <li className="footer__link">
                            Kontakt
                        </li>
                    </Link>

                    <Link to="/returns">
                        <li className="footer__link">
                            Zwroty
                        </li>
                    </Link>

                    <Link to="/private-policy">
                        <li className="footer__link">
                            Polityka prywatności
                        </li>
                    </Link>

                    <Link to="/about">
                        <li className="footer__link">
                            O nas
                        </li>
                    </Link>

                    <Link to="/statue">
                        <li className="footer__link">
                            Regulamin
                        </li>
                    </Link>

                    <Link to="/payment-delivery">
                        <li className="footer__link">
                            Płatności i dostawy
                        </li>
                    </Link>

                </ul>

                <div className="footer__info">
                    <h4>Znajdziesz nas na</h4>
                    <p className="footer__socjal">
                        <span> Facebook </span>
                        <span> Instagram </span>
                        
                       
                    </p>
                    <p>COPYRIGHT</p>
                    Image by 
                        <a href="https://pixabay.com/users/andrew-art-2005827/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1878945">
                            Ondřej Šponiar</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1878945">Pixabay</a>
                </div>
            </div>

        </footer>
    )
}

export default Footer