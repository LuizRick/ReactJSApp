import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import LeftmenuItems from "./LeftMenuItems";

const styles = theme =>  ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

class TopBar extends Component {
    state = {
        showDrawer: false
    }

    constructor(props){
        super(props);
        console.log(props);
    }

    toggleDrawer = () => {
        this.setState({
            showDrawer: !this.state.showDrawer
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} id="topbar">
                <Drawer open={this.state.showDrawer} onClose={this.toggleDrawer}>
                    <LeftmenuItems />
                </Drawer>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon onClick={this.toggleDrawer} />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Navigation
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
};


export default withStyles(styles)(TopBar);