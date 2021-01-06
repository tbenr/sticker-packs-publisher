import React, { useState } from 'react';
import { CircularProgress, StandardProps } from '@material-ui/core';
//import { Skeleton } from '@material-ui/lab';

import iconRemove from '../../images/iconRemove.svg';

type IProps = {
    width: number,
    height: number,
    borderRadius: number,
    ipfs?: string,
    src?: string,
    //skeletonVariant?: 'rect' | 'text' | 'circle',
    removable?: boolean | false,
    uploading?: boolean | false, //controls loading state from parent (uploading?)
    onRemove?: () => void;
}

export default function (props: IProps) {
    const { ipfs, src, removable, width, height, onRemove, borderRadius, uploading} = props;
    const [imageStatus, setImageStatus] = useState<'loading'|'loaded'|'error'>('loading');
    const [showRemoveIcon, setShowRemoveIcon] = useState(false);
 
    const showSpinner = imageStatus === 'loading' || uploading;
    const renderImg = !uploading && (ipfs || src);

    return (
        <div style={{ position: 'relative' }}
            onMouseDown={()=>{console.log('div');setShowRemoveIcon(false)}}
            onClick={(e)=> { e.stopPropagation()}}
            onMouseEnter={() => { setShowRemoveIcon(true) }}
            onMouseLeave={() => { setShowRemoveIcon(false) }}>
            {showSpinner &&  <CircularProgress color='secondary'/> 
            ////<Skeleton variant={skeletonVariant} width={width} height={height} />
            }
            {renderImg &&
                <img style={{
                    width: width,
                    height: height,
                    borderRadius: borderRadius,
                    objectFit: 'contain',
                    display: imageStatus !== 'loaded' ? 'none' : ''
                }}
                    draggable='false'
                    src={ipfs ? `https://ipfs.io/ipfs/${ipfs}` : src}
                    onLoadStart={() => { setImageStatus("loading") }}
                    onLoad={() => { setImageStatus("loaded") }}
                    onError={() => { setImageStatus("error") }}/>}
            {imageStatus === 'loaded' && removable &&
                <img src={iconRemove}
                    style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        display: showRemoveIcon ? '' : 'none'
                    }}
                    draggable='false'
                    onClick={(e) => { e.stopPropagation(); if (onRemove) onRemove() }}
                    onMouseDown={(e)=>{ e.stopPropagation() }}
                />}
        </div>
    )
}