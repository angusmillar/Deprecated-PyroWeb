
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
        codeString = codeString.concat('      <li>It is only a bare bones example.</li>\n');
        codeString = codeString.concat('      <li>Please refer to the FHIR Specification</li>\n');
        codeString = codeString.concat('      <li>for valid examples.</li>\n');
        codeString = codeString.concat('      <li>A website link is provided above</li>\n');        
        codeString = codeString.concat('    </div>\n');
        codeString = codeString.concat('  </text>\n');
        codeString = codeString.concat('</Patient>\n');  
        return codeString;
    }

    
}

export default FhirResourceExampleGenerator