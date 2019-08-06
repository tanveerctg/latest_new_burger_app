import React, {Component} from 'react'
import classes from './Order.module.scss';
import moment from 'moment';
import cancelOrder from '../../../store/Actions/cancel_order';
import {connect} from 'react-redux';

class Order extends Component {
  state={
    item:[],
    customerInfo:[]
  }
  componentWillMount=()=>{
    let allItems=[];
    let allCustomers=[];
    if(this.props.items){
      for(let itm in this.props.items){
        allItems.push({[itm]:this.props.items[itm]})
      }
    }

    for(let itm in this.props.CustomerInfo){
      allCustomers.push({[itm]:this.props.CustomerInfo[itm]})
    }

    this.setState({item:allItems});
    this.setState({customerInfo:allCustomers})
    
  }
  render(){
    let height;
    this.props.cancelOrderTime>moment().valueOf()?height='18rem':height='inherit';
    let UID=this.props.UID;
    let id=this.props.id;  

    return(
      <li className={classes.li}>
        <div style={{position:'relative',height:`${height}`}}>
          {
            this.props.ingredients?
              <React.Fragment>
                {this.props.ingredients.Chicken? <h3>Chicken :{this.props.ingredients.Chicken} </h3>:null}
                {this.props.ingredients.Cheese? <h3>Cheese :{this.props.ingredients.Cheese}</h3>:null}
                {this.props.ingredients.Meat? <h3>Meat :{this.props.ingredients.Meat}</h3>:null}
                {this.props.ingredients.Salad? <h3>Salad :{this.props.ingredients.Salad}</h3>:null}
              </React.Fragment>
            :  <React.Fragment>
                  {this.state.item.map(itm=>{
                    for(let key in itm){
                      return <h3>{key} : {itm[key]}</h3>
                    }
                  })}
              </React.Fragment>
             
          }
          <h2 style={{color:'white'}}>Total Price: {this.props.totalPrice}</h2>
          {this.props.cancelOrderTime>moment().valueOf()?
          <div style={{position:'absolute',padding:'0px',marginTop:'2rem',color:'red',bottom:'.2rem'}}>
         
          <h3 style={{display:'inlineBlock',background:'none',color:'white',fontWeight:'400',padding:'4px 5px'}}>
          You can cancel your order before
          
           <span style={{fontWeight:700}}> {
                moment(this.props.cancelOrderTime)
                .format('LTS')
            }
            </span>
          </h3>
          <button className={classes.cancelBtn}
          onClick={()=>this.props.dispatch(cancelOrder(UID,id))}>Cancel Order</button>
          </div>
          :null
          }
        </div>
        <div>
              <React.Fragment>
                {this.state.customerInfo.map(itm=>{
                    for(let key in itm){
                      return <h3>{key} : {itm[key]}</h3>
                    }
                  })}
              </React.Fragment>
          <h3 style={{background:'white',padding:'5px',color:'black'}} className={classes.orderTime}>Order Time:{moment(this.props.orderTime).calendar()}</h3>
        </div>         
      </li>

)
  }
}
const mapStateToProps=state=>{
  return{
    UID:state.authReducer.id,
    orders:state.burgerReducer.orders
  }
}
export default connect(mapStateToProps)(Order);
// const Order=(props)=>{
  // function convertSecond(time){
  //   let hourToSecond=Number(time.toString().split(':')[0])*60*60;
  //   let minuteToSecond=Number(time.toString().split(':')[1])*60;
  //   let second=Number(time.toString().split(':')[2]);
  
  //   let totalSecond=hourToSecond+minuteToSecond+second;
  //   return totalSecond;
  // }
  
  // var startTime=moment().format('hh:mm:ss');
 
  // var endTime = moment(1548776628375).format('hh:mm:ss');
  
  // const start=convertSecond(startTime);
  // const end=convertSecond(endTime);
  
  // function count(time){
  //   let convertSeconds=time*60;
  //   let repeat=setInterval(()=>{
  //   convertSeconds--;
  //   let min=Math.floor(convertSeconds/60);
  //   let second=convertSeconds%60;
  //   if(min==0 & second==0){
  //     clearInterval(repeat)
  //   }
  //   console.log({min,second});
  //   return{min,second}
  //   },1000)
  // }
  // if(end>start){
  //   count((end-start)/60);
  // }
 


//   return(
  
//         <li className={classes.li}>
//           <div>
//             <h3>Chicken: {props.ingredients.Chicken}</h3>
//             <h3>Cheese: {props.ingredients.Cheese}</h3>
//             <h3>Meat: {props.ingredients.Meat}</h3>
//             <h3>Salad: {props.ingredients.Salad}</h3>
//             <h2 style={{color:'white'}}>Total Price: {props.totalPrice}</h2>
//             <h3 style={{background:'red',padding:'5px',color:'white'}}>{}</h3>
//           </div>
//           <div>
//           <h3>Name: {props.CustomerInfo.name}</h3>
//             <h3>Email: {props.CustomerInfo.email}</h3>
//             <h3>Address: {props.CustomerInfo.address}</h3>
//             <h3>Mobile: {props.CustomerInfo.mobile}</h3>
//             <h3 style={{background:'white',padding:'5px',color:'black'}}>Order Time:{moment(props.orderTime).calendar()}</h3>
//           </div>         
//         </li>

//   )
// }
// function convertSecond(time){
//   let hourToSecond=Number(time.toString().split(':')[0])*60*60;
//   let minuteToSecond=Number(time.toString().split(':')[1])*60;
//   let second=Number(time.toString().split(':')[2]);

//   let totalSecond=hourToSecond+minuteToSecond+second;
//   return totalSecond;
// }

// var startTime=moment().format('hh:mm:ss');

// var endTime = moment(1548776628375).format('hh:mm:ss');

// const start=convertSecond(startTime);
// const end=convertSecond(endTime);

// function count(time){
//   let convertSeconds=time*60;
//   let repeat=setInterval(()=>{
//   convertSeconds--;
//   let min=Math.floor(convertSeconds/60);
//   let second=convertSeconds%60;
//   if(min==0 & second==0){
//     clearInterval(repeat)
//   }
//   console.log({min,second});
//   return{min,second}
//   },1000)
// }
// if(end>start){
//   count((end-start)/60);
// }

