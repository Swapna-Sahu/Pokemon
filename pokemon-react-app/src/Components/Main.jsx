import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";

const Main = () => {
    const [pokeData,setPokeData]=useState([]);
    const [loading,setLoading]=useState(true);
    const url="https://pokeapi.co/api/v2/pokemon";
    const [pokeDex,setPokeDex]=useState();

    {/* fetching inital data */}
    const pokeFun=async()=>{
        setLoading(true)
        const res=await axios.get(url+"?limit=50");
        getPokemon(res.data.results)
        setLoading(false)
    }
    {/* Getting details for each pokemon */}
    const getPokemon=async(res)=>{
        console.log("inital res",res);
        let a=[];

       res.map(async(item)=>{
          const result=await axios.get(item.url)
          a.push(result.data);
          setPokeData(a);
              a.sort((c,b)=>c.id>b.id?1:-1);
          })
          setPokeData(a);
    }
    useEffect(()=>{   
        pokeFun();
    },[])
    return (
        <>
        <h1 className="title">Welcome to Pokemon</h1>
        <div className="container">
            {/* Left side pokemon list */}
            <div className="left-content">
            <Card pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
            </div>
            {/* Right side pokemon detail */}
            <div className="right-content">
            <Pokeinfo data={pokeDex}/>
            </div>
        </div>
        </>
    )
}
export default Main;