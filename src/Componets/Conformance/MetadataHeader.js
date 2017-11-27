import React from 'react';
import PropTypes from 'prop-types';
//import { Header, Icon } from 'semantic-ui-react'
import { Header, Icon, List, Label, Segment } from 'semantic-ui-react'

class MetadataHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header as='h2'>
                    <Icon name='settings' />
                    <Header.Content>
                        FHIR Server Conformance Statement
                    </Header.Content>
                </Header>

                <Segment raised>
                    <Label as='a' color='blue' ribbon>Server</Label>
                    <span>{this.props.Name}</span>
                    <List divided selection>
                        <List.Item>
                            <Label color='teal' horizontal>Server Version</Label>
                            {this.props.Version}
                        </List.Item>
                        <List.Item>
                            <Label color='teal' horizontal>FHIR Version</Label>
                            {this.props.FhirVersion}
                        </List.Item>

                     </List>
                </Segment>
            </div>
        )
    }

}
//Type Checking
MetadataHeader.propTypes = {
    Name: PropTypes.string,
    Version: PropTypes.string,
    FhirVersion: PropTypes.string,
}

//Null Ref checking
MetadataHeader.propTypes = {
    Name: PropTypes.string.isRequired,
    Version: PropTypes.string.isRequired,
    FhirVersion: PropTypes.string.isRequired
}


export default MetadataHeader;  
