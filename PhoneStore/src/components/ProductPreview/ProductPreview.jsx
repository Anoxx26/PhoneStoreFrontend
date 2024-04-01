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
      

    return (
        <div className="product-div">
            <img src="https://xiaomi-sib.ru/media/cache/thumb_540_600/media/product_variant_image/587//d0da948e3a4c3fa451ed8a9516a3f3cc3f114d14.jpg"/>
            <p>Цена: {phone.price}</p>
            <p>{phone.brand} {phone.model}</p>
            <button onClick={addToCart}>Добавить</button>
        </div>
    )
}