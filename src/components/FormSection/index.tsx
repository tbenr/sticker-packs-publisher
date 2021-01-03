import { withStyles } from '@material-ui/core/styles';
import { Box, Card, Typography, WithStyles } from '@material-ui/core';
import React, { Component } from 'react';
import clsx from 'clsx';
import styles from './styles';

interface IProps extends WithStyles<typeof styles> {
    children: any
    classes: any
    className?: any
    index: number
    title: string
}

export default withStyles(styles, { withTheme: true })(class extends Component<IProps> {
    render() {
        const { classes, className } = this.props;
        return (
            <Card className={clsx(classes.formSectionContainer, className)} elevation={0}>
                <Box display="flex" flexDirection="column"  width="100%">
                    <Box display="flex" alignItems="center">
                        <div className={classes.cardHeadingSticker}>
                        <Typography color="inherit">{this.props.index}</Typography>
                        </div>
                        <Box flexGrow={1}>
                        <Typography gutterBottom={false}>{this.props.title}</Typography>
                        </Box>
                    </Box>
                <Box flexGrow={1} display="flex" justifyContent="center" marginTop="24px">
                {this.props.children}
                </Box>
                </Box>
            </Card>)
    }
})