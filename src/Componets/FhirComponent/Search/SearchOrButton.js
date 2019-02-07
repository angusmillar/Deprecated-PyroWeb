import React from 'react';

import { Button, Icon } from 'semantic-ui-react'

import isNil from 'lodash/isNil';
import PropTypes from 'prop-types';

export default class SearchOrButton extends React.Component {

    static propTypes = {
        isDisable: PropTypes.bool,
        id: PropTypes.string,
        onOrAdd: PropTypes.func,
        onOrRemove: PropTypes.func,
    }

    static defaultProps = {
        isDisable: false,
        id: '',
    }

    constructor(props) {
        super(props);

    }

    onOrAdd = (e) => {
        e.preventDefault();
        this.props.onOrAdd({
            eventId: this.props.id,
        })
    }

    onOrRemove = (e) => {
        e.preventDefault();
        this.props.onOrRemove({
            eventId: this.props.id,
        })
    }

    render() {

        const renderAddOrButton = () => {
            return <Button key='green' disabled={this.props.isDisable} onClick={this.onOrAdd} size='mini' icon color='green' type='submit'><Icon name='add' />{' '}OR</Button>
        }

        const renderRemoveOrButton = () => {
            return <Button key='red' disabled={this.props.isDisable} onClick={this.onOrRemove} size='mini' icon color='red' type='submit'><Icon name='remove' />{' '}OR</Button>
        }

        //only render the button is there is an event listening for it.
        const renderButtons = () => {
            if (!isNil(this.props.onOrAdd) && !isNil(this.props.onOrRemove)) {
                return (
                    <React.Fragment>
                        {renderAddOrButton()}
                        {renderRemoveOrButton()}
                    </React.Fragment>
                )
            } else if (!isNil(this.props.onOrAdd)) {
                return renderAddOrButton()
            } else if (!isNil(this.props.onOrRemove)) {
                return renderRemoveOrButton()
            }
        }

        return (
            <Button.Group size='mini' >
                {renderButtons()}
            </Button.Group >
        )
    }

}
