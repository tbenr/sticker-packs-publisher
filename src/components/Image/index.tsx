import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import iconRemove from '../../images/iconRemove.svg';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

type IProps = {
    style: CSSProperties,
    ipfs?: string,
    src?: string,
    removable?: boolean,
    hide?: boolean,
    loading?: boolean, //controls loading state from parent (uploading?)
    loadingStyle?: 'circle' | 'skeleton',
    onRemove?: () => void,
    onError?: () => void,
    onLoad?: () => void,
}

export default function Image(props: IProps) {
    const { ipfs,
        src,
        removable = false,
        onRemove,
        onError,
        loading: uploading = false,
        onLoad,
        style,
        hide = false,
        loadingStyle = 'circle'} = props;
    const { t } = useTranslation();
    const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [showRemoveIcon, setShowRemoveIcon] = useState(false);

    const showSpinner = imageStatus === 'loading' || uploading;
    const renderImg = !uploading && (ipfs || src);

    return (
        <div style={{ position: 'relative', display: hide ? 'none' : undefined}}
            onMouseDown={() => { setShowRemoveIcon(false) }}
            onClick={(e) => { e.stopPropagation() }}
            onMouseEnter={() => { setShowRemoveIcon(true) }}
            onMouseLeave={() => { setShowRemoveIcon(false) }}>
            {showSpinner && loadingStyle === 'circle' &&
                <CircularProgress color='secondary' />
            }
            {showSpinner && loadingStyle === 'skeleton' &&
                <Skeleton variant='rect' animation="wave" style={style}/>
            }
            {renderImg && imageStatus !== 'error' &&
                <img style={{
                    objectFit: 'contain',
                    display: imageStatus !== 'loaded' ? 'none' : 'block',
                    ...style
                }}
                    draggable='false'
                    src={ipfs ? `https://ipfs.io/ipfs/${ipfs}` : src}
                    onLoadStart={() => { setImageStatus("loading") }}
                    onLoad={() => { setImageStatus("loaded"); if(onLoad) onLoad() }}
                    onError={() => { onError ? onError() : setImageStatus("error") }} />}
            {renderImg && imageStatus === 'error' &&
                <Box
                    width={style.width}
                    height={style.height}
                    border={1}
                    borderRadius={style.borderRadius}
                    borderColor={theme.palette.error.main}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Typography align="center" color="error">
                        {t(ipfs ? 'error-loading-img-ipfs' : 'error-loading-img')}
                    </Typography>
                </Box>}
            {(imageStatus === 'loaded' || imageStatus === 'error') && removable &&
                <img src={iconRemove}
                    style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        display: showRemoveIcon ? '' : 'none'
                    }}
                    draggable='false'
                    onClick={(e) => { e.stopPropagation(); if (onRemove) onRemove() }}
                    onMouseDown={(e) => { e.stopPropagation() }}
                />}
        </div>
    )
}