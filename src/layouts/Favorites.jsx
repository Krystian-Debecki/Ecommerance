import Offer from '../components/Offers/OffersRowItem'

import { useFavorites } from '../provider/appProvider'

const Favorites = () => {
    console.log(localStorage.getItem('token'))
    const favs = useFavorites()
    console.log(favs)

    const showFavs = favs.map(item => 
        <Offer 
            img={'/img/Products_placeholders/ph3.jpg'} 
            isfav={true} 
            key={item.id}
            id={item.id}
            img={item.img}
            price={item.price}
            left={item.left}
        />  
    )

    return (

        <main className="main">
            {
                favs.length
                ? showFavs 
                : "Nie dodano żadnego ulubionego produktu"
            }

        </main>

    )
}

export default Favorites