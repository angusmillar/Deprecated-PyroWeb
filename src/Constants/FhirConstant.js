import DateTimeSupport from '../SupportTools/DateTimeSupport'

export default class FhirConstant {
    static STU3_SpecWebsite = 'http://hl7.org/fhir/STU3'

    static PostRequestHeaders = [
        { name: 'Content-Type', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` },
        { name: 'Accept', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` },
        { name: 'If-None-Exist', value: '[search parameters]', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#create` }            
    ];

    static postResponseHeaders(EndpointUrl, ResourceName) {
        return [
            { name: 'Content-Type', value: 'NotSet', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` },
            { name: 'ETag', value: 'W/"1"', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#versioning` },
            { name: 'Last-Modified', value: DateTimeSupport.NowdateTimeHttpHeader, moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#create` },
            { name: 'Location', value: `${EndpointUrl}/${ResourceName}/52044f9d-fe92-4163-8c5d-2a3f16ee7e7b`, moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#create` }
        ];
    }    

    static GetRequestHeaders = [        
        { name: 'Accept', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` },
    ];

    static GetRequestByIdHeaders = [        
        { name: 'Accept', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` },
        { name: 'If-Modified-Since', value: 'Wed, 21 Oct 2015 07:28:00 GMT', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#cread` },
        { name: 'If-None-Match', value: 'W/"5"', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#cread` }
    ];

    static GetRequestVReadHeaders = [        
        { name: 'Accept', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` }
    ];

    static GetRequestVReadByVidHeaders = [        
        { name: 'Accept', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` }
    ];

}