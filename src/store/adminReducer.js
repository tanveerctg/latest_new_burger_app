const initialState = {
  allBurgers: [],
  price: {},
  itemsInTheCart: {},
  totalItemsInTheCart: 0,
  addedToCartItmsInfo: [],
  orderType: "",
  customizedOrder: false,
  normalOrder: false
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BURGERS_FROM_ADMIN": {
      return {
        ...state,
        allBurgers: [...action.allBurgers],
        price: action.prices
      };
    }
    case "ADD ITEM TO CART": {
      let numberOfItems;

      if (state.itemsInTheCart[action.name]) {
        numberOfItems = Number(state.itemsInTheCart[action.name]) + 1;
      } else {
        numberOfItems = 1;
      }
      const itemsInTheCart = {
        ...state.itemsInTheCart,
        [action.name]: numberOfItems
      };
      let totalItems = 0;
      for (let itm in itemsInTheCart) {
        totalItems = totalItems + itemsInTheCart[itm];
      }

      return {
        ...state,
        itemsInTheCart: itemsInTheCart,
        totalItemsInTheCart: totalItems
      };
    }
    case "ADD QUANTITY TO CART": {
      let numberOfItems;
      if (state.itemsInTheCart[action.name]) {
        numberOfItems =
          state.itemsInTheCart[action.name] + Number(action.quantity);
      } else {
        numberOfItems = action.quantity;
      }
      const itemsInTheCart = {
        ...state.itemsInTheCart,
        [action.name]: numberOfItems
      };
      let totalItems = 0;
      for (let itm in itemsInTheCart) {
        totalItems = totalItems + itemsInTheCart[itm];
      }
      return {
        ...state,
        itemsInTheCart: itemsInTheCart,
        totalItemsInTheCart: totalItems
      };
    }
    case "REMOVE ITEM FROM CART": {
      let numberOfItems;

      if (state.itemsInTheCart[action.name]) {
        numberOfItems = state.itemsInTheCart[action.name] - 1;
      }
      const itemsInTheCart = {
        ...state.itemsInTheCart,
        [action.name]: numberOfItems > 0 ? numberOfItems : 0
      };
      let totalItems = 0;
      for (let itm in itemsInTheCart) {
        totalItems = totalItems + itemsInTheCart[itm];
      }
      return {
        ...state,
        itemsInTheCart: itemsInTheCart,
        totalItemsInTheCart: totalItems ? totalItems : 0
      };
    }
    case "ADDED TO CART ITEMS INFO": {
      let items = [];
      for (let itm in state.itemsInTheCart) {
        items.push({
          name: itm,
          quantity: state.itemsInTheCart[itm],
          price: Number(state.price[itm]) * state.itemsInTheCart[itm]
        });
      }
      return {
        ...state,
        addedToCartItmsInfo: items
      };
    }
    case "DELETE ITEM FROM CART": {
      let numberOfItems;
      numberOfItems = state.itemsInTheCart[action.name] * 0;

      const itemsInTheCart = {
        ...state.itemsInTheCart,
        [action.name]: numberOfItems > 0 ? numberOfItems : 0
      };
      let totalItems = 0;
      for (let itm in itemsInTheCart) {
        totalItems = totalItems + itemsInTheCart[itm];
      }
      return {
        ...state,
        addedToCartItmsInfo: state.addedToCartItmsInfo.filter(
          itm => itm.name !== action.name
        ),
        itemsInTheCart: {
          ...state.itemsInTheCart,
          [action.name]: numberOfItems
        },
        totalItemsInTheCart: totalItems ? totalItems : 0
      };
    }
    case "CUSTOMIZED ORDER": {
      return {
        ...state,
        orderType: action.value
      };
    }
    case "ORDER FROM CUSTOMIZED SECTION": {
      return {
        ...state,
        customizedOrder: action.value
      };
    }
    case "NORMAL ORDER": {
      return {
        ...state,
        normalOrder: action.value
      };
    }
    case "SET INITIAL ADMIN STATE": {
      console.log("admin");
      return {
        ...state,
        price: {},
        itemsInTheCart: {},
        totalItemsInTheCart: 0,
        addedToCartItmsInfo: [],
        orderType: "",
        customizedOrder: false,
        normalOrder: false
      };
    }
    case "SET AFTER ORDER": {
      return {
        ...state,
        itemsInTheCart: {},
        totalItemsInTheCart: 0,
        addedToCartItmsInfo: [],
        orderType: "",
        customizedOrder: false,
        normalOrder: false
      };
    }

    default:
      return state;
  }
};
export default adminReducer;
