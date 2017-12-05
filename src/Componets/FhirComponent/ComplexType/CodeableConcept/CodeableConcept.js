import isNil from 'lodash/isNil';
import filter from 'lodash/filter'

class CodeableConcept {
    constructor(CodeableConcept) {
        this.CodeableConcept = CodeableConcept;
    }

    get getCodingList() {
        if (!isNil(this.CodeableConcept.coding)) {
            return this.CodeableConcept.coding;
        }
        else{
            return null;
        }    
    }

    getCodeBySystem(system) {
        const CodeList = this.getCodingList;
        if (!isNil(CodeList)) {
            const coding = filter(CodeList, (Coding) => { if (Coding.system === system) return Coding} );
            if (!isNil(coding)) {
                if (!isNil(coding[0].code)) {
                    return coding[0].code;
                }
            }
        }
        return null;
    }

    get getText() {
        if (!isNil(this.CodeableConcept.text)) {
            return this.CodeableConcept.text;
        } else {
            return null;
        }
    }
}

export default CodeableConcept