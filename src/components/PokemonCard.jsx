import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const PokemonCard = ({URL}) => {

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(URL)
      const data = await res.json();
      setPokemon(data)
      setLoading(false)
      console.log(data)
    }
    catch (err) {
      console.log(err);
      setErrorMsg(true)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const stringUpper = (str) => {
    return str.charAt(0).toUpperCase()+str.slice(1);
  }


  if (loading) {
    return (
      <div className='card justify'>
        <span class="loader"></span>
      </div>
    )
  }

  if (errorMsg) {
    return (
      <div className='card'>
        <h1>{errorMsg.message}</h1>
      </div>
    )
  }

  return (
    <div className='card'>
      <div className='img-container'>
        <img src={pokemon.sprites.other.dream_world.front_default} alt="image" />
      </div>
      <div className='info-main-container'>
        <p><span>{stringUpper(pokemon.name)}</span></p>
        <p className='type'>
          {
            pokemon.types.map((ele) => stringUpper(ele.type.name)).join(", ")
          }
        </p>
        <div className='info-container'>
          <div>
            <p>Height</p>
            <span>{pokemon.height}</span>
          </div>
          <div>
            <p>Weight</p>
            <span>{pokemon.weight}</span>
          </div>
          <div>
            <p>Speed</p>
            <span>{pokemon.stats[5].base_stat}</span>
          </div>
        </div>
        <div className='info-container'>
          <div>
            <p>Experience</p>
            <span>{pokemon.height}</span>
          </div>
          <div>
            <p>Attack</p>
            <span>{pokemon.stats[1].base_stat}</span>
          </div>
          <div>
            <p>Abilities</p>
            <span>{pokemon.abilities.map((ele) => ele.ability.name).splice(0,1)}</span>
          </div>
        </div>
      </div>
      <p></p>
    </div>
  )
}

export default PokemonCard
