import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      // add to cart
      const newItem = action.payload;
      console.log(newItem)

      // 
      const existItem = state.cart.cartItems.find(
        (x) => x._id === newItem._id
      );

      // existItem es el newItem que ya existe en el cart, pero si no existe, existItem = undefined,
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
          // existItem === newItem , pero newItem tiene ajustado quantity (+ 1)
          item._id === existItem._id ? newItem : item
        )
        // si newItem no existe en el cartItems, se agrega el nuevo item
        : [...state.cart.cartItems, newItem];
      
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
