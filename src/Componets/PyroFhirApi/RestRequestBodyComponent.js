import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'
import isNil from 'lodash/isNil';
import map from 'lodash/map';

import Expandable_Table from '../Reusable/Table/Expandable_Table'
// import FhirConstant from '../../Constants/FhirConstant';

class RestRequestBodyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        // const renderSubHeading = () => {
        //     return (
        //         <Table.Row>
        //             <Table.HeaderCell colSpan='1' width='4'>Name</Table.HeaderCell>
        //             <Table.HeaderCell colSpan='1' width='8'>Value</Table.HeaderCell>
        //             <Table.HeaderCell colSpan='1' width='4'>More Info</Table.HeaderCell>
        //         </Table.Row>
        //     )
        // };

        const renderParameterRows = () => {
            return (
                <Table.Body>
                    <Table.Row colSpan='3'>
                        <Table.Cell colSpan='1' width='16' verticalAlign='top'>
                            <p>The {this.props.resourceName} resource that needs to be added to the FHIR server</p>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row colSpan='3'>
                        <Table.Cell colSpan='1' width='4' verticalAlign='top'>
                            <p>Body</p>
                        </Table.Cell>
                        <Table.Cell colSpan='2' width='12' verticalAlign='top' >
                            <p>The Resource</p>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            )

        };

        const renderParametersRowsBody = (Expand) => {
            if (Expand) {
                return renderParameterRows()                 
            } else {
                return null;
            }
        };

        return (
            <Expandable_Table
                tableHeadingTitle='Body'
                tableHeadingIconType='code'
                // tableSubHeadingComponent={renderSubHeading}
                tableRowsFunction={renderParametersRowsBody}
                tableColorType={this.props.color}
            />
        )

    }
}

RestRequestBodyComponent.propTypes = {
    resourceName: PropTypes.string.isRequired,
    color: PropTypes.string,
}

export default RestRequestBodyComponent;  
