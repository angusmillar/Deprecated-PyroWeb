
import isNil from 'lodash/isNil';
import DateTimeSupport from '../../SupportTools/DateTimeSupport'

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
        codeString = codeString.concat(`<${ResourceName}>\n`);  
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
        codeString = codeString.concat('}\n');
         
        return codeString;
    }
    
}
