
import isNil from 'lodash/isNil';
import split from 'lodash/split';
import map from 'lodash/map';
import repeat from 'lodash/repeat';
import moment from 'moment'
import DateTimeSupport from '../../SupportTools/DateTimeSupport'
import UuidSupport from '../../SupportTools/UuidSupport'

export default class FhirResourceExampleGenerator {
    constructor() {
    }

    static getXmlResource(ResourceName, ResourceId, ResourceVersion, LastUpdatedDateTime) {
        let codeString = '';
        //80 Charaters
        // codeString = codeString.concat('12345678901234567890123456789012345678901234567890123456789012345678901234567890\n');        
        codeString = codeString.concat(`<${ResourceName} xmlns="http://hl7.org/fhir">\n`);
        if (!isNil(ResourceId)) {
            codeString = codeString.concat(`  <id value="${ResourceId}"/>\n`);
        }

        if (!isNil(ResourceVersion) && !isNil(LastUpdatedDateTime)) {
            codeString = codeString.concat('  <meta>\n');
            codeString = codeString.concat(`    <versionId value="${ResourceVersion}" />\n`);
            codeString = codeString.concat(`    <lastUpdated value="${DateTimeSupport.dateTimeFhirMilliSec(LastUpdatedDateTime)}" />\n`);
            codeString = codeString.concat('  </meta>\n');
        }

        codeString = codeString.concat('  <text>\n');
        codeString = codeString.concat('    <status value="generated"/>\n');
        codeString = codeString.concat('    <div xmlns="http://www.w3.org/1999/xhtml">\n');
        codeString = codeString.concat('      <ul>\n');
        codeString = codeString.concat(`        <li>This is not a valid ${ResourceName} resource.</li>\n`);
        codeString = codeString.concat('        <li>It is only a bare bones example.</li>\n');
        codeString = codeString.concat('        <li>Please refer to the FHIR Specification</li>\n');
        codeString = codeString.concat('        <li>for valid examples.</li>\n');
        codeString = codeString.concat('        <li>A website link is provided above</li>\n');
        codeString = codeString.concat('      </ul>\n');
        codeString = codeString.concat('    </div>\n');
        codeString = codeString.concat('  </text>\n');
        codeString = codeString.concat(`<${ResourceName}>`);
        return codeString;
    }

    static _getBundelXmlResource(ResourceName, ResourceId, ResourceVersion, ResourceLastUpdated) {        
        return FhirResourceExampleGenerator.getXmlResource(ResourceName, ResourceId, ResourceVersion, ResourceLastUpdated);
    }

    static _getBundelJsonResource(ResourceName, ResourceId, ResourceVersion, ResourceLastUpdated) {        
        return FhirResourceExampleGenerator.getJsonResource(ResourceName, ResourceId, ResourceVersion, ResourceLastUpdated);
    }

    static _padBundelResource(Resource, Amount) {
        const ResourceSpilt = split(Resource, '\n');
        const Padded = map(ResourceSpilt, (FormatRow) => {            
            return `${repeat(' ',Amount)}${FormatRow}\n`;
        })
        return Padded.join('');
    }

