import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react'
import moment from 'moment';
import isUndefined from 'lodash/isUndefined';

import Period_Popup from './Period_Popup';

class Period_Label extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const avaliableToContactRange = (Start, End) => {
            if (moment().isBetween(Start, End)) {
               return avaliable
            } else {
                return unavailable                
            }
        };

        const avaliableToContactStart = (Start) => {
            if (moment().isAfter(Start)){
                return avaliable
             } else {
                 return unavailable                
             }
        };

        const avaliableToContactEnd = (End) => {
            if (moment().isBefore(End)){
                return avaliable
             } else {
                 return unavailable                
             }
        };

        const avaliable = { color: 'green', text: 'Avaliable' }
        const unavailable = { color: 'red', text: 'Unavailable' }
        


        if (isUndefined(this.props.start) && isUndefined(this.props.end)) {
            return null
        } else {
            let IsAvailable = null;            
            if (!isUndefined(this.props.start) && !isUndefined(this.props.end)) {
                IsAvailable = avaliableToContactRange(this.props.start, this.props.end);                                
                return (
                    <Period_Popup
                        triggerComponent={<Label size='mini'color={IsAvailable.color} content={IsAvailable.text} />}
                        start={this.props.start}
                        end={this.props.end} />
                )
                
            } else if (!isUndefined(this.props.start)) {
                IsAvailable = avaliableToContactStart(this.props.start);                
                return (
                    <Period_Popup
                        triggerComponent={<Label size='mini'color={IsAvailable.color} content={IsAvailable.text} />}
                        start={this.props.start} />
                )
                
            } else if (!isUndefined(this.props.end)) {
                IsAvailable = avaliableToContactEnd(this.props.end);                
                return (
                    <Period_Popup
                        triggerComponent={<Label size='mini'color={IsAvailable.color} content={IsAvailable.text} />}
                        end={this.props.end} />
                )
            }
            
        }
    }
}

Period_Label.propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
}

export default Period_Label;  
