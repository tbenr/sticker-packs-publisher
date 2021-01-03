import React from 'react';
import clsx from 'clsx';
import { Button, IconButton, Popover, Typography, Grid, Divider, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import useClipboard from "react-use-clipboard"
import useStyles from './styles'

import iconCopyClipboard from '../../images/iconCopyClipboard.svg'
import iconLogout from '../../images/iconLogout.svg'

export default function WalletStatus() {
    const { t } = useTranslation();
    const classes = useStyles();
    const context = useWeb3React<Web3Provider>()
    const { account, active, deactivate, error } = context
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [, setCopied] = useClipboard((account || ''));

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Button aria-describedby={id} className={classes.walletStatusButton} color="secondary" disableElevation onClick={handleClick}>
                <div className={clsx(classes.walletDot,
                    active ? classes.walletDotOK : error ? classes.walletDotError : classes.walletDotWarning)} />
                <Typography color="textPrimary">{account && (account.substring(0, 6) + '…' + account.substring(account.length - 4, account.length))}</Typography>
            </Button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                elevation={1}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >

                <Box className={classes.walletContainer}>
                    <Typography variant="caption" color="textSecondary">{t('wallet-status.connected-wallet')}</Typography>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Typography variant="body1" color="textPrimary">{account && (account.substring(0, 8) + '…' + account.substring(account.length - 6, account.length))}</Typography>
                        <IconButton color="primary" onClick={setCopied}><img src={iconCopyClipboard} alt="copy" /></IconButton>
                    </Grid>
                </Box>
                <Divider light />
                <Box className={classes.walletContainer}>
                    <></>
                    {(active || error) && (
                        <Button color="primary" disableElevation
                            onClick={() => {
                                deactivate()
                            }}>
                            <div className={classes.iconlogoutContainer}>
                                <img src={iconLogout} alt="copy" />
                            </div>
                            <Typography color="error">{t('wallet-status.logout')}</Typography></Button>
                    )}
                </Box>
            </Popover>
        </>)
}