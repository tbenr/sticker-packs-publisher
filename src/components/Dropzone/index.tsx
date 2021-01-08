import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import theme from '../../theme';
import useStylesCommon from '../../common/styles';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { ReactComponent as IconUpload } from '../../images/iconUpload.svg';


interface MyDropzoneProps {
    onDrop: (arg0: any) => Promise<any>,
    dropLabel: string,
    draggingLabel: string,
    disabled?: boolean | false,
    multiple?: boolean | false,
    width?: number | string | "100%",
    height?: number | string | "100%",
}

export default function MyDropzone(
    props: React.PropsWithChildren<MyDropzoneProps>
) {
    const classes = useStylesCommon();

    const { multiple, onDrop, disabled, children, dropLabel, draggingLabel, width, height  } = props;
    const dropzoneprops: DropzoneOptions = { onDrop, disabled, multiple }

    const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneprops)

    return (
        <Box position="relative" height={height} width={width} style={{ outline: 'none' }} {...getRootProps()}>
            <input {...getInputProps()} />
            <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center" >
                {children !== undefined && children}
                {!children &&
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <div className={classes.iconContainer}>
                                <IconUpload fill={theme.palette.primary.main} />
                            </div>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" color="primary">{dropLabel}</Typography>
                        </Grid>
                    </Grid>
                }
            </Box>
            {isDragActive &&
                <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center" className={classes.dropover}>
                    <Typography variant="subtitle2" color="primary">{draggingLabel}</Typography>
                </Box>}
        </Box>
    )
}