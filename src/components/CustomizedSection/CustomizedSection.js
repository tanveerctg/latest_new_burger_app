import React from 'react';
import classes from './CustomizedSection.module.scss';
import {Link} from 'react-router-dom';
 const CustomizedSection =() =>{

    return (
      <section className={classes.customizeSection}>
      <div className={classes.row}>
      <div className={classes.customizeContainer}>
        <h1 className={classes.customizeBurgerMsg}>Wanna make your Own Burger??</h1>
        <Link to="burgerBuilder" style={{textDecoration:'none'}}><h1 className={classes.customizedBtn}>Check it Out</h1></Link>
      </div>
      </div>
    </section>
    )

}
export default CustomizedSection;
