import '../styles/ComponentsStyles/Search.css'

import { useState, useEffect } from 'react'
import { Server } from '../config'

import { useHistory } from 'react-router'

import SearchItem from './SearchItem'
import SearchIcon from './SearchIcons'

const Search = () =>{
    const [value,setValue] = useState()
    const [propositions,setPropositions] = useState([])
    let history = useHistory()
    
    const handleChange = e => {
        setValue(e.target.value)
        if(!value) setPropositions([])
    }

    useEffect(() => {
        const fetchData = async () => {
            if(!value) return;
            const response = await fetch(`${Server}/api/products/get?name=${value}&&limit=4`);
            const data = await response.json();

            setPropositions(data.docs)
            console.log(data)
        }

        fetchData()
    },[value])

    const handleClick = () => history.push(`/search/${value}`)

    const showPropositions = propositions.map(item => 
        <SearchItem 
            id={item._id}
            img={item.img}
            name={item.name}
        />)

    return (
        <div className="header-search">
                
                <input 
                    type="text" 
                    className="input-text header-search__input"
                    placeholder="Szukaj"
                    value={value || ""}
                    onChange={handleChange}

                />
                <ul className='header-search__propositions'>
                    {propositions && showPropositions}
                </ul>
                <button
                    className="header-search__btn"
                    onClick={handleClick}
                >
                    <SearchIcon />
                </button>

                
        </div>
    )
}

export default Search