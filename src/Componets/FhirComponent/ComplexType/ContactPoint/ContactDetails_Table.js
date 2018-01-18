import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy'

import isNil from 'lodash/isNil';
import { Table } from 'semantic-ui-react'

import ContactPoint_Row from './ContactPoint_Row'
// import ColorConstant from '../../../../Constants/ColorConstant'
import Expandable_Table from '../../../Reusable/Table/Expandable_Table';

class ContactDetails_Table extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        const renderTelcom = (Contact) => {
            if (isNil(Contact)) {
                return null
            }
            else {
                return (
                    map(orderBy(Contact, ['rank']), (telecom, key) => {
                        return (
                            <ContactPoint_Row
                                key={key}
                                system={telecom.system}
                                value={telecom.value}
                                use={telecom.use}
                                rank={telecom.rank}
                                period={telecom.period} />
                        )
                    })
                )
            }
        };

        const renderTableBody = (Expand) => {
            if (Expand) {
                if (!isNil(this.props.Telecom)) {
                    return (
                        <Table.Body>
                            {renderTelcom(this.props.Telecom)}
                        </Table.Body>
                    )
                }
            }
            return null;
        };


        if (isUndefined(this.props.Telecom)) {
            return null;
        } else {
            return (
                <Expandable_Table                    
                    tableHeadingIconType='teletype'
                    tableHeadingTitle={this.props.Name}                    
                    tableColorInverted={false}
                    tableRowsFunction={renderTableBody}
                    tableColorType='grey'
                />                
            )
        }
    }

}
//Type Checking
ContactDetails_Table.propTypes = {
    Telecom: PropTypes.array,
    Name: PropTypes.string,
}

export default ContactDetails_Table
