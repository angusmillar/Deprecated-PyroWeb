import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Grid } from 'semantic-ui-react'
import DateTimeSupport from '../../../SupportTools/DateTimeSupport'
import isUndefined from 'lodash/isUndefined';


class Period_Popup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       
        const dateTimeFormated = (Value) => {
            return (
                Value &&
                //No time-zone showen as this converts to there local time
                DateTimeSupport.dateTimeLocal(Value)                
            )
        };

        const popItStartAndEnd = (start, end) => {
            return (<div>
                <Grid centered columns={16}>
                    <Grid.Column width={7} textAlign='left'>
                        <p>{dateTimeFormated(start)}</p>
                    </Grid.Column>
                    <Grid.Column width={2} textAlign='center'>
                        <b><p> to </p></b>
                    </Grid.Column>
                    <Grid.Column width={7} textAlign='left'>
                        <p>{dateTimeFormated(end)}</p>
                    </Grid.Column>
                </Grid>
            </div>
            )
        }

        const popItStart = (start) => {
            return (<div>
                <Grid centered columns={16}>
                    <Grid.Column width={3} textAlign='left'>
                        <b><p> Start: </p></b>
                    </Grid.Column>
                    <Grid.Column width={13} textAlign='center'>
                        <p>{dateTimeFormated(start)}</p>
                    </Grid.Column>
                </Grid>
            </div>
            )
        }

        const popItEnd = (end) => {
            return (<div>
                <Grid centered columns={16}>
                    <Grid.Column width={3} textAlign='left'>
                        <b><p> End: </p></b>
                    </Grid.Column>
                    <Grid.Column width={13} textAlign='center'>
                        <p>{dateTimeFormated(end)}</p>
                    </Grid.Column>
                </Grid>
            </div>
            )
        }

        if (isUndefined(this.props.triggerComponent)) {
            return null
        } else if (isUndefined(this.props.start) && isUndefined(this.props.end)) {
            return null
        } else {
            let PopUpText = null;
            if (!isUndefined(this.props.start) && !isUndefined(this.props.end)) {
                PopUpText = popItStartAndEnd(this.props.start, this.props.end)
            } else if (!isUndefined(this.props.start)) {
                PopUpText = popItStart(this.props.start)
            } else if (!isUndefined(this.props.end)) {
                PopUpText = popItEnd(this.props.end)
            }
            return (
                <Popup
                    trigger={this.props.triggerComponent}
                    content={PopUpText}
                    size='small'
                />

            )
        }
    }
}

Period_Popup.propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
    triggerComponent: PropTypes.object.isRequired
}

export default Period_Popup;  
