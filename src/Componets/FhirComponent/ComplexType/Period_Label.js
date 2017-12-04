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

        const avaliable = { color: 'olive', text: 'Avaliable' }
        const unavailable = { color: 'red', text: 'Unavailable' }
        


        if (isUndefined(this.props.period)) {
            return null
        } else {
            const start = this.props.period.start;
            const end = this.props.period.end;
            let IsAvailable = null;            
            if (!isUndefined(start) && !isUndefined(end)) {
                IsAvailable = avaliableToContactRange(start, end);                                
                return (
                    <Period_Popup
                        triggerComponent={<Label size='mini'color={IsAvailable.color} content={IsAvailable.text} />}
                        start={start}
                        end={end} />
                )
                
            } else if (!isUndefined(start)) {
                IsAvailable = avaliableToContactStart(start);                
                return (
                    <Period_Popup
                        triggerComponent={<Label size='mini'color={IsAvailable.color} content={IsAvailable.text} />}
                        start={start} />
                )
                
            } else if (!isUndefined(end)) {
                IsAvailable = avaliableToContactEnd(end);                
                return (
                    <Period_Popup
                        triggerComponent={<Label size='mini'color={IsAvailable.color} content={IsAvailable.text} />}
                        end={end} />
                )
            }
            
        }
    }
}

Period_Label.propTypes = {
    // start: PropTypes.string,
    // end: PropTypes.string,
    period: PropTypes.object
}

export default Period_Label;  