    static getXmlSearchBundleResource(ResourceName) {
        let codeString = '';
        //80 Charaters
        // codeString = codeString.concat('12345678901234567890123456789012345678901234567890123456789012345678901234567890\n');        

        const ResourceOneGuid = UuidSupport.createGUID();
        const ResourceOneVersion = '1';
        const ResourceOneLastUpdatedDateTime = moment().subtract(7, 'days');
        const ResourceOne = FhirResourceExampleGenerator._getBundelXmlResource(ResourceName, ResourceOneGuid, ResourceOneVersion, ResourceOneLastUpdatedDateTime);

        const ResourceTwoGuid = UuidSupport.createGUID();
        const ResourceTwoVersion = '1';
        const ResourceTwoLastUpdatedDateTime = moment().subtract(14, 'days');
        const ResourceTwo = FhirResourceExampleGenerator._getBundelXmlResource(ResourceName, ResourceTwoGuid, ResourceTwoVersion, ResourceTwoLastUpdatedDateTime);

        codeString = codeString.concat('<Bundle xmlns="http://hl7.org/fhir">\n');
        codeString = codeString.concat('    <type value="searchset" />\n');
        codeString = codeString.concat('    <total value="2" />\n');
        codeString = codeString.concat('    <link>\n');
        codeString = codeString.concat('        <relation value="first" />\n');
        codeString = codeString.concat(`        <url value="https://pyrohealth.net/test/stu3/fhir/${ResourceName}?page=1" />\n`);
        codeString = codeString.concat('    </link>\n');
        codeString = codeString.concat('    <link>\n');
        codeString = codeString.concat('        <relation value="last" />\n');
        codeString = codeString.concat(`        <url value="https://pyrohealth.net/test/stu3/fhir/${ResourceName}?page=1" />\n`);
        codeString = codeString.concat('    </link>\n');
        codeString = codeString.concat('    <link>\n');
        codeString = codeString.concat('        <relation value="next" />\n');
        codeString = codeString.concat(`        <url value="https://pyrohealth.net/test/stu3/fhir/${ResourceName}?page=1" />\n`);
        codeString = codeString.concat('    </link>\n');
        codeString = codeString.concat('    <link>\n');
        codeString = codeString.concat('        <relation value="self" />\n');
        codeString = codeString.concat(`        <url value="https://pyrohealth.net/test/stu3/fhir/${ResourceName}" />\n`);
        codeString = codeString.concat('    </link>\n');
        codeString = codeString.concat('    <entry>\n');
        codeString = codeString.concat(`        <fullUrl value="https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${ResourceOneGuid}" />\n`);
        codeString = codeString.concat('        <resource>\n');

        codeString = codeString.concat(`${FhirResourceExampleGenerator._padBundelResource(ResourceOne, 10)}`);

        codeString = codeString.concat('        </resource>\n');
        codeString = codeString.concat('        <search>\n');
        codeString = codeString.concat('            <mode value="match" />\n');
        codeString = codeString.concat('        </search>\n');
        codeString = codeString.concat('    </entry>\n');
        codeString = codeString.concat('    <entry>\n');
        codeString = codeString.concat(`        <fullUrl value="https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${ResourceTwoGuid}" />\n`);
        codeString = codeString.concat('        <resource>\n');

        codeString = codeString.concat(`${FhirResourceExampleGenerator._padBundelResource(ResourceTwo, 10)}`);

        codeString = codeString.concat('        </resource>\n');
        codeString = codeString.concat('        <search>\n');
        codeString = codeString.concat('            <mode value="match" />\n');
        codeString = codeString.concat('        </search>\n');
        codeString = codeString.concat('    </entry>\n');
        codeString = codeString.concat('</Bundle>\n');


        return codeString;
    }
   
