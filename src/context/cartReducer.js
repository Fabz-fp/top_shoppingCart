export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;

      const existingItem = state.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        return state.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      return [
        ...state,
        {
          ...product,
          quantity,
        },
      ];
    }

    case "INCREASE_ITEM":
      return state.map((item) => 
        item.id === action.payload
          ? {
            ...item,
            quantity: item.quantity + 1,
            }
          : item,
      );

    default:
      return state;
  }
}