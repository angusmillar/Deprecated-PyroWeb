import React from 'react';
import AppActionsMetadata from 'Actions/AppActionsMetadata';
import AppStoreMetadata from 'Store/AppStoreMetadata';
import AppConstants from 'Constants/AppConstants';
import MetadataHeader from './MetadataHeader';
import PropTypes from 'prop-types';
import { Icon, Divider, Container, Header, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

function getItemsState() {
    return {
        MetadataState: AppStoreMetadata.getState()
    };
}

class MetadataComponent extends React.Component {
    constructor(props) {
        super(props);
        this.initialise();
        this.state = getItemsState();
        this._onChange = this._onChange.bind(this);
    }

    getInitialState() {
        return getItemsState();
    }

    componentDidMount() {
        AppStoreMetadata.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStoreMetadata.removeChangeListener(this._onChange);
    }

    initialise() {
        //AppActionsMetadata.initialiseStore();
        AppActionsMetadata.getMetadata()
    }

    handleClickGetMetadata() {
        AppActionsMetadata.getMetadata();
    }

    _onChange() {
        this.setState(getItemsState());
    }

    conformanceStatement() {
        if (this.state.MetadataState.AjaxState === AppConstants.AjaxState.Call_None) {
            return null;
        }
        else if (this.state.MetadataState.AjaxState === AppConstants.AjaxState.Call_Pending) {
            return (
                <div>
                    <Segment>
                        <Dimmer active inverted>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>
                        <Image src={this.props.wireframeParagraphImage} />
                    </Segment>
                </div>
            );
        }
        else if (this.state.MetadataState.AjaxState === AppConstants.AjaxState.Call_Complete) {
            if (typeof (this.state.MetadataState.Resource) != 'undefined' && this.state.MetadataState.Resource != null) {
                return <MetadataHeader
                    Date={this.state.MetadataState.Resource.date}
                    Name={this.state.MetadataState.Resource.name}
                    Version={this.state.MetadataState.Resource.version}
                    FhirVersion={this.state.MetadataState.Resource.fhirVersion}
                    Publisher={this.state.MetadataState.Resource.publisher}
                    Description={this.state.MetadataState.Resource.description}
                    Status={this.state.MetadataState.Resource.status}
                    Experimental={this.state.MetadataState.Resource.experimental}
                    Url={this.state.MetadataState.Resource.url}
                    Purpose={this.state.MetadataState.Resource.purpose}
                    Copyright={this.state.MetadataState.Resource.copyright}
                    Kind={this.state.MetadataState.Resource.kind}
                    Contact={this.state.MetadataState.Resource.contact}>
                </MetadataHeader>
            }
            else {
                return <h2>Error in loading</h2>
            }
        }
    }

    render() {
        //const items = this.state.appState;


        return (
            <Container text style={{ marginTop: '7em' }}>
                {/* <Button positive onClick={this.handleClickGetMetadata} >Load Conformance Statment</Button>                 */}
                <div>
                    <Divider hidden />
                    <Header as='h2'>
                        <Icon name='settings' />
                        <Header.Content>
                            FHIR Server Conformance Statement
                    </Header.Content>
                    </Header>
                    <Segment raised padded >
                        {this.conformanceStatement()}
                    </Segment>
                </div>
            </Container>
        )
    }

}
//Type Checking
MetadataComponent.propTypes = {
    wireframeParagraphImage: PropTypes.string,
}

MetadataComponent.defaultProps = {
    wireframeParagraphImage: require('../../Images/wireframe/paragraph.png')
}

export default MetadataComponent;  