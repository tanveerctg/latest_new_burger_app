import React, { Component } from 'react'
import Portal from '../Portal/Portal';
import { Transition,config } from 'react-spring/renderprops';
import classes from './CartModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux';

class CartModal extends Component {

  addToCart=(name)=>{
    this.props.dispatch({type:'ADD ITEM TO CART',name:name})
    this.props.dispatch({type:'ADDED TO CART ITEMS INFO'})
    this.setState({plusSign:true});
    setTimeout(()=>{
      this.setState({plusSign:false});
    },300)
  }
  removeFromCart=(name)=>{
    this.props.dispatch({type:'REMOVE ITEM FROM CART',name:name})
    this.props.dispatch({type:'ADDED TO CART ITEMS INFO'})
  }
  deleteItemFromCart=(name)=>{
    this.props.dispatch({type:'DELETE ITEM FROM CART',name})
  }


  render(){
    const {on}=this.props;
    return(
      <React.Fragment>
        <Transition
          items={on}
          from={{ opacity: 0}}
          enter={{ opacity: 1}}
          leave={{ opacity: 0 }}
          config={config.gentle}
          >
        {on => on && (styles =>
          <Portal>
          <div className={classes.cartModal}>
            <div className={classes.row} style={{height:`100vh`,opacity:styles.opacity}}>
              <div className={classes.container}>
                    <FontAwesomeIcon
                            icon={['fa','times']}
                            transform="grow-15"
                            onClick={()=>this.props.closeCart()}
                            className={classes.removeBtn}
                    />

                <h1 className={classes.meal}>My meal</h1>
                
                { this.props.totalItemsInTheCart>0 ?
                  <div className={classes.itemsContainer}>
            { 
              this.props.allItemsInTheCart.map(({name,quantity,price},index)=>{
                return(
                  <div className={classes.items} key={index}>   
                   <div className={classes.itemsDes}>
                  <FontAwesomeIcon
                          icon={['fas','times-circle']}
                          color="red"
                          transform="down-2"
                          onClick={()=>{this.deleteItemFromCart(name)}}
                          className={classes.removeBtn}
                  />
                    <p>{quantity} x {name}</p>
                    <FontAwesomeIcon
                        icon={['fas','plus-circle']}
                        transform="down-2"
                        color="green"
                        onClick={()=>this.addToCart(name,quantity)}
                        className={classes.increaseBtn}
                    />
                      <FontAwesomeIcon
                        icon={['fas','minus-circle']}
                        color="red"
                        transform="down-2"
                        onClick={()=>this.removeFromCart(name)}
                        className={classes.decreaseBtn}
                    />
                  </div>
                  <div className={classes.itemsPrice}><strong>{price} BDT</strong></div>
               </div>
                )
              })
            }
            <h2 style={{margin: "2rem 0 .1rem 0"}}>Total Price : {this.props.allItemsInTheCart.reduce((total,itm)=>{
              return total+itm.price;
              },0)} BDT
            </h2>
            </div>

        :
        <h3 style={{textAlign:'center'}}>Please add burgers in the cart</h3>
                }
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
const mapStateToProps=(state,props)=>{
  return{
    allItemsInTheCart:state.adminReducer.addedToCartItmsInfo,
    totalItemsInTheCart:state.adminReducer.totalItemsInTheCart,
  }
}
export default connect(mapStateToProps)(CartModal);


