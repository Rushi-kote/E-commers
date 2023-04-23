import React, { useEffect, useState } from 'react';
import Card from '../pages/Card';
import axios from 'axios';

const ViewSimiliar = ({category,Id}) => {
    const [ItemCat,setItemCat] =useState(category);
    const [Items,setItems] = useState([]);
    
    useEffect(()=>{
        setItemCat(category);
        console.log("category",category);
        console.log("ItemCat!==undefined",ItemCat!==undefined);
        if(ItemCat!==undefined){
            axios.get(`http://localhost:3001/${ItemCat}`)
            .then((response) => {
                console.log("response ", response);
                setItems(response.data.allData);
              })
              .catch((err) => {
                console.log(err);
              });
        }else{
            axios.get(`http://localhost:3001/fasion`)
            .then((response) => {
                console.log("response ", response);
                setItems(response.data.allData);
              })
              .catch((err) => {
                console.log(err);
              });
        }
    },[]);

    return (
        <div> 
            <h4>You might be interested in</h4>
            <div className="flex-containerLoadMore">
            {
                Items.map((product,index)=><Card card={product} key={index}/>)
            }
            </div>
        </div>
    )
}

export default ViewSimiliar