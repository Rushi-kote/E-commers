import React, { useState } from 'react';
import "./../Styles/CartItem.css";
import { useEffect, useContext} from 'react';
import UserContext from '../Context/UserContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CartItem = ({Item,index}) => {

  const [Qty,setQty] = useState(Item.quantity);
  const {user} = useContext(UserContext);

  const QtyUpdated=()=>{

  }

  useEffect(()=>{
    const Data = {
      userID:user.UserId,
      productID:Item._id,
      quantity:Qty,
      price:Item.price
    }
    axios.post("http://localhost:3001/cart/addItem",{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT fefege...'
      },
      Data
    }).then((res)=>{
      console.log("res==>Qty",res);
      toast.success('Item Qty updated ');
      }).catch((error)=>{
        console.log(error);
        toast.error('failed to update Item Qty');
      });
  },[Qty]);


  const handleClikInc = () =>{
    console.log("user",user);
    console.log("Before setQty call prev Qty==>",Qty);
    setQty(Qty+1);
    console.log("Before qtyUpdate call updated Qty==>",Qty);
    QtyUpdated();
  }

  return (
    <React.Fragment key={index}>
      <div className="imgContainer">
        <img className="ItemImg" src={Item.image} alt="Itemimg" />
      </div>
      <div className="itemTitile">{Item.title}</div>
      <h3 className="gridItem1">{Item.price}</h3>
      <div className="btnQty gridItem1">
        <button className="dec">-</button>
        <span className="ItemQty">{Qty}</span>
        <button className="inc" onClick={handleClikInc}>
          +
        </button>
      </div>
      <h3 className="gridItem1">{Item.price * Qty}</h3>

    </React.Fragment>
  );
}

export default CartItem