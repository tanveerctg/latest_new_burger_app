const prices={
  'Salad':5,
  'Meat':50,
  'Cheese':40,
  'Chicken':30
 }
const initialState={
      ingredients:{
        'Salad':0,
        'Meat':0,
        'Cheese':0,
        'Chicken':0 
      },
      totalPrice:10,
      orders:[]
  }



const burgerReducer=(state=initialState,action)=>{
  switch(action.type){
    case 'ADD_ITEM':{
      return{
        ...state,
        ingredients:{
          ...state.ingredients,
          [action.itemName]:state.ingredients[action.itemName] +1
        },
        totalPrice:state.totalPrice+prices[action.itemName],
        orders:state.orders
      }
    }
    case 'REMOVE_ITEM':{
      return{
        ...state,
        ingredients:{
          ...state.ingredients,
          [action.itemName]:state.ingredients[action.itemName]!==0?state.ingredients[action.itemName] -1:false
        },
        totalPrice:state.totalPrice-prices[action.itemName],
        orders:state.orders
      }
    }
    case 'INITIAL_STATE':{
      return{
        ...state,
        ingredients:initialState.ingredients,
        totalPrice:initialState.totalPrice,
        orders:state.orders
      }
    }
    case 'GET_ALL_ORDERS':{
      return{
        ...state,
        ...initialState,
        orders:action.items
      }
    }
    case 'CANCEL_ORDER':{
      return{
        ...state,
        orders:state.orders.filter(item=>item.id!==action.id)
      }

    }
 
    default:return state;

  }
}

export default burgerReducer;