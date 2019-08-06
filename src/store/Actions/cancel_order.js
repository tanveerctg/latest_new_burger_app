import {firebase} from '../../firebase/firebase';
const remove=(id)=>({
  type:'CANCEL_ORDER',
  id
})
const cancelOrder=(UID,id)=>{
  return dispatch=>{
    firebase.database().ref(`orders/${UID}/${id}`).remove().then(()=>{

      fetch(`https://admin-testing-burger-project.firebaseio.com/orders/${UID}.json`, {
        method: 'GET',
        mode: "cors"
      }).then(res=>{
        return res.json();
      }).then(info=>{
        let allOrdersId=Object.keys(info);
        let remainingItems={};
        allOrdersId.forEach(orderId=>{
          if(info[orderId].id===id){
            console.log('do nothing')
          }else{
            remainingItems[orderId]=info[orderId];
          }
        })
        console.log(remainingItems)
        fetch(`https://admin-testing-burger-project.firebaseio.com/orders/${UID}.json`, {
          method: 'PUT',
          mode: "cors",
          body:JSON.stringify(remainingItems)
        })
      })
      dispatch(remove(id))
    })
    console.log(UID,id)
  }
}
export default cancelOrder;