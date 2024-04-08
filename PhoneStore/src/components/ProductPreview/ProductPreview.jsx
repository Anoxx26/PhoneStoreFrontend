import "./ProductPreview.css"
import { useCart } from '../CartContext';
import { useNavigate } from "react-router-dom";

export default function ProductPreview({phone}){
    
    const { cartState , dispatch } = useCart();

    const navigate = useNavigate();

    const addToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: phone });
        if (cartState.items.length > 0) {
            console.log(cartState.items[0].quantity);
        }
      };
      
    console.log(phone.phoneID)
    const handleDivClick = () => {
        navigate("catalog/" + phone.phoneID)
    }

      console.log(phone)
    return (
        
        <div onClick={handleDivClick} className="product-div">
             {phone.imagePath ? <img src={phone.imagePath} /> : <img src="https://placeholder.com/150" />}
             
             <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", width: "100%"}}>
                <p>{phone.brand} {phone.model}</p>
                <p style={{color: "black", fontWeight: "800"}}>{phone.price} ₽</p>
                <button onClick={(e) => {
                    e.stopPropagation();
                    addToCart();
                }}>+</button>
            </div>
           
            
        </div>
    )
}