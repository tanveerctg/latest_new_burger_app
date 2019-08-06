
const initialState={
  search:null,
  price:null,
  sortedBy:null,
  types:'',
  burgerTypeName:'All Burgers'
}

const filters=(state=initialState,action)=>{
switch(action.type){
  case 'FILTER_SEARCH':{
    return{
      ...state,
      search:action.name
    }
  }
  case 'FILTER_BY_PRICE':{
    return{
      ...state,
      price:action.price
    }
  }
  case 'SORTED_BY':{
    return{
      ...state,
      sortedBy:action.name
    }
  }
  case 'FILTER_BY_TYPES':{
    return{
      ...state,
      types:action.name
    }
  }
  case 'BURGER_TYPE_NAME':{
    return{
      ...state,
      burgerTypeName:action.name
    }
  }
  case 'INITIAL_STATE':{
    return{
      search:null,
      price:null,
      sortedBy:null,
      types:'',
      burgerTypeName:'All Burgers'
    }
  }

  default:return state;

}
}

export default filters;