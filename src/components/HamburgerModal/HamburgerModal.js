import React,{Component} from 'react';
import Portal from '../Portal/Portal';
import { Transition,config } from 'react-spring/renderprops';
import classes from './HamburgerModal.module.scss';
import {connect} from 'react-redux';
import {history} from '../../index';
import {signOut} from '../../store/Actions/auth';
import {firebase} from '../../firebase/firebase';

class HamburgerModal extends Component {
  render(){
    const {on}=this.props;
    return(
      <React.Fragment>
        <Transition
          items={on}
          from={{ opacity: 0,height:0}}
          enter={{ opacity: 1,height:100}}
          leave={{ opacity: 0 ,height:0}}
          config={config.gentle}
          >
        {on => on && (props =>
          <Portal>
            <div className={classes.hamburgerModal} style={{height:`${props.height}vh`,opacity:props.opacity}}>
             <h2 style={{opacity:props.opacity,transitionDelay:'.4s',transition:'opacity .3s'}}
                  onClick={()=>{
                  history.push('menu');
                  this.props.toggle();
                }}
              >Menu</h2>
              <h2 style={{opacity:props.opacity,transitionDelay:'.4s',transition:'opacity .3s'}}
                  onClick={()=>{
                  history.push('newproducts');
                  this.props.toggle();
                }}
              >New Products</h2>
              <h2 style={{opacity:props.opacity,transitionDelay:'.5s',transition:'opacity .3s'}}
                 onClick={()=>{
                  history.push('contactus');
                  this.props.toggle();
                }}
              >Contact Us</h2>
              {!this.props.check_signup_link &&<h2 style={{opacity:props.opacity,transitionDelay:'.7s',transition:'opacity .3s'}}
                 onClick={()=>{
                  history.push('orders');
                  this.props.toggle();
                }}
              >Orders</h2>}
              {
                this.props.check_signup_link ?
                  <React.Fragment>
                  <h2 style={{opacity:props.opacity,transitionDelay:'.6s',transition:'opacity .3s'}}
                  onClick={()=>{
                    history.push('signin');
                    this.props.toggle();
                    }}>Sign in</h2>
                  <h2 style={{opacity:props.opacity,transitionDelay:'.7s',transition:'opacity .3s'}}
                  onClick={()=>{
                    history.push('signup');
                    this.props.toggle();
                    }}>Sign Up</h2>
                  </React.Fragment>:
                  <h2 style={{opacity:props.opacity,transitionDelay:'.7s',transition:'opacity .3s'}} onClick={()=>{
                  firebase.auth().signOut().then(()=>{
                  this.props.dispatch(signOut()); 
                  this.props.dispatch({type:'SIGN_UP_WITH_EMAIL'});
                  history.push('/');
                  this.props.toggle();
              })
              }}>Log Out</h2>
              }

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
    check_signup_link:state.authReducer.check_signup_link
  }
}
export default connect(mapStateToProps)(HamburgerModal);
