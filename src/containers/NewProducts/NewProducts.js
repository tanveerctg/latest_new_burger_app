import React,{Component} from 'react';
import classes from './NewProducts.module.scss';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import getFilterBurger from '../../getFilterBurger/getFilterBurger';
import {history} from '../.././index';


class NewProducts extends Component {

  allBurgers=()=>{
    return(
      this.props.getFilterBurger.map((itm,index)=>itm.status==='new' && <Burger key={itm.id} {...itm} history={history}/>)
    )
  }

  render() { 
    return  <React.Fragment>
              <h1 style={{textAlign:'center',background:'#a6cb12',padding:'5px',color:'ghostWhite',fontFamily: 'Anton',letterSpacing:'.06ch',wordSpacing:'.04ch'}}>New Products</h1>
              <section className={classes.allBurgersSection} >
                <div className={classes.row}>
                    <div className={classes.all_burgers}>
                      {this.props.getFilterBurger.length >0 ?this.allBurgers():<h1 style={{textAlign:'center'}}>There is no item in this category.</h1>}
                    </div>
                  </div>
              </section>   
            </React.Fragment>
  }
}

const mapStateToProps=state=>{
  return{
    getFilterBurger:getFilterBurger(state.adminReducer.allBurgers,state.filterReducer),
    burgerTypeName:state.filterReducer.burgerTypeName
  }
}
export default connect(mapStateToProps)(NewProducts);