import DateTimeSupport from '../SupportTools/DateTimeSupport'
import isNil from 'lodash/isNil'


export default class FhirConstant {

    static FhirSpecReleasesWebsiteUrl = 'http://hl7.org/fhir/directory.html';

    static STU3_SpecWebsiteUrl = 'http://hl7.org/fhir/STU3';
    static STU3_SpecWebsiteDisplay = 'FHIR April 2017 V3.0.1 specification';

    static R4_SpecWebsiteUrl = 'http://hl7.org/fhir/2018Sep/index.html';
    static R4_SpecWebsiteDisplay = 'FHIR Sept 2018 V3.5.0 specification';

    static fhirNetApiGitHubUrl = 'https://github.com/ewoutkramer/fhir-net-api';

    static DefaultFhirXmlFormat = 'application/fhir+xml';
    static DefaultFhirJsonFormat = 'application/fhir+json';

    static OperationOutcomeResourceName = 'OperationOutcome';
    static BundleResourceName = 'Bundle';

    static PostRequestHeaders = [
        { name: 'Content-Type', value: FhirConstant.DefaultFhirJsonFormat, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
        { name: 'Accept', value: FhirConstant.DefaultFhirJsonFormat, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
        { name: 'If-None-Exist', value: '[search parameters]', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#ccreate` }
    ];

    static PutRequestHeaders = [
        { name: 'Content-Type', value: FhirConstant.DefaultFhirJsonFormat, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
        { name: 'Accept', value: FhirConstant.DefaultFhirJsonFormat, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
    ];

    static postResponseHeaders(EndpointUrl, ResourceName, ResourceId, LastModified, Version) {
        let _Version = '1';
        if (!isNil(Version)) {
            _Version = Version;
        }

        return [
            { name: 'Content-Type', value: 'NotSet', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
            { name: 'ETag', value: `W/"${_Version}"`, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#versioning` },
            { name: 'Last-Modified', value: DateTimeSupport.dateTimeHttpHeader(LastModified), moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#create` },
            { name: 'Location', value: `${EndpointUrl}/${ResourceName}/${ResourceId}`, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#create` }
        ];
    }

    static responseOperationOutcomeHeaders() {
        return [
            { name: 'Content-Type', value: 'NotSet', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
        ];
    }

    static responseGoneHeaders(Version) {
        if (!isNil(Version)) {
            return [
                { name: 'Content-Type', value: 'NotSet', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
                { name: 'ETag', value: `W/"${Version}"`, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#versioning` },
            ];
        } else {
            return [
                { name: 'Content-Type', value: 'NotSet', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
            ];
        }
    }

    static responseNoContentHeaders(Version) {
        if (!isNil(Version)) {
            return [
                { name: 'Content-Type', value: 'NotSet', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
                { name: 'ETag', value: `W/"${Version}"`, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#versioning` },
            ];
        } else {
            return [
                { name: 'Content-Type', value: 'NotSet', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
            ];
        }
    }

    static getResponseSearchHeaders() {
        return [
            { name: 'Content-Type', value: 'NotSet', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
        ];
    }

    static GetRequestHeaders = [
        { name: 'Accept', value: FhirConstant.DefaultFhirJsonFormat, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
    ];

    static DeleteRequestHeaders = [
        { name: 'Accept', value: FhirConstant.DefaultFhirJsonFormat, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
    ];

    static GetRequestByIdHeaders = [
        { name: 'Accept', value: FhirConstant.DefaultFhirJsonFormat, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
        { name: 'If-Modified-Since', value: 'Wed, 21 Oct 2015 07:28:00 GMT', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#cread` },
        { name: 'If-None-Match', value: 'W/"5"', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#ccread` }
    ];

    static GetRequestVReadHeaders = [
        { name: 'Accept', value: FhirConstant.DefaultFhirJsonFormat, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` }
    ];

    static GetRequestVReadByVidHeaders = [
        { name: 'Accept', value: FhirConstant.DefaultFhirJsonFormat, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` }
    ];


    //DeviceType
    static searchType = {
        token: 'token',
        number: 'number',
        date: 'date',
        string: 'string',
        composite: 'composite',
        quantity: 'quantity',
        uri: 'uri',
        reference: 'reference',
        special: 'special'
    };

    static referenceType = {
        relative: 'relative',
        absolute: 'absolute',
        chained: 'chained'
    }

    static getColorForSearchType(searchType) {
        switch (searchType) {
            case this.searchType.token:
                return 'teal'
            case this.searchType.number:
                return 'brown'
            case this.searchType.date:
                return 'purple'
            case this.searchType.string:
                return 'blue'
            case this.searchType.composite:
                return 'black'
            case this.searchType.quantity:
                return 'violet'
            case this.searchType.uri:
                return 'pink'
            case this.searchType.reference:
                return 'orange'
            case this.searchType.special:
                return 'black'
            default:
                return 'black'
        }
    }


    //DeviceType
    static searchSummaryType = {
        none: 'none',
        true: 'true',
        text: 'text',
        data: 'data',
        count: 'count',
    };

    //SearchModifierValues
    static searchModifierOptions = {
        none: { key: 'none', text: 'None', value: 'none' },
        missing: { key: 'missing', text: 'Missing', value: 'missing' }
    }

    

    

}