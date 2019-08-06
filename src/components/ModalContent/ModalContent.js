import React, { Component } from 'react'
import classes from './ModalContent.module.scss'
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux';

class ModalContent extends Component {
  state={
    items:null,
    totalPrice:null,
    totalItemsInTheCart:0
  }
  componentWillMount=()=>{
    let items=[];
    for(let itm in this.props.itemsInTheCart){
      items.push({name:itm,quantity:this.props.itemsInTheCart[itm],price:this.props.priceList[itm]*this.props.itemsInTheCart[itm]})
    }
    this.setState({items})
    let totalItems=0;
    for(let itm in this.props.allItems){
      totalItems +=this.props.allItems[itm];
    }
    this.setState({totalItemsInTheCart:totalItems})
  }
  addToCart=(name)=>{
    this.props.dispatch({type:'ADD ITEM TO CART',name:name})
    this.props.dispatch({type:'ADDED TO CART ITEMS INFO'})
  }
  removeFromCart=(name)=>{
    this.props.dispatch({type:'REMOVE ITEM FROM CART',name:name})
    this.props.dispatch({type:'ADDED TO CART ITEMS INFO'})
  }
  deleteItemFromCart=(name)=>{
    this.props.dispatch({type:'DELETE ITEM FROM CART',name})
  }
  handleContinue=()=>{
    if(!!this.props.id){
      this.props.history.push('/checkout')
      this.props.dispatch({type:'NORMAL ORDER',value:true})
      this.props.dispatch({type:'ORDER FROM CUSTOMIZED SECTION',value:false})
    }else{
      this.props.history.push('/signin');
      this.props.dispatch({type:'NORMAL ORDER',value:true})
      this.props.dispatch({type:'ORDER FROM CUSTOMIZED SECTION',value:false})
    }
  }
  
  render() {
 
    return(
      <Scrollbars style={{height:'80vh'}}>
      <div className={classes.container} >
        <div className={classes.header}>
          <h1>My Meal</h1>
          <FontAwesomeIcon
              icon={['fas','times-circle']}
              color="red"
              style={{cursor:'pointer'}}
              transform="grow-8 down-8 left-0"
              onClick={()=>{this.props.closeModal()}}
              className={classes.closeBtn}
          />
        </div>
        { this.props.totalItemsInTheCart>0 ?
              this.props.allItemsInTheCart.map(({name,quantity,price},index)=>(
               <div className={classes.content} key={name}>
                  <div className={classes.itmList} style={{marginTop:'12px'}}> 
                    {index===0?<h4>Items</h4>:''}
                    <div style={{display:'grid',gridTemplateColumns:'auto 3fr auto',background: 'black',gridGap:'7px',alignItems:'center',color:'white',padding:'10px'}}>
                      <FontAwesomeIcon
                          icon={['fas','times-circle']}
                          color="red"
                          onClick={()=>{this.deleteItemFromCart(name)}}
                          className={classes.removeBtn}
                      />
                      <h3 className={classes.burgerName}>{quantity} x {name}</h3>
                      <div style={{display:'grid',gridGap:'7px',gridTemplateColumns:'1fr 1fr'}}>
                      <FontAwesomeIcon
                        icon={['fas','plus-circle']}
                        color="#c9f658"
                        onClick={()=>this.addToCart(name,quantity)}
                        className={classes.increaseBtn}
                      />
                      <FontAwesomeIcon
                          icon={['fas','minus-circle']}
                          color="red"
                          onClick={()=>this.removeFromCart(name)}
                          className={classes.decreaseBtn}
                      />
                      </div>
                    </div>
                  </div>
                  <div className={classes.priceList} style={{marginTop:'12px'}}> 
                    {index===0?<h4>price(tk)</h4>:''}
                    <h3 className={classes.price}>{price}</h3>
                  </div>     
              </div>
            )
          ):<h2>Please add burgers in the cart</h2>
        }
   
        <button className={this.props.totalItemsInTheCart>0 ? classes.continueBtn :[classes.continueBtn,classes.disableBtn].join(' ')} disabled={this.props.totalItemsInTheCart===0} onClick={this.handleContinue}>Continue</button>
        <p className={classes.totalPrice}>Total : {this.props.allItemsInTheCart.reduce((total,itm)=>{
          return total+itm.price;
        },0)}</p>
      </div>
      </Scrollbars>
    )
  }
}
const mapStateToProps=state=>{
  return{
    allItemsInTheCart:state.adminReducer.addedToCartItmsInfo,
    allItems:state.adminReducer.itemsInTheCart,
    id:state.authReducer.id,
    totalItemsInTheCart:state.adminReducer.totalItemsInTheCart
  }
}
export default connect(mapStateToProps)(ModalContent);

