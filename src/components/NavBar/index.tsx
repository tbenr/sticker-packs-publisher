import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, AppBar, Grid, Container } from '@material-ui/core';
import useStyles from './styles';

import logo from '../../images/sickers_logo.svg';
import WalletStatus from '../WalletStatus'

export default function () {
    const { t } = useTranslation();
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