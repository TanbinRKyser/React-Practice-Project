import React,{Component} from 'react';
import { connect } from 'react-redux';

import Aux from "../Aux/Aux";
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class layout extends Component{ 
    
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer:false })
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer : !prevState.showSideDrawer }
        });
    }

    render(){
        return (
            <Aux>
                <Toolbar
                    authenticated = { this.props.isAuthenticated } 
                    drawerToggleClicked = { this.sideDrawerToggleHandler }/>
                <SideDrawer 
                    authenticated = { this.props.isAuthenticated }
                    open={ this.state.showSideDrawer } 
                    close={ this.sideDrawerClosedHandler }/>
                <main className = { classes.Content }>
                    { this.props.children }
                </main>
            </Aux>  
        ); 
    } 
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    };
}



export default connect( mapStateToProps )(layout);