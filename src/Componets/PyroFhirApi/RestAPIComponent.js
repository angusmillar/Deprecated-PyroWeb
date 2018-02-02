import React from 'react';
import PropTypes from 'prop-types';

import { Segment, Divider, Header, Grid, Popup, Icon, Label, Transition } from 'semantic-ui-react'

import RestGetSearchComponent from './RestGetSearchComponent'
import RestGetByIdComponent from './RestGetByIdComponent'
import RestGetVReadComponent from './RestGetVReadComponent'
import RestGetVReadByVidComponent from './RestGetVReadByVidComponent'
import RestPostComponent from './RestPostComponent'
import RestPutByIdComponent from './RestPutByIdComponent'
import RestPutBySearchComponent from './RestPutBySearchComponent'
import RestDeleteByIdComponent from './RestDeleteByIdComponent'
import RestDeleteBySearchComponent from './RestDeleteBySearchComponent'

import FhirConstant from '../../Constants/FhirConstant';
import WebLink from '../../Componets/Reusable/WebLink/WebLink';

export default class RestAPIComponent extends React.Component {

    static propTypes = {
        resource: PropTypes.object.isRequired,
        endpointUrl: PropTypes.string.isRequired,
        selectedContentType: PropTypes.string.isRequired,
        contentTypeElement: PropTypes.element.isRequired,
        acceptElement: PropTypes.element.isRequired,
        acceptResponseElement: PropTypes.element.isRequired,
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.state = { animation: 'jiggle', duration: 800, visible: true, expand: false, expandIconType: 'plus square outline', active: false };
    }

    mouseOverExpandEvent = () => {
        this.setState({ visible: !this.state.visible, rowActive: !this.state.active })
    }

    mouseOutRowEvent = () => {
        this.setState({ active: !this.state.active })
    }

    onClickExpand = () => {
        if (this.state.expand) {
            this.setState({ expand: false, expandIconType: 'plus square outline' })
        }
        else {
            this.setState({ expand: true, expandIconType: 'minus square outline' })
        }
    }

