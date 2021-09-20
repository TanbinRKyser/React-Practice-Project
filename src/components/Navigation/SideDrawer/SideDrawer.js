import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
   
    let attachedClasses = [styles.SideDrawer, styles.Close];
    
    if(props.open){
        attachedClasses = [styles.SideDrawer,styles.Open];
    }

    return (
       <Aux>
            <Backdrop 
                show={props.open} 
                clicked={props.close}/>
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems authenticated={ props.authenticated }/>
                </nav>
            </div>
       </Aux>
        
    );
}

export default sideDrawer;