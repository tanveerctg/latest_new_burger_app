import React from 'react';
import classes from './BurgerIngredient.module.scss';

const BurgerIngredient=(props)=>{

  let ingredient;

  switch(props.type){
    case('BreadTop'):
    ingredient=<div className={classes.BreadTop}>
                  <div className={classes.Seeds1}></div>
                  <div className={classes.Seeds2}></div>
               </div>
    break;
    case('Salad'):
      ingredient=<div className={classes.Salad}></div>
      break;
    case('Cheese'):
      ingredient=<div className={classes.Cheese}></div>
      break;
    case('Meat'):
      ingredient=<div className={classes.Meat}></div>
      break;
    case('Chicken'):
      ingredient=<div className={classes.Chicken}></div>
      break;
    case('BreadBottom'):
      ingredient=<div className={classes.BreadBottom}></div>
      break;
    default:
      ingredient=null;
  }
  return ingredient;
}
;

export default BurgerIngredient;