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

    default:
      return state;
  }
}