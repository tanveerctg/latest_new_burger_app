const removeItem=(itemName)=>{
  return{
    type:'REMOVE_ITEM',
    itemName
  }
}
export default removeItem;