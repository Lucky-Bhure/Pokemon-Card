import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'

const Pokemon = () => {

    const [inputValue, setInputValue] = useState("");

    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(false);

    const API = "https://pokeapi.co/api/v2/pokemon?limit=225";


    const fetchData = async () => {
        try {
            const res = await fetch(API)
            const data = await res.json();
            setPokemonData(data)
            setLoading(false)
        }
        catch (err) {
            console.log(err);
            setErrorMsg(true)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    if (loading) {
        return (
            <div>
                <span class="loader"></span>
            </div>
        )
    }

    if (errorMsg) {
        return (
            <div className='error'>
                <h1>{errorMsg.message}</h1>
            </div>
        )
    }

    const handleInput = (event) => {
        setInputValue(event.target.value)
    }

    return (
        <div className='container'>
            <h1 className='heading'>Pokemon Card</h1>
            <input type="text" value={inputValue} onChange={handleInput} />
            <div className='card-container'>
                {
                    inputValue !== "" &&
                    pokemonData.results.filter((currEle) => currEle.name.startsWith(inputValue.toLowerCase())).map((currEle, index) => {
                        return <li key={currEle.name}><PokemonCard
                            URL={currEle.url} /></li>
                    })
                }
                {
                    inputValue === "" &&
                    pokemonData.results.map((currEle, index) => {
                        return <li key={currEle.name}><PokemonCard
                            URL={currEle.url} /></li>
                    })
                }
            </div>
        </div>
    )
}

export default Pokemon
