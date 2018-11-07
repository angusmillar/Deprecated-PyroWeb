export default class DeviceConstants {
    
    //DeviceType
    static deviceType = {
        computer: 'computer',
        tablet: 'tablet',
        mobile: 'mobile',
    };

    static sizeForMessage(deviceTypeValue) {        
        //Options for Message: mini tiny small large big huge massive
        switch (deviceTypeValue) {
            case DeviceConstants.deviceType.computer: 
                return 'large';                        
            case DeviceConstants.deviceType.tablet: 
                return 'small';                
            case DeviceConstants.deviceType.mobile: 
                return 'tiny';                            
            default:
                return 'massive';
        }    
    }

    static sizeForImage(deviceTypeValue) {        
        //Options for Image: mini tiny small medium large big huge massive
        switch (deviceTypeValue) {
            case DeviceConstants.deviceType.computer: 
                return 'medium';                        
            case DeviceConstants.deviceType.tablet: 
                return 'small';                
            case DeviceConstants.deviceType.mobile: 
                //Yes bigger for Mobile looks better here
                return 'medium';                            
            default:
                return 'massive';
        }    
    }

}