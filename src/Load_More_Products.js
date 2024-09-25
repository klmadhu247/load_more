import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function LoadMoreProducts(){

    const [products,setProducts] = useState([])
    const [count,setCount] = useState(0);
    const [flag,setFlag] = useState(false);

    const fetchProduct =async()=> {
        const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`)

        const data = await response.json();
        setProducts((prevdata) => [...prevdata, ...data.products]);

        console.log(data)
        
    }

    useEffect(()=>{
        fetchProduct()

    },[count]);

    useEffect(()=>
    { if(products.length===100){
        setFlag(true)
    }

    },[products])



    return(
        <div className="container mt-4">
            <div className="row">
            {products.map((item)=>
            <div key={item.id} className="col-md-3 mb-4">
                <div className="card h-100">
                    <img src={item.thumbnail} className="card-img-top"/>
                <p style={{textAlign:"center"}} >{item.title}</p>
                </div>
                </div>)}
               

             </div>
             <button disabled={flag} className="btn btn-warning mx-auto d-block" onClick={()=>setCount(count+1)}>Load More Items</button>

             {flag && <p className="text-danger fw-100 text-center mt-3" style={{ fontSize: '18px' }}>No More Products to load</p>}

             

        </div>
    )
}
export default LoadMoreProducts;