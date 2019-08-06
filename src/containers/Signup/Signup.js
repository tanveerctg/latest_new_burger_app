import React, { Component } from 'react';
import classes from './Signup.module.scss';
import {firebase,googleProvider,fbProvider,database} from '../../firebase/firebase';
import {connect} from 'react-redux';
import {signOut} from '../../store/Actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Aux from '../../HOC/helper';
import Loader from '../../components/UI/Loader/Loader';
import {NavLink} from 'react-router-dom';

class Signup extends Component {
  state={
    inputShow:false,
    email:'',
    password:'',
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
      this.setState({err:false})
      this.props.dispatch({type:'SIGN_IN_WITH_EMAIL'});
      if(this.props.totalPrice>10){
        this.props.history.push('/checkout');
       }else{
        this.props.history.push("/");
      }
    });;
  }
  fbSignInHandler=()=>{
    this.setState({loading:true})
    firebase.auth().signInWithPopup(fbProvider).then(()=>{
      this.setState({loading:false})
      this.setState({err:false})
      this.props.dispatch({type:'SIGN_IN_WITH_EMAIL'});
      if(this.props.totalPrice>10){
        this.props.history.push('/checkout');
       }else{
        this.props.history.push("/");
      }
    });;
   
  }
  emailChangeHandler=(e)=>{
    this.setState({email:e.target.value})
  }
  passwordChangeHandler=(e)=>{
    this.setState({password:e.target.value})
  }
  emailAndPasswordHandler=(email,password)=>{
    this.setState({err:false})
    this.setState({loading:true})
    firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
      this.props.dispatch(signOut()); 
      this.setState({err:false})
      this.props.dispatch({type:'SIGN_UP_WITH_EMAIL'});
      this.props.history.push("/"); 
      this.setState({loading:false});
      this.props.history.push("/");
    })
    .catch(err=>{
      this.setState({err:true});
      this.setState({loading:false})
      console.log(err)
      this.setState({errMsg:err.message});
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
            height:'17.8rem'
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
            <button onClick={this.emailHandler} className={classes.emailHandler}>Sign Up with Email</button>
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
                    <button onClick={()=>this.emailAndPasswordHandler(this.state.email,this.state.password)} className={classes.signUpBtn}>Submit</button>
                  </div>    
                  : null
              }
              <p style={{display:'inlineBlock',position:'relative',bottom:'2rem',fontWeight:'600',color:'white',padding:'.5rem'}}>Already have an Acount?<NavLink to="/signin" className={classes.signinLink}>Log in</NavLink></p>
          </div>
        }
          
          <h3 className={classes.errMsg}>{this.state.err?this.state.errMsg:null}</h3>
      </Aux>
    )
  }
}

export default connect()(Signup);