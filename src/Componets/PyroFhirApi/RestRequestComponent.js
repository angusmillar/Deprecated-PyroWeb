import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'

import RestParametersComponent from './RestParametersComponent'
import RestHttpHeadersComponent from './RestHttpHeadersComponent'
import Expandable_Table from '../Reusable/Table/Expandable_Table'

class RestRequestComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const renderHttpHeaders = () => {
            if (this.props.httpHeaders.length != 0) {
                return (
                    <Table.Row >
                        <Table.Cell colSpan='3' width='16' verticalAlign='top'>
                            <RestHttpHeadersComponent httpHeaders={this.props.httpHeaders} color={this.props.color} />
                        </Table.Cell>
                    </Table.Row>
                )
            } else {
                return null;
            }

        };

        const renderParametersRowsBody = (Expand) => {
            if (Expand) {
                return (
                    <Table.Body>
                        {renderHttpHeaders()}
                        <Table.Row >
                            <Table.Cell colSpan='3' width='16' verticalAlign='top'>
                                <RestParametersComponent parameters={this.props.searchParameters} color={this.props.color} />
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                )
            } else {
                return null;
            }
        };

        return (
            <Expandable_Table
                tableHeadingTitle='Requests'
                tableHeadingIconType='cloud upload'
                tableRowsFunction={renderParametersRowsBody}
                tableColorType={this.props.color}
            />


        )
    }
}

RestRequestComponent.propTypes = {
    searchParameters: PropTypes.array,
    color: PropTypes.string.isRequired,
    httpHeaders: PropTypes.array.isRequired
}

RestRequestComponent.defaultProps = {
    wireframeParagraphImage: require('../../Images/wireframe/paragraph.png'),        
}

export default RestRequestComponent;  
