import React from 'react';
import styles from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
    <li className={styles.NavigationItem}>
            <NavLink 
                to={props.link}
                activeClassName={styles.active}
                exact = {props.exact}> { props.children } </NavLink>
    </li>
);

export default navigationItem;