    static getXmlHistoryBundleResource(ResourceName, GUID) {
        let codeString = '';
        //80 Charaters
        // codeString = codeString.concat('12345678901234567890123456789012345678901234567890123456789012345678901234567890\n');        

        const ResourceOneGuid = GUID;
        const ResourceOneVersion = '1';
        const ResourceOneLastUpdatedDateTime = moment().subtract(14, 'days');
        const ResourceOne = FhirResourceExampleGenerator._getBundelXmlResource(ResourceName, ResourceOneGuid, ResourceOneVersion, ResourceOneLastUpdatedDateTime);

        const ResourceTwoGuid = GUID;
        const ResourceTwoVersion = '2';
        const ResourceTwoLastUpdatedDateTime = moment().subtract(7, 'days');
        const ResourceTwo = FhirResourceExampleGenerator._getBundelXmlResource(ResourceName, ResourceTwoGuid, ResourceTwoVersion, ResourceTwoLastUpdatedDateTime);

        codeString = codeString.concat('<Bundle xmlns="http://hl7.org/fhir">\n');
        codeString = codeString.concat('    <type value="history" />\n');
        codeString = codeString.concat('    <total value="3" />\n');
        codeString = codeString.concat('    <link>\n');
        codeString = codeString.concat('        <relation value="first" />\n');
        codeString = codeString.concat(`        <url value="https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${GUID}/_history?page=1" />\n`);
        codeString = codeString.concat('    </link>\n');
        codeString = codeString.concat('    <link>\n');
        codeString = codeString.concat('        <relation value="last" />\n');
        codeString = codeString.concat(`        <url value="https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${GUID}/_history?page=1" />\n`);
        codeString = codeString.concat('    </link>\n');
        codeString = codeString.concat('    <link>\n');
        codeString = codeString.concat('        <relation value="next" />\n');
        codeString = codeString.concat(`        <url value="https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${GUID}/_history?page=1" />\n`);
        codeString = codeString.concat('    </link>\n');
        codeString = codeString.concat('    <link>\n');
        codeString = codeString.concat('        <relation value="self" />\n');
        codeString = codeString.concat(`        <url value="https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${GUID}/_history" />\n`);
        codeString = codeString.concat('    </link>\n');


        codeString = codeString.concat('    <entry>\n')
        codeString = codeString.concat(`        <fullUrl value="https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${GUID}/_history" />\n`)
        codeString = codeString.concat('        <request>\n')
        codeString = codeString.concat('            <method value="DELETE" />\n')
        codeString = codeString.concat(`            <url value="${ResourceName}/${GUID}/_history/3" />\n`)
        codeString = codeString.concat('        </request>\n')
        codeString = codeString.concat('    </entry>\n')

        codeString = codeString.concat('    <entry>\n');
        codeString = codeString.concat(`        <fullUrl value="https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${ResourceOneGuid}" />\n`);
        codeString = codeString.concat('        <resource>\n');
        
        codeString = codeString.concat(`${FhirResourceExampleGenerator._padBundelResource(ResourceTwo, 10)}`);

        codeString = codeString.concat('        </resource>\n');

        codeString = codeString.concat('        <request>\n')
        codeString = codeString.concat('          <method value="PUT" />\n')
        codeString = codeString.concat(`          <url value="${ResourceName}/${GUID}/_history/2" />\n`)
        codeString = codeString.concat('        </request>\n')

        codeString = codeString.concat('    </entry>\n');
        codeString = codeString.concat('    <entry>\n');
        codeString = codeString.concat(`        <fullUrl value="https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${ResourceTwoGuid}" />\n`);
        codeString = codeString.concat('        <resource>\n');

        codeString = codeString.concat(`${FhirResourceExampleGenerator._padBundelResource(ResourceOne, 10)}`);

        codeString = codeString.concat('        </resource>\n');

        codeString = codeString.concat('        <request>\n')
        codeString = codeString.concat('          <method value="POST" />\n')
        codeString = codeString.concat(`          <url value="${ResourceName}/${GUID}/_history/1" />\n`)
        codeString = codeString.concat('        </request>\n')

        codeString = codeString.concat('    </entry>\n');
        codeString = codeString.concat('</Bundle>\n');


        return codeString;
    }


