import React,{Component} from 'react';
import Aux from '../../HOC/helper';
import classes from './HamburgerIcon.module.scss';

class  HamburgerIcon extends Component{

   hamBurgerController=()=>{
    this.props.hamburgerToggle();
   }

  render(){
    let itemName=[];
    
    if(this.props.on){
      itemName.push(classes.menu_btn +' '+ classes.close);
    }else{
      itemName.push(classes.menu_btn);   
    }
    return(
      <Aux>
        <div className={this.props.on?itemName.join(''):itemName.join('')} onClick={this.hamBurgerController}>
          <span className={!this.props.on?null:'a'}>&nbsp;</span>
          <span >&nbsp;</span>
          <span >&nbsp;</span>
        </div>
      </Aux>
    )
  }

};

export default HamburgerIcon;