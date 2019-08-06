import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Footer.module.scss';

 const Footer =() =>{

    return (
      <footer className={classes.footerSection}>
      <div className={classes.row}>
        <div className={classes.footer}>
          <div className={classes.footerText}>
            <h3>Burger's Territory</h3>
            <p>All rights reserved by Burgers Territory &copy; 2019</p>
          </div>
          <div className={classes.footerSocialSec}>
            <h4>Share This Site</h4>
            <div className={classes.footerSocial}>
              <FontAwesomeIcon
                icon={['fab','google']}
                className={classes.google_icon}
                transform="grow-4" 

              />
              <FontAwesomeIcon
                icon={['fab','facebook']}
                className={classes.fb_icon}
                transform="grow-4"
              />
                <FontAwesomeIcon
                icon={['fab','twitter']}
                className={classes.twitter_icon}
               transform="grow-4"  
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
    )

}
export default Footer;
