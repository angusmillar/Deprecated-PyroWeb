
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

    static _getBundelXmlResource(ResourceName, ResourceId) {
        const LastUpdatedDateTime = moment().subtract(7, 'days');
        return FhirResourceExampleGenerator.getXmlResource(ResourceName, ResourceId, '1', LastUpdatedDateTime);
    }

    static _getBundelJsonResource(ResourceName, ResourceId) {
        const LastUpdatedDateTime = moment().subtract(7, 'days');
        return FhirResourceExampleGenerator.getJsonResource(ResourceName, ResourceId, '1', LastUpdatedDateTime);
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
        const ResourceOne = FhirResourceExampleGenerator._getBundelXmlResource(ResourceName, ResourceOneGuid);

        const ResourceTwoGuid = UuidSupport.createGUID();
        const ResourceTwo = FhirResourceExampleGenerator._getBundelXmlResource(ResourceName, ResourceTwoGuid);

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
        codeString = codeString.concat('    "div": "<div xmlns=\\"http:\\/\\/www.w3.org\\/1999\\/xhtml\\">\r      <ul>\r      <li>This is not a valid ${ResourceName} resource.<\\/li>\r      <li>It is only a bare bones example<\\/li>\r      <li>Please refer to the FHIR Specification<\\/li>\r      <li>for valid examples.<\\/li>\r      <li>A website link is provided above<\\/li>\r      <\\/ul>\r<\\/div>"\n');
        codeString = codeString.concat('  }\n');
        codeString = codeString.concat('}');

        return codeString;
    }

    static getJsonSearchBundleResource(ResourceName) {
        let codeString = '';
        //80 Charaters
        // codeString = codeString.concat('12345678901234567890123456789012345678901234567890123456789012345678901234567890\n');        

        const ResourceOneGuid = UuidSupport.createGUID();
        const ResourceOne = FhirResourceExampleGenerator._getBundelJsonResource(ResourceName, ResourceOneGuid);

        const ResourceTwoGuid = UuidSupport.createGUID();
        const ResourceTwo = FhirResourceExampleGenerator._getBundelJsonResource(ResourceName, ResourceTwoGuid);

        codeString = codeString.concat('{\n');
        codeString = codeString.concat('    "resourceType": "Bundle",\n');
        codeString = codeString.concat('    "type": "searchset",\n');
        codeString = codeString.concat('    "total": 163,\n');
        codeString = codeString.concat('    "link": [\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "relation": "first",\n');
        codeString = codeString.concat('            "url": "https://pyrohealth.net/test/stu3/fhir/Patient?page=1"\n');
        codeString = codeString.concat('        },\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "relation": "last",\n');
        codeString = codeString.concat('            "url": "https://pyrohealth.net/test/stu3/fhir/Patient?page=4"\n');
        codeString = codeString.concat('        },\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "relation": "next",\n');
        codeString = codeString.concat('            "url": "https://pyrohealth.net/test/stu3/fhir/Patient?page=2"\n');
        codeString = codeString.concat('        },\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "relation": "self",\n');
        codeString = codeString.concat('            "url": "https://pyrohealth.net/test/stu3/fhir/Patient"\n');
        codeString = codeString.concat('        }\n');
        codeString = codeString.concat('    ],\n');
        codeString = codeString.concat('    "entry": [\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "fullUrl": "https://pyrohealth.net/test/stu3/fhir/Patient/IHIStatusExample",\n');
        codeString = codeString.concat('            "resource": {\n');
        codeString = codeString.concat(`${FhirResourceExampleGenerator._padBundelResource(ResourceOne, 16)}`);
        codeString = codeString.concat('            },\n');
        codeString = codeString.concat('            "search": {\n');
        codeString = codeString.concat('                "mode": "match"\n');
        codeString = codeString.concat('            }\n');
        codeString = codeString.concat('        },\n');
        codeString = codeString.concat('        {\n');
        codeString = codeString.concat('            "fullUrl": "https://pyrohealth.net/test/stu3/fhir/Patient/PrincessOfPop",\n');
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

}
