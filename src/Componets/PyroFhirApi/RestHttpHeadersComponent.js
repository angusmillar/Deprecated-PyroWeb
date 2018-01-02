import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'
import isNil from 'lodash/isNil';
import toLower from 'lodash/toLower';
import map from 'lodash/map';

import Expandable_Table from '../Reusable/Table/Expandable_Table'
// import FhirConstant from '../../Constants/FhirConstant';

export default class RestHttpHeadersComponent extends React.Component {

    static propTypes = {
        httpHeaders: PropTypes.array.isRequired,
        contentTypeElement: PropTypes.element, 
        acceptElement: PropTypes.element,
        color: PropTypes.string,
    }

    static defaultProps = {
    }

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
                        const dymamicValue = (Name, Value) => {
                            if (!isNil(this.props.contentTypeElement) && toLower(Name) === 'content-type') {
                                return this.props.contentTypeElement;
                            } else if (!isNil(this.props.acceptElement) && toLower(Name) === 'accept') {
                                return this.props.acceptElement;
                            } else {
                                return <p>{Value}</p>;
                            }                                                        
                        }

                        return (
                            <Table.Row colSpan='3' key={Index}>
                                <Table.Cell colSpan='1' width='4' verticalAlign='top'>
                                    <p>{name}:</p>
                                </Table.Cell>
                                <Table.Cell colSpan='1' width='8' verticalAlign='top' >
                                    {dymamicValue(name,value)}
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


