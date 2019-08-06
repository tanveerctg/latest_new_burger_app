
  export default  (data,{search=null,price=null,sortedBy=null,types=null}) =>{
    let hold;

    hold=data.filter(item=>{
      let searchResult=search?item.name.toUpperCase().includes(search.toUpperCase()):true;
      let filterByPrice=price?item.price<=price:true;
      let filterByType=types?item.type.toUpperCase().includes(types.toUpperCase()):true;
      if(types==='all'){
        filterByType=true;
      }
      if(searchResult && filterByPrice && filterByType){
        return item;
      }    
    })

    if(sortedBy==='price'){
        hold.sort((first,second)=>first.price<second.price?1:-1)
    }
    if(sortedBy==='calories'){
      hold.sort((first,second)=>first.calories<second.calories?1:-1)
    }
    return hold;
  }