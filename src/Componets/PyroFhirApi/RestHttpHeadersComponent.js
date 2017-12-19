import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'
import isNil from 'lodash/isNil';
import map from 'lodash/map';

import Expandable_Table from '../Reusable/Table/Expandable_Table'
import FhirConstant from '../../Constants/FhirConstant';

class RestHttpHeadersComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const renderSubHeading = () => {
            return (
                <Table.Row>
                    <Table.HeaderCell colSpan='1' width='4'>Name</Table.HeaderCell>
                    <Table.HeaderCell colSpan='1' width='8'>Value</Table.HeaderCell>
                    <Table.HeaderCell colSpan='1' width='4'>More Info</Table.HeaderCell>
                </Table.Row>
            )
        };

        const renderParameterRows = () => {
            if (isNil(this.props.httpHeaders)) {
                return null;
            } else {
                return (
                    map(this.props.httpHeaders, (Header, Index) => {
                        const name = Header.name;
                        const value = Header.value;                        
                        return (
                            <Table.Row colSpan='3' key={Index}>
                                <Table.Cell colSpan='1' width='4' verticalAlign='top'>
                                    <p>{name}:</p>
                                </Table.Cell>
                                <Table.Cell colSpan='1' width='8' verticalAlign='top' >
                                    <p>{value}</p>
                                </Table.Cell>
                                <Table.Cell colSpan='1' width='4' verticalAlign='top' >
                                  <p><a as='a' href={Header.moreInfo} rel="noopener noreferrer" target='_blank'>More Info</a></p>
                                </Table.Cell>
                            </Table.Row>
                        )
                    }
                    )
                )
            }
        };

        const renderParametersRowsBody = (Expand) => {
            if (isNil(this.props.httpHeaders)) {
                return null;
            } else {
                if (Expand) {
                    return (
                        <Table.Body>
                            {renderParameterRows()}
                        </Table.Body>
                    )
                } else {
                    return null;
                }
            }
        };

        return (
            <Expandable_Table
                tableHeadingTitle='Headers'
                tableHeadingIconType='h'
                tableSubHeadingComponent={renderSubHeading}
                tableRowsFunction={renderParametersRowsBody}
                tableColorType={this.props.color}
            />
        )

    }
}

RestHttpHeadersComponent.propTypes = {
    httpHeaders: PropTypes.array.isRequired,
    color: PropTypes.string,
}

export default RestHttpHeadersComponent;  
