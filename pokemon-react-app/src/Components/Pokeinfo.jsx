import React from "react";

const Pokeinfo = ({ data }) => {
    return (
        <>
        {
            (!data) ? "" : (
                <>
                    <h1>{data.name}</h1>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt={data.name}  height={150}  width={150}/>
                    <div className="abilities">
                        {
                            data.abilities.map(poke=>{
                                return(
                                    <>
                                     <div className="group">
                                        <h2>{poke.ability.name}</h2>
                                    </div>
                                    </>
                                )
                            })
                        }
                    </div>

                    <div>
                    <h3>Height : {data.height}</h3>
                    <h3>Weight : {data.weight}</h3>
                    </div>

                    <div className="base-stat">
                        {
                            data.stats.map(poke=>{
                                return(
                                    <>
                                        <p>{poke.stat.name}:{poke.base_stat}</p>
                                    </>
                                )
                            })
                        }
                    </div>
                </>
            )
        }

        </>
    )
}
export default Pokeinfo