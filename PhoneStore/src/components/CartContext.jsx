import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  items: []
};

const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART': 
        const existingItemIndex = state.items.findIndex(item => item.phoneID === action.payload.phoneID);
        if (existingItemIndex !== -1) {
          const updatedItems = state.items.map((item, index) => {
            if (index === existingItemIndex) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
          return { ...state, items: updatedItems };
        }
        return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
        case 'REMOVE_FROM_CART':
            const itemIndexToRemove = state.items.findIndex(item => item.phoneID === action.payload.phoneID);
            if (itemIndexToRemove !== -1) {
              const updatedItems = state.items.map((item, index) => {
                if (index === itemIndexToRemove) {
                  if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                  }
                  return null;
                }
                return item;
              }).filter(item => item !== null);
              return { ...state, items: updatedItems };
            }
            return state;
        case 'CLEAR_CART':
            return { ...state, items: [] };
      default:
        return state;
    }
  };
  


export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
