import classes from './AddToCart.module.scss';
import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import ModalContent from '../ModalContent/ModalContent'
import { withRouter } from "react-router";
import {connect} from 'react-redux';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width:'60%',
    height:'75%',
    overflow:'hidden',
    width:'90%',
    padding:'5px'
  }

};

 class AddToCart extends Component {
   state={
     modalIsOpen:false
   }
   modalOpen=()=>{
    this.setState({modalIsOpen:true})
   }
   closeModal=()=>{
    this.setState({modalIsOpen: false});
  }
  
  render() {
    console.log(Object.keys(this.props.priceList).length)
    return (
      <React.Fragment>
      {
        Object.keys(this.props.priceList).length > 0
           ?
           <div className={classes.myMeal} onClick={this.modalOpen} style={{cursor:'pointer'}}>
            <p>{this.props.totalItems} times added in my meals
            <FontAwesomeIcon
              icon={['fas','angle-down']}
              transform="right-5 grow-2.5 down-2"
            />
              </p>
          </div>:''
      }  
      
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          portalClassName={classes.content}
          overlayClassName={classes.overlay}
          ariaHideApp={false}
          className={classes.open}
        >
          <ModalContent closeModal={this.closeModal} history={this.props.history} dispatch={this.props.dispatch}/>
       </Modal>
       
      </React.Fragment>
      
    )
  }
}
const mapStateToProps=state=>{
  return{
    priceList:state.adminReducer.price
  }
}

export default connect(mapStateToProps)(withRouter(AddToCart));