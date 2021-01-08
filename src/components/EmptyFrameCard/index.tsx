import { withStyles } from '@material-ui/core/styles';
import { Card, Paper, WithStyles } from '@material-ui/core';
import React, { Component } from 'react';
import clsx from 'clsx';
import styles from './styles';

interface IProps extends WithStyles<typeof styles> {
    children: any
    classes: any
    className?: any
}

export default withStyles(styles, { withTheme: true })(class extends Component<IProps> {
    render() {
        const { classes, className } = this.props;
        return (
            <Card className={clsx(classes.cardStyle, className)} elevation={0}>
                <Paper className={classes.innerFrame} elevation={0}>
                    {this.props.children}
                </Paper>
            </Card>)
    }
})