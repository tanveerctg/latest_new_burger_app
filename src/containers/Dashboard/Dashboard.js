import React, { Component } from 'react';
import classes from './Dashboard.module.scss';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import background from './2.jpeg';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import {firebase} from '../../firebase/firebase';
import {signOut} from '../../store/Actions/auth';
import Burger from '../../components/Burger/Burger';
import getFilterBurger from '../../getFilterBurger/getFilterBurger';
import AddToCart from '../../components/AddToCart/AddToCart';
  const SliderWithTooltip = createSliderWithTooltip(Slider);

  const marks = {
    200:  {
      style: {
        color: 'white',
        fontSize:'18px'
      },
      label: <strong>200 tk</strong>,
    },
    800: {
      style: {
        color: 'white',
        fontSize:'18px'
      },
      label: <strong>800 tk</strong>,
    },
  };

 class Dashboard extends Component {
  state={
    value:null,
    filterBurger:[]
  }
  sliderChange=(value)=>{
    this.props.dispatch({type:'FILTER_BY_PRICE',price:value})
  }

  allBurgers=()=>{
    return(
      this.props.getFilterBurger.map((itm,index)=><Burger key={itm.id} {...itm} history={this.props.history}/>)
    )
  }
  searchBurger=(e)=>{
 
    this.props.dispatch({type:'FILTER_SEARCH',name:e.target.value})
  }

  render() {
  
    return (
      <div className={classes.container} style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.7)),url(${background})`,backgroundPosition:'center',backgroundAttachment :'fixed',height:`${this.props.getFilterBurger.length>0?'100%':'100vh'}`}}>
     
      <header>
        {this.props.check_signup_link ?
          <div className={classes.button_container}>
            <Link to="signup"><button className={classes.signupButton}>Sign Up</button></Link>
            <Link to="signin"><button className={classes.signinButton}>Sign In</button></Link>
          </div>
          :<button onClick={()=>{
            firebase.auth().signOut().then(()=>{
            this.props.dispatch(signOut()); 
            this.props.dispatch({type:'SIGN_UP_WITH_EMAIL'});
            this.props.history.push('/');
        })
        }}
        className={classes.logout}
        >Log Out</button>
        }
        <Link to="TestingDashboard"><button style={{padding:'20px',width:'40%',background:'red'}}>Testing</button></Link>
      </header>
      <main>
        <section className={classes.afterHeader}>
        <Link to="burgerBuilder" style={{padding:'20px',width:'40%'}}><button className={classes.create_burger_btn}>Create Your Own Burger !!</button></Link>
            <input type="text" placeholder={this.state.serachName?this.state.serachName:'Search Burger'} className={classes.filterBurger}
              onChange={this.searchBurger} value={this.props.filterReducer.search?this.props.filterReducer.search:''}
            />
            <div className={classes.slider}>
              <SliderWithTooltip
                tipProps={{ overlayClassName: 'foo',padding:'10px' }}
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
                className='slide'
              />
            </div>
        </section>
         <AddToCart totalItems={this.props.totalItemsInTheCart} {...this.props}/>
          <section className={classes.all_burgers}>{this.allBurgers()}
        </section>
      </main>
    </div>
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
export default connect(mapStateToProps)(Dashboard);