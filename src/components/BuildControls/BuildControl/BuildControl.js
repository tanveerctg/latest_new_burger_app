import React,{Component} from 'react';
import classes from './BuildControl.module.scss';
import {connect} from 'react-redux';
import addItem from '../../../store/Actions/Add_Item';
import removeItem from '../../../store/Actions/Remove_Item';
class BuildControl extends Component{

  render(){
    const itemName=[];
    itemName.push(classes['text']);
    itemName.push(classes[this.props.label]);
    let numberOfIngredients=this.props.ingredients[this.props.label];
    return(
      <div className={classes.BuildControlContainer}>
      <div className={itemName.join(' ')}>{this.props.label}</div>
      <button onClick={()=>this.props.dispatch(addItem(this.props.label))} className={classes.add}>More</button>
      {numberOfIngredients<=0
        ? <button disabled className={classes.disable}>Less</button>
        : <button onClick={()=>this.props.dispatch(removeItem(this.props.label))} 
        className={classes.remove}>Less</button>
      }

    </div> 
    )
  }
}
const mapStateToProps=state=>{
  return{
    ingredients:state.burgerReducer.ingredients
  }
}

export default connect(mapStateToProps)(BuildControl);