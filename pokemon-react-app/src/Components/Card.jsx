import React from "react";
const Card = ({ pokemon, loading,infoPokemon}) => {
    return (
        <>
        {
            loading ? <h1>Loading...</h1> :
                pokemon.map((item) => {
                    return (
                        <>
                            <div className="card" key={item.id} onClick={()=>infoPokemon(item)}>
                            <h3>Id: {item.id}</h3>
                                <img src={item.sprites.front_default} alt={item.name} width={200} height={200}/>
                                <h2>{item.name}</h2>
                                <p>Height: {item.height}</p>
                                <p>Weight: {item.weight}</p>
                            </div>
                        </>
                    )
                })
        }

        </>
    )
}
export default Card;