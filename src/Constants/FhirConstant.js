import DateTimeSupport from '../SupportTools/DateTimeSupport'

export default class FhirConstant {
    static STU3_SpecWebsiteUrl = 'http://hl7.org/fhir/STU3';
    static STU3_SpecWebsiteDisplay = 'FHIR April 2017 V3.0.1 specification';
    static fhirNetApiGitHubUrl = 'https://github.com/ewoutkramer/fhir-net-api';

    static DefaultFhirXmlFormat = 'application/fhir+xml';
    static DefaultFhirJsonFormat = 'application/fhir+json';

    static PostRequestHeaders = [
        { name: 'Content-Type', value: FhirConstant.DefaultFhirJsonFormat, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
        { name: 'Accept', value: FhirConstant.DefaultFhirJsonFormat, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
        { name: 'If-None-Exist', value: '[search parameters]', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#ccreate` }            
    ];

    static postResponseHeaders(EndpointUrl, ResourceName, ResourceId, LastModified) {
        return [
            { name: 'Content-Type', value: 'NotSet', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
            { name: 'ETag', value: 'W/"1"', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#versioning` },
            { name: 'Last-Modified', value: DateTimeSupport.dateTimeHttpHeader(LastModified), moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#create` },
            { name: 'Location', value: `${EndpointUrl}/${ResourceName}/${ResourceId}`, moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#create` }
        ];
    }    

    static responseOperationOutcomeHeaders() {
        return [
            { name: 'Content-Type', value: 'NotSet', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },
        ];
    }   

    static getResponseSearchHeaders() {
        return [
            { name: 'Content-Type', value: 'NotSet', moreInfo: `${FhirConstant.STU3_SpecWebsiteUrl}/http.html#mime-type` },           
        ];
    }  

    static GetRequestHeaders = [        
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

}