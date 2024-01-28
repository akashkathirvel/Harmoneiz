import pkg from "../package.json";

export const CONSTANTS = {
    NAME: pkg.name,
    VERSION: pkg.version,
    HOME_URL: pkg.homepage,
    STORE_KEY: `lanky_${pkg.name}_`,
    MIXPANEL_TOKEN: "b186ac32afb3834684b1ebbd8e1530b3"
}