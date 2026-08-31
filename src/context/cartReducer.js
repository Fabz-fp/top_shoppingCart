export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return [
        ...state,
        {
          ...action.payload.product,
          quantity: action.payload.quantity,
        },
      ];

    default:
      return state;
  }
}