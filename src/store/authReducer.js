
let initialState={
  id:null,
  sign_In_With_Email:true,
  check_signup_link:false
};
const authReducer=(state=initialState,action)=>{
  switch(action.type){
    case 'SIGN_IN':{
      return{
        ...state,
        id:action.id
      }
    }
    case 'SIGN_OUT':{
      return {
        ...state,
        id:null
      }
    }
    case 'SIGN_UP_WITH_EMAIL':{
      return{
        ...state,
        sign_In_With_Email:false
      }
    }
    case 'SIGN_IN_WITH_EMAIL':{
      return{
        ...state,
        sign_In_With_Email:true
      }
    }
    case 'SIGNUP_LINK_FALSE':{
      return{
        ...state,
        check_signup_link:false
      }
    }
    case 'SIGNUP_LINK_TRUE':{
      return{
        ...state,
        check_signup_link:true
      }
    }
    default:return state;
}
}
export default authReducer;