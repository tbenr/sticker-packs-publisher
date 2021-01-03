import { withStyles } from '@material-ui/core/styles';
import { Card, Box, Paper, WithStyles } from '@material-ui/core';
import React, { Component } from 'react';
import {useFetchStickerPackSummary, useFetchPaymentData} from '../Web3/hooks'
import {useParams} from "react-router-dom";
  

interface ParamTypes {
    packId: string
  }

  export default function () {
    //const { t } = useTranslation();
    //const classes = useStyles();

    const { packId: packIdStr } = useParams<ParamTypes>();

    const packId = parseInt(packIdStr);

    const {loading, stickerPackSummary} = useFetchStickerPackSummary(packId)

    if(loading) return (<>...loading..</>)

  return (<Box display="flex" flexWrap="wrap">
        {stickerPackSummary?.stickers.map(({hash}) => <Card style={{width: '88px', height: '88px', margin: '6px', padding: '6px'}} key={hash}><img style={{width: '100%',objectFit: 'contain'}} src={`https://ipfs.io/ipfs/${hash}`}/></Card>)}
        </Box>)
  }