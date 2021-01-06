import React from 'react';
import { IconButton, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useHistory } from "react-router-dom";

import useStylesCommon from '../../common/styles';
import useStyles from './styles';

import { ReactComponent as IconPlus } from '../../images/iconPlus.svg'

import EmptyFrame from '../EmptyFrameCard';
import theme from '../../theme';


export default function () {
    const { t } = useTranslation();
    const classes = useStyles();
    const commonClasses = useStylesCommon();

    const history = useHistory();
    return (
        <EmptyFrame className={classes.frameSize}>
            <Grid container direction="column" alignItems="center">
                <IconButton color="primary" onClick={() => history.push('/new/')}>
                    <Grid item>
                        <div className={commonClasses.iconContainer}>
                            <IconPlus fill={theme.palette.primary.main}/>
                        </div>
                    </Grid>
                </IconButton>
                <Grid item>
                    <Typography variant="subtitle2" color="primary">{t('new-sticker-pack')}</Typography>
                </Grid>
            </Grid>
        </EmptyFrame>
    )
}