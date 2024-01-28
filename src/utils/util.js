import mixpanel from "mixpanel-browser";

export function isDevelopmentSite(){
    // return false;
    return window.location?.hostname?.toLowerCase() === "localhost";
}

export function trackUsage(event = '', payload = {}){
    if(event){
        mixpanel.track(event,  payload);
    }
}

export function generateRandomUid(){
    let S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}