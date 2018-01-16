import React from 'react';

// import { Icon, Divider, Container, Header, Segment } from 'semantic-ui-react'

import MetadataHeader from './MetadataHeader';
import PropTypes from 'prop-types';

export default class PyroServerConformanceStatmentComponent extends React.Component {

    static propTypes = {
        ConformanceStatmentResource: PropTypes.object.isRequired,
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }

    render() {
        const FhirResource = this.props.ConformanceStatmentResource;
        return <MetadataHeader
            Date={FhirResource.date}
            Name={FhirResource.name}
            Version={FhirResource.version}
            FhirVersion={FhirResource.fhirVersion}
            Publisher={FhirResource.publisher}
            Description={FhirResource.description}
            Status={FhirResource.status}
            Experimental={FhirResource.experimental}
            Url={FhirResource.url}
            Purpose={FhirResource.purpose}
            Copyright={FhirResource.copyright}
            Kind={FhirResource.kind}
            AcceptUnknown={FhirResource.acceptUnknown}
            Contact={FhirResource.contact}
            Jurisdiction={FhirResource.jurisdiction}
            Software={FhirResource.software}
            Implementation={FhirResource.implementation}
            Format={FhirResource.format}
            Rest={FhirResource.rest}>
        </MetadataHeader>
    }

}
