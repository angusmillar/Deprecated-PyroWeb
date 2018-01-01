
class FhirResourceExampleGenerator {
    constructor() {        
    }

    static getXmlResource(ResourceName) {
        let codeString = '';        
        //80 Charaters
        // codeString = codeString.concat('12345678901234567890123456789012345678901234567890123456789012345678901234567890\n');        
        codeString = codeString.concat(`<${ResourceName} xmlns="http://hl7.org/fhir">\n`);
        codeString = codeString.concat('  <id value="example"/>\n');
        codeString = codeString.concat('  <text>\n');
        codeString = codeString.concat('    <status value="generated"/>\n');
        codeString = codeString.concat('    <div xmlns="http://www.w3.org/1999/xhtml">\n');
        codeString = codeString.concat('      <ul>\n');
        codeString = codeString.concat(`      <li>This is not a valid ${ResourceName} resource.</li>\n`);
        codeString = codeString.concat('      <li>It is only a bare bones examplesdfsff f sdfdfsd ffdsfdsfdsf ds fdsfds fds fdsf fds fdsfdsfs fsfd fdsfs fds fdsf dsfds dgfgdgfd gdg dregrg rger grge rgrerere retrett retre ttt tretete t dsfdsf dsffdf sdfdsfds fds fds fds fdsf ds f.</li>\n');
        codeString = codeString.concat('      <li>Please refer to the FHIR Specification</li>\n');
        codeString = codeString.concat('      <li>for valid examples.</li>\n');
        codeString = codeString.concat('      <li>A website link is provided above</li>\n');        
        codeString = codeString.concat('    </div>\n');
        codeString = codeString.concat('  </text>\n');
        codeString = codeString.concat(`<${ResourceName}>\n`);  
        return codeString;
    }

    static getJsonResource(ResourceName) {
        let codeString = '';
        codeString = codeString.concat('{\n');
        codeString = codeString.concat(`  "resourceType": "${ResourceName}",\n`);
        codeString = codeString.concat('  "id": "example",\n');
        codeString = codeString.concat('  "text": {\n');
        codeString = codeString.concat('    "status": "generated",\n');
        codeString = codeString.concat('    "div": "<div xmlns=\\"http:\\/\\/www.w3.org\\/1999\\/xhtml\\">\r      <ul>\r      <li>This is not a valid ${ResourceName} resource.<\\/li>\r      <li>It is only a bare bones example<\\/li>\r      <li>Please refer to the FHIR Specification<\\/li>\r      <li>for valid examples.<\\/li>\r      <li>A website link is provided above<\\/li>\r<\\/div>"\n');
        codeString = codeString.concat('  }\n');  
        codeString = codeString.concat('}\n');
         
        return codeString;
    }
    
}

export default FhirResourceExampleGenerator