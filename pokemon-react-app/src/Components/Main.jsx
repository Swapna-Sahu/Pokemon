import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "./Pagination";

const Main=()=>{
    const [pokeData,setPokeData]=useState([]);
    const [loading,setLoading]=useState(true);
    const url="https://pokeapi.co/api/v2/pokemon"

    const [pokeDex,setPokeDex]=useState();
    const [sortName,setSortName]=useState(false);
    const [sortHeight,setSortHeight]=useState(false);
    const [sortWeight,setSortWeight]=useState(false);
    const [search,setSearch]=useState("");

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
        let a=[];

       res.map(async(item)=>{
          const result=await axios.get(item.url)
          a.push(result.data);
          setPokeData(a);
              a.sort((c,b)=>c.id>b.id?1:-1);
          })
          setPokeData(a);
    }  
    {/* Search function */}
    const searchByName=async(search)=>{
               try {
                   const res = await fetch(url+`/${search.toLowerCase()}`);
                   const data = await res.json();
                   setPokeDex(data);
                    } catch (e) {
                        console.log("err", e);
                        setPokeDex([]);
                    }
    };
    {/* Sorting function */}
    const sortingName = () =>{
        setSortName(true);
        setSortHeight(false);
        setSortWeight(false);
        pokeData.sort((c,b)=>c.name>b.name?1:-1)
        return pokeData
    }

    const sortingHeight = () =>{
        setSortHeight(true);
        setSortName(false);
        setSortWeight(false);
        pokeData.sort((c,b)=>c.height>b.height?1:-1)
        return pokeData
    }

    const sortingWeight = () =>{
        setSortHeight(false);
        setSortName(false);
        setSortWeight(true);
        pokeData.sort((c,b)=>c.weight>b.weight?1:-1)
        return pokeData
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
    return(
        <>
        <h1 className="title">Welcome to Pokemon</h1>
        <div className="features">
            {/* Sorting by Weight */}
            <button onClick={()=>sortingWeight()}>Sort By Weight</button>
            {/* Sorting by Height */}
            <button onClick={()=>sortingHeight()}>Sort By Height</button>
            {/* Sorting by Name */}
            <button onClick={()=>sortingName()}>Sort By Name</button>
            {/* Search */}
            <input
                type="text"
                placeholder="Search by Name or Id"
                aria-label="Search"
                onChange={(e) => {
                
                    e.preventDefault();
                    setSearch(e.target.value);
                
                }}        
            />
            <button onClick={()=>searchByName(search)}>Submit</button>
            {/*  Page Limit */}
            <select
                placeholder="Number of cards/page"
                id="select-id"
                onChange={(e) => setDataPerPage(e.target.value)}
            >
                <option value="10">10 cards/page</option>
                <option value="20">20 cards/page</option>
                <option value="50">50 cards/page</option>
            </select>
        </div>
        {/* Top pagination */}
        <div className="mt-4">
            <Pagination
                dataPerPage={dataPerPage}
                totalData={pokeData.length}
                paginate={paginate}
            />
        </div>
        {/* Page render */}
        <div className="container">
            {/* Left side pokemon list */}
            <div className="left-content">
                <Card pokemon={currentData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
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