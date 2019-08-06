import React,{Component} from 'react';
import classes from './BurgerTypes.module.scss';
import eggBurger from './egg.png';
import beef from './beef.png';
import jr from './j.png';
import salad from './salad.png';
import cheese from './cheese.png';
import chicken from './chicken.png';
import all from './all.png';
import {connect} from 'react-redux';
import getFilterBurger from '../../getFilterBurger/getFilterBurger';

 class BurgerTypes extends Component{

  filterByType=(e)=>{
    this.props.dispatch({type:'FILTER_BY_TYPES',name:e.target.attributes.val.nodeValue})
    this.props.dispatch({type:'BURGER_TYPE_NAME',name:e.target.nextSibling.innerText})
  }

  render(){
    return (
      <section className={classes.burgerTypes}>
      <div className={classes.row}>
      <div className={classes.burgerTypes__all_burgers}>

        <div className={classes.burgerTypes__burger}  style={{cursor:'pointer'}} >
          <img src={all} className={classes.burgerTypes__burgerImage} val="all" onClick={this.filterByType} />
          <h2 className={classes.burgerTypes__burgerName} style={{textAlign:'center'}}>All Burgers</h2>
        </div>

        <div className={classes.burgerTypes__burger}  style={{cursor:'pointer'}} >
          <img src={cheese} className={classes.burgerTypes__burgerImage} val="cheese" onClick={this.filterByType} />
          <h2 className={classes.burgerTypes__burgerName}>Cheese Burger</h2>
        </div>

        <div className={classes.burgerTypes__burger}  style={{cursor:'pointer'}}  >
          <img src={chicken} className={classes.burgerTypes__burgerImage} val="chicken" onClick={this.filterByType} />
          <h2 className={classes.burgerTypes__burgerName}>Chicken & More</h2>
        </div>

        <div className={classes.burgerTypes__burger}  style={{cursor:'pointer'}}>
          <img src={salad} className={classes.burgerTypes__burgerImage} val="salad" onClick={this.filterByType} />
          <h2 className={classes.burgerTypes__burgerName}>Salad and Veggies</h2>
        </div>

        <div className={classes.burgerTypes__burger}  style={{cursor:'pointer'}}>
          <img src={jr} className={classes.burgerTypes__burgerImage} val="jr meals" onClick={this.filterByType} />
          <h2 className={classes.burgerTypes__burgerName} style={{textAlign:'center'}}>Jr &trade; meals</h2>
        </div>

        <div className={classes.burgerTypes__burger}  style={{cursor:'pointer'}}>
          <img src={beef} className={classes.burgerTypes__burgerImage} val="beef" onClick={this.filterByType} />
          <h2 className={classes.burgerTypes__burgerName} style={{textAlign:'center'}}>Beef</h2>
        </div>
      </div>
      </div>
    </section>
    )
  }


}
const mapStateToProps=state=>{
  return{
    getFilterBurger:getFilterBurger(state.adminReducer.allBurgers,state.filterReducer)
  }
}

export default connect(mapStateToProps)(BurgerTypes);