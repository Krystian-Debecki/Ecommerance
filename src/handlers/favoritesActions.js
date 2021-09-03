

export const initialIsInFavState = (favs,id) => {
    if(favs.length>0)
        for(let i=0; i<favs.length;i++)
            if(favs[i].id === id)
                return true;

    return false;
}

