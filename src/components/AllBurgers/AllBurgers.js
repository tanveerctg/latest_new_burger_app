import React,{Component} from 'react';
import classes from './AllBurgers.module.scss';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import getFilterBurger from '../../getFilterBurger/getFilterBurger';
import {history} from '../.././index';



class AllBurgers extends Component {

  allBurgers=()=>{
    return(
      this.props.getFilterBurger.map((itm,index)=><Burger key={itm.id} {...itm} history={history}/>)
    )
  }
  render() {

    return <section className={classes.allBurgersSection} >
              <div className={classes.row}>
                <h1 className={classes.burgerTypeName}>{this.props.burgerTypeName}</h1>
                  <div className={classes.all_burgers}>
                    {this.props.getFilterBurger.length >0 ?this.allBurgers():<h1 style={{textAlign:'center'}}>There is no item in this category.</h1>}
                  </div>
                </div>
            </section>   
  }
}

const mapStateToProps=state=>{
  return{
    getFilterBurger:getFilterBurger(state.adminReducer.allBurgers,state.filterReducer),
    burgerTypeName:state.filterReducer.burgerTypeName
  }
}
export default connect(mapStateToProps)(AllBurgers);