import { TransactionResponse } from '@ethersproject/providers';
import { Box, Paper, Card, Typography, CardContent, Grid } from '@material-ui/core';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NewStickerPackCard from '../NewStickerPackCard'
import StickerPackCard from '../StickerPackCard'
import { useStickerState } from '../Web3/context';
import {useFetchMyStickerPackIds} from '../Web3/hooks'

import useStyles from './styles'

function TopCard(props: any) {
    const classes = useStyles();
    return (
        <Card className={classes.tobBarCard} elevation={0}>
            <CardContent>
                <Typography variant="caption" color='textSecondary'>{props.label}</Typography>
                <div style={{ display: "flex" }}>
                    <Typography noWrap>{props.text}</Typography> {(props.snt && <Typography color="textSecondary" style={{ marginLeft: '8px' }}>SNT</Typography>)}
                </div>
            </CardContent>
        </Card>
    )
}

export default function () {
    const classes = useStyles();

    const { loading, myStickerPackIds } = useFetchMyStickerPackIds()
    const { PendingStickers } = useStickerState();

    if (loading) return (<>fetching stickers</>)

    return (
        <>
            {/* statistics not yet available
            <Grid className={classes.topBarContainer} container direction="row" justify="center" alignItems="center" spacing={2}>
                <Grid item>
                    <TopCard label={t('dashboard.sold-sticker')} text="120" />
                </Grid>
                <Grid item>
                    <TopCard label={t('dashboard.total-earnings')} text="3 400.7810" snt />
                </Grid>
                <Grid item>
                    <TopCard label={t('dashboard.contribution-to-status')} text="340.7876" snt />
                </Grid>
            </Grid>
            */}
            <Grid className={classes.stickerCardsContainer} container direction="row" alignContent="flex-start" justify="center" alignItems="flex-start" spacing={4}>
                {myStickerPackIds.map((packId) =>
                    <Grid key={packId} item>
                        <StickerPackCard packId={packId} />
                    </Grid>)}
                {PendingStickers.map(sticker =>
                    <Grid key={sticker.tx.hash} item>
                        <StickerPackCard preview={{
                            price: sticker.price,
                            author: sticker.author,
                            name: sticker.name,
                            thumbnail: sticker.thumbnail,
                            banner: sticker.banner
                        }}
                            pending={true} />
                    </Grid>
                )}
                <Grid item>
                    <NewStickerPackCard />
                </Grid>
            </Grid>
        </>
    )
}