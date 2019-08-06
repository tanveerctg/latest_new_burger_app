import React,{Component} from 'react';
import classes from './Modal.module.scss';
import Aux from '../../HOC/helper';
import Backdrop from '../UI/Backdrop/Backdrop';
class Modal extends Component {

    shouldComponentUpdate=(nextProp,nextState)=>{
      return nextProp.requestOrder !== this.props.requestOrder || nextProp.children !==this.props.children;      
    }
    componentWillUpdate=()=>{
      console.log('update');
    }
  render=()=>{
    return(
      <Aux>
        <Backdrop show={this.props.requestOrder} closeModal={this.props.closeModal}/>
        {this.props.requestOrder?    
        <div className={this.props.requestOrder? classes.Modal: null}>
          {this.props.children}
        </div>:null }
      </Aux>
    )
  }
}
export default Modal;