import React from 'react';
import classes from './Menu.module.scss';
import beef from './beef.png';
import jr from './j.png';
import salad from './salad.png';
import cheese from './cheese.png';
import chicken from './chicken.png';
const Menu=(props)=>{

  const clickedType =(itemName)=>{

    props.history.push(`menuitem/${itemName}`)
  }

  return(
  <React.Fragment>
    <h1 style={{textAlign:'center',background:'#a6cb12',padding:'5px',color:'ghostWhite',fontFamily: 'Anton',letterSpacing:'.04ch',textTransform:'uppercase'}}>Menu</h1>
    <section className={classes.allBurgersSection} >
      <div className={classes.row}>
          <div className={classes.all_burgers}>
            <div className={classes.burger}  style={{cursor:'pointer'}} >
              <img src={beef} className={classes.burgerTypes__burgerImage} val="beef" onClick={(e)=>{clickedType(e.target.attributes.val.nodeValue)}}/>
              <h2 className={classes.burgerName} style={{textAlign:'center'}}>Beef</h2>
            </div>

            <div className={classes.burger}  style={{cursor:'pointer'}}>
              <img src={jr} className={classes.burgerTypes__burgerImage} val="jr meals" onClick={(e)=>{clickedType(e.target.attributes.val.nodeValue)}}/>
              <h2 className={classes.burgerName} style={{textAlign:'center'}}>JR &trade; MEALS</h2>
            </div>

            <div className={classes.burger}  style={{cursor:'pointer'}}>
              <img src={salad} className={classes.burgerTypes__burgerImage} val="salad" onClick={(e)=>{clickedType(e.target.attributes.val.nodeValue)}}/>
              <h2 className={classes.burgerName} style={{textAlign:'center'}}>Salad and Veggies</h2>
            </div>

            <div className={classes.burger}  style={{cursor:'pointer'}}>
              <img src={cheese} className={classes.burgerTypes__burgerImage} val="cheese" onClick={(e)=>{clickedType(e.target.attributes.val.nodeValue)}}/>
              <h2 className={classes.burgerName} style={{textAlign:'center'}}>Cheese</h2>
            </div>

            <div className={classes.burger}  style={{cursor:'pointer'}}>
              <img src={chicken} className={classes.burgerTypes__burgerImage} val="chicken" onClick={(e)=>{clickedType(e.target.attributes.val.nodeValue)}}/>
              <h2 className={classes.burgerName} style={{textAlign:'center'}}>CHICKEN</h2>
            </div>
          </div>
        </div>
    </section>
    </React.Fragment>
  )
}
export default Menu;