    render() {
        const _resourceName = this.props.resource.type;

        const renderExpanded = () => {
            if (!this.state.expand) {
                return null;
            } else {
                const _searchParameters = this.props.resource.searchParam;

                return (
                    <div>
                        <Divider />
                        <RestGetSearchComponent
                            resourceName={_resourceName}
                            endpointUrl={this.props.endpointUrl}
                            searchParameters={_searchParameters}
                            contentTypeElement={this.props.contentTypeElement}
                            acceptElement={this.props.acceptElement}
                            acceptResponseElement={this.props.acceptResponseElement}
                        />
                        <Divider />
                        <RestGetByIdComponent
                            resourceName={_resourceName}
                            endpointUrl={this.props.endpointUrl}
                            contentTypeElement={this.props.contentTypeElement}
                            acceptElement={this.props.acceptElement}
                            acceptResponseElement={this.props.acceptResponseElement}
                        />
                        <Divider />
                        <RestGetVReadComponent
                            resourceName={_resourceName}
                            endpointUrl={this.props.endpointUrl}
                            contentTypeElement={this.props.contentTypeElement}
                            acceptElement={this.props.acceptElement}
                            acceptResponseElement={this.props.acceptResponseElement}
                        />
                        <Divider />
                        <RestGetVReadByVidComponent
                            resourceName={_resourceName}
                            endpointUrl={this.props.endpointUrl}
                            contentTypeElement={this.props.contentTypeElement}
                            acceptElement={this.props.acceptElement}
                            acceptResponseElement={this.props.acceptResponseElement}
                        />
                        <Divider />

                        <RestPostComponent
                            resourceName={_resourceName}
                            endpointUrl={this.props.endpointUrl}
                            searchParameters={_searchParameters}
                            contentTypeElement={this.props.contentTypeElement}
                            acceptElement={this.props.acceptElement}
                            acceptResponseElement={this.props.acceptResponseElement}
                        />

                        <Divider />
                        <RestPutBySearchComponent
                            resourceName={_resourceName}
                            endpointUrl={this.props.endpointUrl}
                            searchParameters={_searchParameters}
                            contentTypeElement={this.props.contentTypeElement}
                            acceptElement={this.props.acceptElement}
                            acceptResponseElement={this.props.acceptResponseElement}
                        />
                        <Divider />
                        <RestPutByIdComponent
                            resourceName={_resourceName}
                            endpointUrl={this.props.endpointUrl}
                            contentTypeElement={this.props.contentTypeElement}
                            acceptElement={this.props.acceptElement}
                            acceptResponseElement={this.props.acceptResponseElement}
                        />
                        <Divider />
                        <RestDeleteByIdComponent
                            resourceName={_resourceName}
                            endpointUrl={this.props.endpointUrl}
                            contentTypeElement={this.props.contentTypeElement}
                            acceptElement={this.props.acceptElement}
                            acceptResponseElement={this.props.acceptResponseElement}
                        />
                        <Divider />
                        <RestDeleteBySearchComponent
                            resourceName={_resourceName}
                            endpointUrl={this.props.endpointUrl}
                            searchParameters={_searchParameters}
                            contentTypeElement={this.props.contentTypeElement}
                            acceptElement={this.props.acceptElement}
                            acceptResponseElement={this.props.acceptResponseElement}
                        />
                    </div>
                )
            }
        }

        return (

            <div>

                <Segment color='grey' secondary={this.state.expand}  >
                    <Grid verticalAlign='middle'>
                        <Grid.Row column={7} only='computer'
                            onMouseOver={this.mouseOverExpandEvent}
                            onMouseOut={this.mouseOutRowEvent}
                            onClick={this.onClickExpand}>
                            <Grid.Column width={7}>
                                <Popup
                                    trigger={<Header size='medium'>{_resourceName}</Header>}
                                    flowing
                                    hoverable>
                                    <Grid centered columns={1}>
                                        <Grid.Column textAlign='left'>
                                            <span>
                                                <Icon name='cogs' />
                                                <WebLink url={`${FhirConstant.STU3_SpecWebsiteUrl}/${_resourceName}.html`} display={`Go-to FHIR Specification for the ${_resourceName} resource`} />
                                            </span>
                                        </Grid.Column>
                                    </Grid>
                                </Popup>
                            </Grid.Column>
                            {/* <Grid.Column width={7}>
                                <span>
                                    <Label size='tiny' color={'blue'}><code>{' '}</code></Label>
                                    <Label size='tiny' color={'green'}><code>{' '}</code></Label>
                                    <Label size='tiny' color={'orange'}><code>{' '}</code></Label>
                                    <Label size='tiny' color={'red'}><code>{' '}</code></Label> */}

                            {/* <Label horizontal color={'blue'}><code>{'GET'}</code></Label>
                                    <Label horizontal color={'green'}><code>{'POST'}</code></Label>
                                    <Label horizontal color={'orange'}><code>{'PUT'}</code></Label>
                                    <Label horizontal color={'red'}><code>{'DELETE'}</code></Label> */}
                            {/* </span>
                            </Grid.Column> */}
                            <Grid.Column width={9} floated='right' textAlign='right' verticalAlign='middle'>
                                <Label size='tiny' color={'blue'}><code>{' '}</code></Label>
                                <Label size='tiny' color={'green'}><code>{' '}</code></Label>
                                <Label size='tiny' color={'orange'}><code>{' '}</code></Label>
                                <Label size='tiny' color={'red'}><code>{' '}</code></Label>

                                <Transition animation={this.state.animation} duration={this.state.duration} visible={this.state.visible}>
                                    <Icon name={this.state.expandIconType} size='large' color='grey' />
                                </Transition>
                            </Grid.Column>
                        </Grid.Row>


                        <Grid.Row column={7} only='tablet'
                            onMouseOver={this.mouseOverExpandEvent}
                            onMouseOut={this.mouseOutRowEvent}
                            onClick={this.onClickExpand}>
                            <Grid.Column width={7}>
                                <Popup
                                    trigger={<Header size='medium' a='a' href={`${FhirConstant.STU3_SpecWebsiteUrl}/${_resourceName}.html`}>{_resourceName}</Header>}
                                    flowing
                                    hoverable>
                                    <Grid centered columns={1}>
                                        <Grid.Column textAlign='left'>
                                            <span>
                                                <Icon name='cogs' />
                                                <WebLink url={`${FhirConstant.STU3_SpecWebsiteUrl}/${_resourceName}.html`} display={`Go-to FHIR Specification for the ${_resourceName} resource`} />
                                            </span>
                                        </Grid.Column>
                                    </Grid>
                                </Popup>
                            </Grid.Column>
                            {/* <Grid.Column width={7}>
                                <span>
                                    <Label horizontal color={'blue'}><code>{' '}</code></Label>
                                    <Label horizontal color={'green'}><code>{' '}</code></Label>
                                    <Label horizontal color={'orange'}><code>{' '}</code></Label>
                                    <Label horizontal color={'red'}><code>{' '}</code></Label>
                                </span>
                            </Grid.Column> */}
                            <Grid.Column width={9} floated='right' textAlign='right' verticalAlign='middle'>
                                <Label size='tiny' color={'blue'}><code>{' '}</code></Label>
                                <Label size='tiny' color={'green'}><code>{' '}</code></Label>
                                <Label size='tiny' color={'orange'}><code>{' '}</code></Label>
                                <Label size='tiny' color={'red'}><code>{' '}</code></Label>

                                <Transition animation={this.state.animation} duration={this.state.duration} visible={this.state.visible}>
                                    <Icon name={this.state.expandIconType} size='large' color='grey' />
                                </Transition>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row column={16} only='mobile'
                            onMouseOver={this.mouseOverExpandEvent}
                            onMouseOut={this.mouseOutRowEvent}
                            onClick={this.onClickExpand}>
                            <Grid.Column width={8}>
                                <Popup
                                    trigger={<Header size='small' a='a' href={`${FhirConstant.STU3_SpecWebsiteUrl}/${_resourceName}.html`}>{_resourceName}</Header>}
                                    flowing
                                    hoverable>
                                    <Grid centered columns={1}>
                                        <Grid.Column textAlign='left'>
                                            <span>
                                                <Icon name='cogs' />
                                                <WebLink url={`${FhirConstant.STU3_SpecWebsiteUrl}/${_resourceName}.html`} display={`Go-to FHIR Specification for the ${_resourceName} resource`} />
                                            </span>
                                        </Grid.Column>
                                    </Grid>
                                </Popup>
                            </Grid.Column>
                            <Grid.Column width={2} floated='right' textAlign='left' >
                                <Transition animation={this.state.animation} duration={this.state.duration} visible={this.state.visible}>
                                    <Icon name={this.state.expandIconType} size='large' color='grey' />
                                </Transition>
                            </Grid.Column>
                            <Grid.Column width={7} >
                                <span>
                                    <Label size='tiny' color={'blue'}><code>{' '}</code></Label>
                                    <Label size='tiny' color={'green'}><code>{' '}</code></Label>
                                    <Label size='tiny' color={'orange'}><code>{' '}</code></Label>
                                    <Label size='tiny' color={'red'}><code>{' '}</code></Label>
                                </span>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                    {renderExpanded()}
                </Segment>
                <Divider hidden />
            </div >
        )
    }

}