    static getXmlOperationOutcome() {
        let codeString = '';
        //80 Charaters
        // codeString = codeString.concat('12345678901234567890123456789012345678901234567890123456789012345678901234567890\n');        
        codeString = codeString.concat('<OperationOutcome xmlns="http://hl7.org/fhir">\n');
        codeString = codeString.concat('  <text>\n');
        codeString = codeString.concat('    <div xmlns="http://www.w3.org/1999/xhtml">\n');
        codeString = codeString.concat('      <div>\n');
        codeString = codeString.concat('        <h4>OperationOutcome Issue: 1</h4>\n');
        codeString = codeString.concat('        <table>\n');
        codeString = codeString.concat('          <tr>\n');
        codeString = codeString.concat('            <td>\n');
        codeString = codeString.concat('              <span>\n');
        codeString = codeString.concat('                <b>Severity: </b>\n');
        codeString = codeString.concat('              </span>\n');
        codeString = codeString.concat('            </td>\n');
        codeString = codeString.concat('            <td>\n');
        codeString = codeString.concat('              <span>error</span>\n');
        codeString = codeString.concat('            </td>\n');
        codeString = codeString.concat('          </tr>\n');
        codeString = codeString.concat('          <tr>\n');
        codeString = codeString.concat('            <td>\n');
        codeString = codeString.concat('              <span>\n');
        codeString = codeString.concat('                <b>Type: </b>\n');
        codeString = codeString.concat('              </span>\n');
        codeString = codeString.concat('            </td>\n');
        codeString = codeString.concat('            <td>\n');
        codeString = codeString.concat('              <span>exception</span>\n');
        codeString = codeString.concat('            </td>\n');
        codeString = codeString.concat('          </tr>\n');
        codeString = codeString.concat('          <tr>\n');
        codeString = codeString.concat('            <td>\n');
        codeString = codeString.concat('              <span>\n');
        codeString = codeString.concat('                <b>Detail Text: </b>\n');
        codeString = codeString.concat('              </span>\n');
        codeString = codeString.concat('            </td>\n');
        codeString = codeString.concat('            <td>\n');
        codeString = codeString.concat('              <span>Some error message abount the problem</span>\n');
        codeString = codeString.concat('            </td>\n');
        codeString = codeString.concat('          </tr>\n');
        codeString = codeString.concat('        </table>\n');
        codeString = codeString.concat('      </div>\n');
        codeString = codeString.concat('    </div>\n');
        codeString = codeString.concat('  </text>\n');
        codeString = codeString.concat('  <issue>\n');
        codeString = codeString.concat('    <severity value="error" />\n');
        codeString = codeString.concat('    <code value="exception" />\n');
        codeString = codeString.concat('    <details>\n');
        codeString = codeString.concat('      <text value="Some error message abount the problem" />\n');
        codeString = codeString.concat('    </details>\n');
        codeString = codeString.concat('  </issue>\n');
        codeString = codeString.concat('</OperationOutcome>\n');        

        return codeString;
    }

    


