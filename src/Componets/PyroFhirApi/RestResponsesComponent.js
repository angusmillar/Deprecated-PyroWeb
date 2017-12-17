import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'
// import isNil from 'lodash/isNil';
// import map from 'lodash/map';

// import FhirConstant from '../../Constants/FhirConstant';
import Expandable_Table from '../Reusable/Table/Expandable_Table'

class RestResponsesComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const renderSubHeading = () => {
            return (
                <Table.Row>
                    <Table.HeaderCell colSpan='1' width='4'>Code</Table.HeaderCell>
                    <Table.HeaderCell colSpan='2' width='12'>Description</Table.HeaderCell>
                </Table.Row>
            )
        };

        const renderParameterRows = () => {
            const HttpCodeOk = '200 (Ok)'
            const HeaderETagExample = 'W/"[resource version]"'
            const HeaderLastModifiedExample = 'Wed, 21 Oct 2015 07:28:00 GMT'
            
            return (
                <Table.Row key='1'>
                    <Table.Cell width='4' verticalAlign='top'>
                        <span><code>{HttpCodeOk}</code></span>
                    </Table.Cell>
                    <Table.Cell width='12' verticalAlign='top' >
                        Headers <br />
                        <code><b>ETag: </b>{HeaderETagExample}</code><br />
                        <code><b>LastModified: </b>{HeaderLastModifiedExample}</code>
                    </Table.Cell>
                </Table.Row>
            )
        };

        const renderParametersRowsBody = (Expand) => {
            if (Expand) {
                return (
                    <Table.Body>
                        {renderParameterRows()}
                    </Table.Body>
                )
            } else {
                return null;
            }
        };

        return (
            <Expandable_Table
                tableHeadingTitle='Responses'
                tableHeadingIconType='cloud download'
                tableSubHeadingComponent={renderSubHeading}
                tableRowsFunction={renderParametersRowsBody}
                tableColorType={this.props.color}
            />


        )
    }
}

// Headers Returned
// ETag: W/"3141"
// LastModified: Wed, 21 Oct 2015 07:28:00 GMT
// Location: https://pyrohealth.net/test/stu3/fhir/Patient/FCC-PAT-00001
// Content-Type: application/fhir+xml; charset=utf-8

RestResponsesComponent.propTypes = {
    // parameters: PropTypes.array.isRequired,
    color: PropTypes.string,
}

export default RestResponsesComponent;  
