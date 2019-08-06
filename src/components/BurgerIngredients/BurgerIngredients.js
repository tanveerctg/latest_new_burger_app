import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './BurgerIngredients.module.scss';
import { Scrollbars } from 'react-custom-scrollbars';

const BurgerIngredients=(props)=>{
  const container=[];
  for(let item in props.layers){
    const itemName=item;
    const numberOfItem=props.layers[item]; 

    for(let i=0;i<numberOfItem;i++){
      container.push(itemName);
    }
  }

  return(
    <div className={classes.BurgerContainer}>
      <div className={classes.Burger}>
      <Scrollbars>
        <BurgerIngredient  type='BreadTop'/>
          {props.totalPrice !==10 ? container.map((item,index)=><BurgerIngredient key={index} type={item}/>):<p style={{textAlign:'center',margin: 0,fontWeight:'700'}}>Add your items</p> }
      
        <BurgerIngredient  type='BreadBottom'/>
        </Scrollbars>
      </div>

    </div>
    
    
  )
};
export default BurgerIngredients;