    static getJsonSearchBundleResource(ResourceName) {
        let codeString = '';
        //80 Charaters
        // codeString = codeString.concat('12345678901234567890123456789012345678901234567890123456789012345678901234567890\n');        

        const ResourceOneGuid = UuidSupport.createGUID();
        const ResourceOneVersion = '1';
        const ResourceOneLastUpdatedDateTime = moment().subtract(7, 'days');
        const ResourceOne = FhirResourceExampleGenerator._getBundelXmlResource(ResourceName, ResourceOneGuid, ResourceOneVersion, ResourceOneLastUpdatedDateTime);

        const ResourceTwoGuid = UuidSupport.createGUID();
        const ResourceTwoVersion = '1';
        const ResourceTwoLastUpdatedDateTime = moment().subtract(14, 'days');
        const ResourceTwo = FhirResourceExampleGenerator._getBundelXmlResource(ResourceName, ResourceTwoGuid, ResourceTwoVersion, ResourceTwoLastUpdatedDateTime);

        codeString = codeString.concat('{\n');
        codeString = codeString.concat('    "resourceType": "Bundle",\n');
        codeString = codeString.concat('    "type": "searchset",\n');
        codeString = codeString.concat('    "total": 2,\n');
        codeString = codeString.concat('    "link": [\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "relation": "first",\n');
        codeString = codeString.concat(`            "url": "https://pyrohealth.net/test/stu3/fhir/${ResourceName}?page=1"\n`);
        codeString = codeString.concat('        },\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "relation": "last",\n');
        codeString = codeString.concat(`            "url": "https://pyrohealth.net/test/stu3/fhir/${ResourceName}?page=4"\n`);
        codeString = codeString.concat('        },\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "relation": "next",\n');
        codeString = codeString.concat(`            "url": "https://pyrohealth.net/test/stu3/fhir/${ResourceName}?page=2"\n`);
        codeString = codeString.concat('        },\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "relation": "self",\n');
        codeString = codeString.concat(`            "url": "https://pyrohealth.net/test/stu3/fhir/${ResourceName}"\n`);
        codeString = codeString.concat('        }\n');
        codeString = codeString.concat('    ],\n');
        codeString = codeString.concat('    "entry": [\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat(`            "fullUrl": "https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${ResourceOneGuid}",\n`);
        codeString = codeString.concat('            "resource": {\n');
        codeString = codeString.concat(`${FhirResourceExampleGenerator._padBundelResource(ResourceOne, 16)}`);
        codeString = codeString.concat('            },\n');
        codeString = codeString.concat('            "search": {\n');
        codeString = codeString.concat('                "mode": "match"\n');
        codeString = codeString.concat('            }\n');
        codeString = codeString.concat('        },\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat(`            "fullUrl": "https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${ResourceTwoGuid}",\n`);
        codeString = codeString.concat('            "resource": {\n');
        codeString = codeString.concat(`${FhirResourceExampleGenerator._padBundelResource(ResourceTwo, 16)}`);
        codeString = codeString.concat('            },\n');
        codeString = codeString.concat('            "search": {\n');
        codeString = codeString.concat('                "mode": "match"\n');
        codeString = codeString.concat('            }\n');
        codeString = codeString.concat('        }\n');        
        codeString = codeString.concat('    ]\n');
        codeString = codeString.concat('}\n');

        return codeString;
    }

    static getJsonHistoryBundleResource(ResourceName, GUID) {
        let codeString = '';
        //80 Charaters
        // codeString = codeString.concat('12345678901234567890123456789012345678901234567890123456789012345678901234567890\n');        

        const ResourceOneGuid = GUID;
        const ResourceOneVersion = '1';
        const ResourceOneLastUpdatedDateTime = moment().subtract(14, 'days');
        const ResourceOne = FhirResourceExampleGenerator._getBundelXmlResource(ResourceName, ResourceOneGuid, ResourceOneVersion, ResourceOneLastUpdatedDateTime);

        const ResourceTwoGuid = GUID;
        const ResourceTwoVersion = '2';
        const ResourceTwoLastUpdatedDateTime = moment().subtract(7, 'days');
        const ResourceTwo = FhirResourceExampleGenerator._getBundelXmlResource(ResourceName, ResourceTwoGuid, ResourceTwoVersion, ResourceTwoLastUpdatedDateTime);

        codeString = codeString.concat('{\n');
        codeString = codeString.concat('    "resourceType": "Bundle",\n');
        codeString = codeString.concat('    "type": "history",\n');
        codeString = codeString.concat('    "total": 3,\n');
        codeString = codeString.concat('    "link": [\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "relation": "first",\n');
        codeString = codeString.concat(`            "url": "https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${GUID}/_history?page=1"\n`);
        codeString = codeString.concat('        },\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "relation": "last",\n');
        codeString = codeString.concat(`            "url": "https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${GUID}/_history?page=1"\n`);
        codeString = codeString.concat('        },\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "relation": "next",\n');
        codeString = codeString.concat(`            "url": "https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${GUID}/_history?page=1"\n`);
        codeString = codeString.concat('        },\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "relation": "self",\n');
        codeString = codeString.concat(`            "url": "https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${GUID}/_history"\n`);
        codeString = codeString.concat('        }\n');
        codeString = codeString.concat('    ],\n');
        codeString = codeString.concat('    "entry": [\n');

        codeString = codeString.concat('        {\n');
        codeString = codeString.concat(`            "fullUrl": "https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${GUID}",\n`);
        codeString = codeString.concat('            "request": {\n');
        codeString = codeString.concat('                "method": "DELETE",\n');
        codeString = codeString.concat(`                "url": "${ResourceName}/${GUID}/_history/3"\n`);
        codeString = codeString.concat('            }\n');
        codeString = codeString.concat('        },\n');

        codeString = codeString.concat('        {\n');
        codeString = codeString.concat(`            "fullUrl": "https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${GUID}",\n`);
        codeString = codeString.concat('            "resource": {\n');
        codeString = codeString.concat(`${FhirResourceExampleGenerator._padBundelResource(ResourceTwo, 16)}`);
        codeString = codeString.concat('            },\n');
        
        codeString = codeString.concat('            "request": {\n');
        codeString = codeString.concat('                "method": "PUT",\n');
        codeString = codeString.concat(`                "url": "${ResourceName}/${GUID}/_history/2"\n`);
        codeString = codeString.concat('            }\n');
                
        codeString = codeString.concat('        },\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat(`            "fullUrl": "https://pyrohealth.net/test/stu3/fhir/${ResourceName}/${GUID}",\n`);
        codeString = codeString.concat('            "resource": {\n');
        codeString = codeString.concat(`${FhirResourceExampleGenerator._padBundelResource(ResourceOne, 16)}`);
        codeString = codeString.concat('            },\n');
        
        codeString = codeString.concat('            "request": {\n');
        codeString = codeString.concat('                "method": "POST",\n');
        codeString = codeString.concat(`                "url": "${ResourceName}/${GUID}/_history/1"\n`);
        codeString = codeString.concat('            }\n');
    
        codeString = codeString.concat('        }\n');        
        codeString = codeString.concat('    ]\n');
        codeString = codeString.concat('}\n');

        return codeString;
    }


    static getJsonResource(ResourceName, ResourceId, ResourceVersion, LastUpdatedDateTime) {
        let codeString = '';
        codeString = codeString.concat('{\n');
        codeString = codeString.concat(`  "resourceType": "${ResourceName}",\n`);
        if (!isNil(ResourceId)) {
            codeString = codeString.concat(`  "id": "${ResourceId}",\n`);
        }

        if (!isNil(ResourceVersion) && !isNil(LastUpdatedDateTime)) {
            codeString = codeString.concat('  "meta": {\n');
            codeString = codeString.concat(`    "versionId": "${ResourceVersion}",\n`);
            codeString = codeString.concat(`    "lastUpdated": "${DateTimeSupport.dateTimeFhirMilliSec(LastUpdatedDateTime)}"\n`);
            codeString = codeString.concat('  },\n');
        }
        codeString = codeString.concat('  "text": {\n');
        codeString = codeString.concat('    "status": "generated",\n');
        codeString = codeString.concat('    "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">\\r      <ul>\\r      <li>This is not a valid ${ResourceName} resource.<\\/li>\\r      <li>It is only a bare bones example<\\/li>\\r      <li>Please refer to the FHIR Specification<\\/li>\\r      <li>for valid examples.<\\/li>\\r      <li>A website link is provided above<\\/li>\\r      <\\/ul>\\r<\\/div>"\n');
        codeString = codeString.concat('  }\n');
        codeString = codeString.concat('}');

        return codeString;
    }

    static getJsonOperationOutcome() {
        let codeString = '';
        //80 Charaters
        // codeString = codeString.concat('12345678901234567890123456789012345678901234567890123456789012345678901234567890\n');        
        codeString = codeString.concat('{\n');
        codeString = codeString.concat('    "resourceType": "OperationOutcome",\n');
        codeString = codeString.concat('    "text": {\n');
        codeString = codeString.concat('        "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">\\r\\n  <div>\\r\\n    <h4>OperationOutcome Issue: 1</h4>\\r\\n    <table>\\r\\n      <tr>\\r\\n        <td>\\r\\n          <span>\\r\\n            <b>Severity: </b>\\r\\n          </span>\\r\\n        </td>\\r\\n        <td>\\r\\n          <span>error</span>\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td>\\r\\n          <span>\\r\\n            <b>Type: </b>\\r\\n          </span>\\r\\n        </td>\\r\\n        <td>\\r\\n          <span>exception</span>\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td>\\r\\n          <span>\\r\\n            <b>Detail Text: </b>\\r\\n          </span>\\r\\n        </td>\\r\\n        <td>\\r\\n          <span>Some error message abount the problem</span>\\r\\n        </td>\\r\\n      </tr>\\r\\n    </table>\\r\\n  </div>\\r\\n</div>"\n');
        codeString = codeString.concat('    },\n');
        codeString = codeString.concat('    "issue": [\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "severity": "error",\n');
        codeString = codeString.concat('            "code": "exception",\n');
        codeString = codeString.concat('            "details": {\n');
        codeString = codeString.concat('                "text": "Some error message abount the problem"\n');
        codeString = codeString.concat('            }\n');
        codeString = codeString.concat('        }\n');
        codeString = codeString.concat('    ]\n');
        codeString = codeString.concat('}\n');

        return codeString;
    }
}
