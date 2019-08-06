import React, { Component } from 'react'
import {connect} from 'react-redux';
import getFilterBurger from '../../getFilterBurger/getFilterBurger';
import classes from './MenuItem.module.scss';
import Burger from '../../components/Burger/Burger';
import {history} from '../../index';
 class MenuItem extends Component {

  componentWillMount =()=>{
      this.props.dispatch({type:'FILTER_BY_TYPES',name:this.props.match.params.itemName}) 
  }
  allBurgers=()=>{
    return(
      this.props.getFilterBurger.map((itm,index)=><Burger key={itm.id} {...itm} history={history}/>)
    )
  }
  render() {
 
      return <section className={classes.allBurgersSection} >
      <div className={classes.row}>
        <h1 className={classes.burgerTypeName}>{this.props.match.params.itemName}</h1>
          <div className={classes.all_burgers}>
            {this.props.getFilterBurger.length >0 ?this.allBurgers():<h1 style={{textAlign:'center'}}>There is no item in this category.</h1>}
          </div>
        </div>
    </section>  
  }
}

const mapStateToProps=state=>{
  return{
    getFilterBurger:getFilterBurger(state.adminReducer.allBurgers,state.filterReducer)
  }
}

export default connect(mapStateToProps)(MenuItem);