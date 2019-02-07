import React from 'react';

import { Button, Icon, Grid } from 'semantic-ui-react'

import isNil from 'lodash/isNil';
import PropTypes from 'prop-types';


export default class AddRemoveParameterButton extends React.Component {

    static propTypes = {
        id: PropTypes.string,
        isDisable: PropTypes.bool,        
        onAddParameter: PropTypes.func,
        onRemoveParameter: PropTypes.func,
    }

    static defaultProps = {
        isDisable: false,
        id: '',
    }

    constructor(props) {
        super(props);

    }

    onAdd = (e) => {
        e.preventDefault();
        this.props.onAddParameter({
            eventId: this.props.id,
        })
    }

    onRemove = (e) => {
        e.preventDefault();
        this.props.onRemoveParameter({
            eventId: this.props.id,
        })
    }

    render() {

        const addButton = () => {
            if (isNil(this.props.onAddParameter)) {
                return null;
            } else {
                return (
                    <Grid.Row columns={16}>
                        <Button onClick={this.onAdd} size='small' icon color='green'><Icon name='add' /></Button>
                    </Grid.Row>
                )
            }
        };

        const removeButton = () => {
            if (isNil(this.props.onRemoveParameter)) {
                return null;
            } else {
                return (
                    <Grid.Row columns={16}>
                        <Button onClick={this.onRemove} size='small' icon color='red'><Icon name='remove' /></Button>
                    </Grid.Row>
                )
            }
        };

        if (isNil(this.props.onAddParameter) && isNil(this.props.onRemoveParameter)) {
            return null;
        } else {
            return (
                <Grid>
                    {addButton()}
                    {removeButton()}
                </Grid>
            )
        }
    }
}
