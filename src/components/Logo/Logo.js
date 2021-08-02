import React from 'react';
import Logo from '../../assets/images/28.1 burger-logo.png';
import styles from './Logo.module.css';

const logo = (props) => (
    <div className={styles.Logo}>
        <img src={Logo} alt="Burgarita" />
    </div>
);

export default logo;