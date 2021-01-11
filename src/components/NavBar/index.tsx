import { AppBar, Button, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import logo from '../../images/sickers_logo.svg';
import { useHistory, useLocation } from 'react-router-dom';
import WalletStatus from '../WalletStatus';
import useStyles from './styles';

import { ReactComponent as IconNavBarPlus } from '../../images/iconNavBarPlus.svg';
import { ReactComponent as IconNavBarBack } from '../../images/iconNavBarBack.svg';
import { useTranslation } from 'react-i18next';

export default function NavBar() {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const { t } = useTranslation()

    let leftButton: 'new' | 'back'

    if(location.pathname.startsWith('/dashboard/')) {
        leftButton = 'new'
    } else {
        leftButton = 'back'
    }

    return (
        <AppBar color="transparent" position="static" elevation={0}>
            <Grid container className={classes.toolbarGrid}
                alignItems="stretch"
                direction="row"
            >
                <Grid item xs={4}>
                    <div className={classes.toolbarNavButtonContainer}>
                    {leftButton === 'new' &&
                    <Button variant="text" color="primary" disableElevation onClick={()=>history.push('/new/')}>
                        <IconNavBarPlus style={{marginRight: 6}}/>
                        <Typography color="inherit">{t('new-sticker-pack')}</Typography>
                    </Button>
                    }
                    {leftButton === 'back' &&
                    <Button variant="text" color="primary" disableElevation onClick={()=>history.push('/dashboard/')}>
                        <IconNavBarBack style={{marginRight: 6}}/>
                        <Typography color="inherit">{t('back-to-dashboard')}</Typography>
                    </Button>
                    }
                    </div>
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