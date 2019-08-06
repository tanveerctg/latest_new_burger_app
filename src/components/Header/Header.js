import React, { Component } from 'react'
import classes from './Header.module.scss';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {firebase} from '../../firebase/firebase';
import {signOut} from '../../store/Actions/auth';
import getFilterBurger from '../../getFilterBurger/getFilterBurger';
import {history} from '../../index';
import logo from './logo.png';

 class Header extends Component {
  state={
    toggle: false
  }
  toggle = () => {
    const prev = this.state.toggle;
    this.setState({ toggle: !prev });
    this.props.on();
  };
  render() {

    return (
      <section className={classes.header} style={{position:'sticky',width:'100%',top:'0',left:'0',zIndex:'1000'}}>
      <div className={classes.row}>
        <div className={classes.navContainer}>
          <div className={classes.nav}>
             <div style={{height:'40px',width:'50px',position:'relative',cursor:'pointer'}} onClick={()=>history.push('/')}><img src={logo} style={{position:'absolute',height:'100%',width:'100%'}}/></div>
            <h2 onClick={()=>history.push('/menu')}>Menu</h2>
            <h2 onClick={()=>history.push('/newproducts')}>New Products</h2>
            <h2 onClick={()=>history.push('/contactus')}>Contact Us</h2>
            {!this.props.check_signup_link && <h2 onClick={()=>history.push('/orders')} >Orders</h2> }
            <h2 onClick={this.toggle} className={this.state.toggle?classes.filter:classes.hover}>Filter</h2>
          </div>
          <div className={classes.authentication}>
                {this.props.check_signup_link ?
                <div className={classes.button_container}>
                  <Link to="signup"><button className={classes.signupButton}>Sign Up</button></Link>
                  <Link to="signin"><button className={classes.signinButton}>Sign In</button></Link>
                </div>
                :<button onClick={()=>{
                  firebase.auth().signOut().then(()=>{
                  this.props.dispatch(signOut()); 
                  this.props.dispatch({type:'SIGN_UP_WITH_EMAIL'});
                  history.push('/');
              })
              }}
              className={classes.logout}
              >Log Out</button>
              }
          </div>
          
        </div>
      </div>
    </section>
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
export default connect(mapStateToProps)(Header);