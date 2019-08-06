import React, { Component } from 'react';
import classes from './Signin.module.scss';
import {firebase,googleProvider,fbProvider,database} from '../../firebase/firebase';
import {connect} from 'react-redux';
import {signOut} from '../../store/Actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Aux from '../../HOC/helper';
import Loader from '../../components/UI/Loader/Loader';
import {NavLink} from 'react-router-dom';


class Signin extends Component {
  state={
    inputShow:false,
    email:'',
    password:false,
    err:false,
    errMsg:'',
    loading:false
  }
  emailHandler=(e)=>{
    let currentValue=this.state.inputShow;
    this.setState({inputShow:!currentValue});
    e.preventDefault();
  }
  googleSignInHandler=()=>{
    this.setState({loading:true})
    firebase.auth().signInWithPopup(googleProvider).then(()=>{
      this.setState({loading:false}) 
      this.props.dispatch({type:'SIGN_IN_WITH_EMAIL'});
      if(this.props.customizedOrder || this.props.normalOrder){
        this.props.history.push('/checkout');
       }else{
        this.props.history.push('/');
      }
    });;
  }
  fbSignInHandler=()=>{
    this.setState({loading:true})
    firebase.auth().signInWithPopup(fbProvider).then(()=>{
      this.setState({loading:false}) 
      this.props.dispatch({type:'SIGN_IN_WITH_EMAIL'});
      if(this.props.customizedOrder || this.props.normalOrder){
        this.props.history.push('checkout');
       }else{
        this.props.history.push('/');
      }
    });;
   
  }
  emailChangeHandler=(e)=>{
    this.setState({email:e.target.value});
    this.props.dispatch({type:'SIGN_IN_WITH_EMAIL'})
  }
  passwordChangeHandler=(e)=>{
    this.setState({password:e.target.value})
  }
  emailAndPasswordHandler=(email,password)=>{
    this.setState({err:false}) 
    this.setState({loading:true})
    firebase.auth().signInWithEmailAndPassword(email, password).
    then(user=>{
      this.setState({err:false})
      if(this.props.customizedOrder || this.props.normalOrder){
        this.props.history.push('/checkout');
       }else{
        this.props.history.push('/');
      }
      this.setState({loading:false}) 
     
    })
    .
    catch(error=>{
      // Handle Errors here.
      this.setState({err:true});
      this.setState({loading:false})
      this.setState({errMsg:error.message});
      this.props.dispatch(signOut()); 
      this.props.dispatch({type:'SIGN_UP_WITH_EMAIL'});
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
  render() {

    let fbBtn=[classes.button,classes.facebook];
    let googleBtn=[classes.button,classes.google];
    let loading=this.state.loading;
    return (
      <Aux>
      { loading
          ?
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}><Loader/></div>
        :
      <div className={classes.container} style={
        this.state.inputShow?{
        height:'32.8rem'
      }:{
        height:'16.8rem'
      }}>
        <button className={googleBtn.join(' ')} onClick={this.googleSignInHandler}>
          <FontAwesomeIcon
              icon={['fab','google']}
              className={classes.google_icon}
            />
            <span className={classes.textGoogle}>Log In With Google</span>
        </button>
        <button className={fbBtn.join(' ')} onClick={this.fbSignInHandler}>
          <FontAwesomeIcon
              icon={['fab','facebook']}
              className={classes.fb_icon}
            />
            <span className={classes.textFacebook}>Log In With Facebook</span>
        </button>
        <h3 className={classes.or}>Or</h3>
        <button onClick={this.emailHandler} className={classes.emailHandler}>Sign In with Email</button>
        
          {
            this.state.inputShow ?
              <div>
                <div className={classes.inputContainer}>  
                  <input 
                    placeholder="Email"
                    type="email"
                    onChange={this.emailChangeHandler}
                  />
                   <label>Email</label>     
                </div>
                <div className={classes.inputContainer}>     
                  <input 
                    placeholder="Password"
                    type="password"
                    onChange={this.passwordChangeHandler}  
                  /> 
                  <label>Password</label> 
                </div>
                <button onClick={()=>this.emailAndPasswordHandler(this.state.email,this.state.password)} className={classes.signInBtn}>Sign In</button>
              </div>    
              : null
          }
          <p style={{display:'inlineBlock',position:'relative',bottom:'2rem',fontWeight:'600'}}>Need an Acount?<NavLink to="/signup" className={classes.signupLink}>Sign up now!</NavLink></p>
      </div>
    }
          
          <h3 className={classes.errMsg}>{this.state.err?this.state.errMsg:null}</h3>
      </Aux>
    )
  }
}
const mapStateToProps=state=>{
  return{
    ingredients:state.burgerReducer.ingredients,
    totalPrice:state.burgerReducer.totalPrice,
    check_signup_link:state.authReducer.check_signup_link,
    id:state.authReducer.id,
    customizedOrder:state.adminReducer.customizedOrder,
    normalOrder:state.adminReducer.normalOrder
  }
}
export default connect(mapStateToProps)(Signin);