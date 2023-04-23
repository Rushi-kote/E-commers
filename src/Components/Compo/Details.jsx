import axios from "axios";
import React, { useEffect, useState, useContext} from "react";
import "./../Styles/LoadMorePage.css";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../Context/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([{ rating: { rate: 4 } }]);
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  // console.log(product.rating["rate"]);
  useEffect(() => {
    axios
      .post(`http://localhost:3001/products/${id}`)
      .then((res) => {
        // console.log(res.data);
        setProduct(...[], res.data.product);
        console.log("product", product);
      })
      .catch((err) => console.log(err));
  }, [id]);


  const addToCart =()=>{
    if(user.status){
      const Data = {
        userID:user.UserId,
        productID:id,
        quantity:1,
        price:product.price
      }
      axios.post("http://localhost:3001/cart/addItem",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT fefege...'
        },
        Data
      }).then((res)=>{
        // console.log("res==>",res);
        toast.success('Item Added to cart ');
      }).catch((error)=>{
          console.log(error);
          toast.error('failed to add in cart');
      });
    }else{
      navigate("/SignIn");
    }
  }

  return (
    <div>
      {product && (
        <div className="flex-items">
          <div className="image">
            <img className="img" src={`${product.image}`} alt="cards"></img>
          </div>
          <div className="addtoCartDiv">
            <button className="addtoCartButton" onClick={addToCart}>
              <span>Add to cart</span>
              <FontAwesomeIcon className="IconCart" icon="shopping-cart" />
            </button>
          </div>
          <div className="details">
            <h4>{product.title}</h4> <br />
            <p>{product.description}</p> <br />
            <div className="rating">
              {product.rating && <ReactStars {...{ size: 30, edit: false }} />}
            </div>{" "}
            <br />${product.price}
          </div>
        </div>
      )}
      <ToastContainer
                position="top-right"
                autoClose={4000}
                closeOnClick
                rtl={false}
                theme="light"
            />
    </div>
  );
};

export default Details;
