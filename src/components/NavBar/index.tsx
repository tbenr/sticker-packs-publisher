import { AppBar, Divider, Grid } from '@material-ui/core';
import React from 'react';
import logo from '../../images/sickers_logo.svg';
import WalletStatus from '../WalletStatus';
import useStyles from './styles';


export default function NavBar() {
    const classes = useStyles();

    return (
        <AppBar color="transparent" position="static" elevation={0}>
            <Grid container className={classes.toolbarGrid}
                alignItems="stretch"
                direction="row"
            >
                <Grid item xs={4}>
                    <div className={classes.toolbarNavButtonContainer}></div>
                </Grid>
                <Grid item xs={4}>
                    <img src={logo} className={classes.toolbarLogo} alt="logo" />
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.toolbarWalletStatusContainer}>
                        <WalletStatus />
                    </div>
                </Grid>
            </Grid>
            <Divider light />
        </AppBar>
    )
}