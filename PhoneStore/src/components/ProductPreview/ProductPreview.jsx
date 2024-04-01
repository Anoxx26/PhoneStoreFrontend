import "./ProductPreview.css"
import { useCart } from '../CartContext';

export default function ProductPreview({phone}){
    
    const { cartState , dispatch } = useCart();

    const addToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: phone });
        if (cartState.items.length > 0) {
            console.log(cartState.items[0].quantity);
        }
      };
      

      console.log(phone)
    return (
        
        <div className="product-div">
             {phone.imagePath ? <img src={phone.imagePath} /> : <img src="https://placeholder.com/150" />}
             
             <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", width: "100%"}}>
                <p>{phone.brand} {phone.model}</p>
                <p style={{color: "black", fontWeight: "800"}}>{phone.price} ₽</p>
                <button onClick={addToCart}>+</button>
             </div>
           
            
        </div>
    )
}