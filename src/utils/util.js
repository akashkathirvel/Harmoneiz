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