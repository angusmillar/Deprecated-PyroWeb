import toLower from 'lodash/toLower';

export default class UuidSupport {
    
    //example: 1e2d5dca-78b6-461e-6dff-6e59afa3535e
    //implmentation from: http://guid.us/GUID/JavaScript
    static createGUID = () => {
        const s4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return toLower(`${s4()}${s4()}-${s4()}-4${s4().substr(0, 3)}-${s4()}-${s4()}${s4()}${s4()}`);
    }

}

