import { ADD_TO_CART, REMOVE_FROM_CART } from './action-types';

const initialState = localStorage.getItem('cart')
  ? {
      cart: JSON.parse(localStorage.getItem('cart')),
    }
  : {
      cart: [],
    };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log(state.cart);
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
