import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className = { styles.NavigationItems }>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        { props.authenticated ? 
            <NavigationItem link="/logout">Log Out</NavigationItem> : 
            <NavigationItem link="/auth">Authenticate</NavigationItem>
        }
    </ul>   
);

export default navigationItems;