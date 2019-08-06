import React,{Component} from 'react';
import classes from './FilterModal.module.scss';
import { Transition,config } from 'react-spring/renderprops';
import Portal from '../Portal/Portal';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import getFilterBurger from '../../getFilterBurger/getFilterBurger';
import {connect} from 'react-redux';

const SliderWithTooltip = createSliderWithTooltip(Slider);
const marks = {
  200:  {
    style: {
      color: 'white',
      fontSize:'15px'
    },
    label: <strong>200 tk</strong>,
  },
  800: {
    style: {
      color: 'white',
      fontSize:'15px'
    },
    label: <strong>800 tk</strong>,
  },
  500: {
    style: {
      color: 'white',
      fontSize:'15px'
    },
    label: <strong>500 tk</strong>,
  },
};

class FilterModal extends Component {

  sliderChange=(value)=>{
    this.props.dispatch({type:'FILTER_BY_PRICE',price:value})
  }
  searchBurger=(e)=>{
    this.props.dispatch({type:'FILTER_SEARCH',name:e.target.value})
  }
  

  render(){
    let modalHeight;
    if(window.innerWidth>963){
      modalHeight=12;
    }else{
      modalHeight=16;
    }
    const {on}=this.props;
    return(
      <React.Fragment>
        <Transition
          items={on}
          from={{ opacity: 0,modalHeight:0}}
          enter={{ opacity: 1,modalHeight}}
          leave={{ opacity: 0 }}
          config={config.gentle}
          >
        {on => on && (props =>
          <Portal>
            <div className={classes.modal} style={{opacity:props.opacity,height:`${props.modalHeight}rem`}}>
             <div className={classes.row}>
              <div className={classes.filterGrid}>
                <h1 style={{opacity:props.opacity,transitionDelay:'.8s',transition:'opacity .7s'}}>Filter Burger</h1>

                <input type="text" placeholder="Search Burger" style={{border:'none',padding:'1rem'}}
                onChange={this.searchBurger}  value={this.props.filterReducer.search?this.props.filterReducer.search:''} ></input>

                <SliderWithTooltip
                  tipProps={{ overlayClassName: 'foo',padding:'12px',backgroundColor:'white'}}
                  onChange={this.sliderChange}
                  min={200} max={800}
                  defaultValue={this.props.filterReducer.price?this.props.filterReducer.price:500}
                  handleStyle={{
                  height: 22,
                  width: 22,
                  marginLeft: -14,
                  marginTop: -10,
                  backgroundColor: 'white',
                }}
                  marks={marks}
                  className={classes.slide}
                />
              </div>
             </div>
            </div>
          </Portal>
        )
        }
        </Transition>
     </React.Fragment>
    )
  }
}

const mapStateToProps=state=>{
  return{
    ingredients:state.burgerReducer.ingredients,
    totalPrice:state.burgerReducer.totalPrice,
    check_signup_link:state.authReducer.check_signup_link,
    id:state.authReducer.id,
    all_burgers:state.adminReducer.allBurgers,
    filterReducer:state.filterReducer,
    getFilterBurger:getFilterBurger(state.adminReducer.allBurgers,state.filterReducer),
    totalItemsInTheCart:state.adminReducer.totalItemsInTheCart
  }
}
export default connect(mapStateToProps)(FilterModal);

