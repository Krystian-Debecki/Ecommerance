import UserFavsItem from "./UserFavsItem";
import { useFavorites } from "../provider/appProvider";


const UserFavs = () => {
    const favs = useFavorites()
    const showFavs = favs.map(item =>         
    <UserFavsItem 
        img={'/img/Products_placeholders/ph3.jpg'} 
        isfav={true} 
        key={item.id}
        id={item.id}
        img={item.img}
        price={item.price}
        left={item.left}
        name={item.name}
    />)
    
    return (
        <div>
            {showFavs}
        </div>
    )
}

export default UserFavs