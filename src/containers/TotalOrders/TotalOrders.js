import React,{Component} from 'react';
import classes from './TotalOrders.module.scss';
import Order from './Order/Order';
import {connect} from 'react-redux';

class TotalOrders extends Component{

  render(){
    let result; 
    result= <div className={classes.container}>
      <ul className={classes.ul}>
          {this.props.orders.map((order,index)=>
            <Order key={index} 
                  ingredients={order.ingredients} 
                  items={order.items}
                  CustomerInfo={order.CustomerInfo}
                  totalPrice={order.totalPrice}
                  orderTime={order.orderTime}
                  cancelOrderTime={order.cancelOrderTime}
                  id={order.id}
            />
          )}
      </ul>
      </div>
  
    return(result)
    
  }
}
const mapStateToProps=state=>{
  return{
    id:state.authReducer.id,
    orders:state.burgerReducer.orders,
    
  }
}
export default connect(mapStateToProps)(TotalOrders);