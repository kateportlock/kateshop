import React, { useState } from 'react';

const CartContext = React.createContext([{}, () => { }]);

const CartProvider = (props) => {

  const cartHistory = localStorage.getItem('cartHistory');

  const [state, setState] = useState(cartHistory === null ? [] : JSON.parse(cartHistory));

  return (
    <CartContext.Provider value={[state, setState]}>
      {props.children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };