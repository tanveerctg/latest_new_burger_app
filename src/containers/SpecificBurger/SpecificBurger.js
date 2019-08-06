import React, { Component } from 'react'
import {connect} from 'react-redux';
import classes from './SpecificBurger.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartModal from '../../components/CartModal/CartModal';
import {history} from '../../index';

class SpecificBurger extends Component {
  state={
    toggle: false,
    name:'',
    price:'',
    calories:'',
    description:'',
    url:'',
    plusSign:false
  }

  componentWillMount=()=>{
      const {name,price,calories,description,url}=this.props.history.location.state;
      this.setState({name,price,calories,description,url});
  }
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
  handleContinue=()=>{
    if(!!this.props.id){
      history.push('/checkout')
      this.props.dispatch({type:'NORMAL ORDER',value:true})
      this.props.dispatch({type:'ORDER FROM CUSTOMIZED SECTION',value:false})
    }else{

      history.push('/signin');
      this.props.dispatch({type:'NORMAL ORDER',value:true})
      this.props.dispatch({type:'ORDER FROM CUSTOMIZED SECTION',value:false})
    }
  }
  cartToggle = () => {
    const prev = this.state.toggle;
    this.setState({ toggle: !prev });
  }
  closeCart=()=>{
    console.log('click')
    const prev = this.state.toggle;
    this.setState({ toggle: !prev });
  }
  render() {
    let sign;
    if(this.state.plusSign){
      sign='check'
    }else{
      sign='plus-circle'
    }
    const {name,price,calories,description,url}=this.state;
    return (
      <div className={classes.container}>
      <div className={classes.descriptionContainer}>
        <div className={classes.row}>
          <div className={classes.description}>
            <h1 className={classes.name}>{name}</h1>
            <p className={classes.statement}>{description}</p>
            <h3 className={classes.calorie}>{calories} cal</h3>
            <div className={classes.imgContainer}>
                <img src={url} className={classes.burgerImg}/>
            </div>
            {
              Object.keys(this.props.priceList).length > 0 ?
              <button className={classes.addToMeal} onClick={()=>this.addToCart(name)} >Add to my Meal
                <FontAwesomeIcon
                  icon={['fas',sign]}
                  transform="right-5 grow-2.5"
                />
              </button> : null
            }
          </div>
         </div>
       </div>
  
      <div className={classes.checkout}>
      { this.props.totalItemsInTheCart>0 ?
        <div className={classes.row}>
          <h1 className={classes.meal}>My meal</h1>
          <div className={classes.itemsContainer}>
            {
              this.props.allItemsInTheCart.map(({name,quantity,price},index)=>{
                return(
                  <div className={classes.items} key={index}>   
                   <div className={classes.itemDes}>
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
                  <div className={classes.itemPrice}><strong>{price} BDT</strong></div>
               </div>
                )
              })
            }

          </div>
          <h2 style={{margin: "3rem 0 .1rem 0"}}>Total Price : {this.props.allItemsInTheCart.reduce((total,itm)=>{
          return total+itm.price;
          },0)}</h2>
          <button className={classes.continue} onClick={this.handleContinue} >Continue</button>
        </div>
        :
        <h3 style={{textAlign:'center'}}>Please add burgers in the cart</h3>
        }
      </div>
      <CartModal on={this.state.toggle} closeCart={this.closeCart}/>
      {
        this.state.toggle?
        <button className={classes.viewCart} onClick={this.handleContinue}>Checkout</button>
        :<button className={classes.viewCart} onClick={this.cartToggle}>View Cart</button>
      }
    </div>
    )
  }
}

const mapStateToProps=(state,props)=>{
  let itm=state.adminReducer.allBurgers.find(itm=>props.match.params.id==itm.id);
  return{
    all_burgers:state.adminReducer.allBurgers,
    allItemsInTheCart:state.adminReducer.addedToCartItmsInfo,
    speceficItem:itm,
    totalItemsInTheCart:state.adminReducer.totalItemsInTheCart,
    priceList:state.adminReducer.price,
    id:state.authReducer.id
  }
}
export default connect(mapStateToProps)(SpecificBurger);

