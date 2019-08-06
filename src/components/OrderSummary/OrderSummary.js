import React,{Component} from 'react';
import Aux from '../../HOC/helper';
import Button from '../UI/Button/Button';
import classes from './OrderSummary.module.scss';
import {connect} from 'react-redux';

class OrderSummary extends Component{
  
  render(){
    return(
      <Aux>
      {this.props.requestOrder?    
        <div className={classes.OrderSummary}>
          <h2 className={classes.title}>Your Order</h2>
          <p className={classes.subTitle}>A delicious Burger with the following ingredients:</p>
          <ul className={classes.orderItems}>
            <li>Salad:{this.props.ingredients.Salad}</li>
            <li>Chicken:{this.props.ingredients.Chicken}</li>
            <li>Cheese:{this.props.ingredients.Cheese}</li>
            <li>Meat:{this.props.ingredients.Meat}</li>
          </ul>
          <h2 className={classes.price}>Total Price: {this.props.totalPrice}</h2>
          <Button btnType={'Danger'} clicked={this.props.closeModal}>CANCEL</Button>
          <Button btnType={'Success'} clicked={this.props.buy}>CONTINUE</Button>
        </div>
      :null
       }
      </Aux>
    )
  }
};

const mapStateToProps=state=>{
  return{
    ingredients:state.burgerReducer.ingredients,
    totalPrice:state.burgerReducer.totalPrice
  }
}
export default connect(mapStateToProps)(OrderSummary);