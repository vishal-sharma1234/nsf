import { configureStore  , createReducer  } from "@reduxjs/toolkit"

const initialState = {
  pQty : 1,
  cartLength : Number(localStorage.getItem("cartLength"))
};

const reducer = createReducer(initialState , {
  pClick : (state)=>{
    state.pQty = 1
  },

  increment : (state)=>{
    state.pQty +=1;
  },
  decrement : (state)=>{
    state.pQty -=1;
  },
  addToCart : (state)=>{
    state.cartLength += 1;
    localStorage.setItem("cartLength" , state.cartLength)
  },
  cartLengthDecrease : (state)=>{
      state.cartLength-=1;
      localStorage.setItem("cartLength" , state.cartLength)
  }

})

export const store = configureStore({ 
	reducer: {
    custom : reducer
  }, 
})


