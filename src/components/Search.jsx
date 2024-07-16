import { useContext, useState } from "react"
import "./Search.css"
import { products } from "./product";
import { Link, useNavigate } from "react-router-dom";
import { productContext } from "../context/ProductContext";

export default function Search() {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate()
    // const {products , setProducts} = useContext(productContext)

    const handleClick = ()=>{
        setSearchValue("")
    }
    return (
        <div className="mainSearch">
            <div className="input">
                <input type="text" value={searchValue} onChange={(e) => {
                    setSearchValue(e.target.value)
                }} placeholder="Search for medicine" onKeyUp={(e)=>{
                    if(searchValue  == "") return
                    if(e.key === "Enter" )
                        {
                            navigate(`/products/${searchValue}-search`)
                        }
                }}/>

              
            
            </div>
            {searchValue != "" && (
                <div className="searchResult">
                    {products.filter(a => a.name.toLowerCase().includes(searchValue.toLowerCase())).length > 0 ? (
                        <div className="numberOfResult">
                            {products.filter(a=> a.name.toLowerCase().includes(searchValue.toLowerCase())).map(item =>{
                                return (<Link to={`/products/${item.name.toLowerCase()}-search`} onClick={handleClick} key={item.id}>{item.name}</Link>)
                            })}

                        </div>
                    ):
                    (
                        <div className="noResultFound">
                            No result found
                        </div>
                    )}
                </div>
            )}

        </div>
    )
}