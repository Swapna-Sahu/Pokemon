import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
import Pagination from "./Pagination";

const Main = () => {
    const [pokeData,setPokeData]=useState([]);
    const [loading,setLoading]=useState(true);
    const url="https://pokeapi.co/api/v2/pokemon";
    const [pokeDex,setPokeDex]=useState();

    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(10);

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


    // Get current data used for pagination
    const indexOfLastPost = currentPage * dataPerPage;
    const indexOfFirstPost = indexOfLastPost - dataPerPage;
    const currentData = pokeData.slice(indexOfFirstPost, indexOfLastPost);

    // Change page in pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
        <h1 className="title">Welcome to Pokemon</h1>
        {/* Top pagination */}
        <div className="mt-4">
            <Pagination
                dataPerPage={dataPerPage}
                totalData={pokeData.length}
                paginate={paginate}
            />
        </div>
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
        {/* Down Pagination */}
        <div className="ms-4">
            <Pagination
                dataPerPage={dataPerPage}
                totalData={pokeData.length}
                paginate={paginate}
            />
        </div>
        </>
    )
}
export default Main;