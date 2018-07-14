let config = {};
const API_LOCAL = "http://localhost:54279/";
const API_PROD = "http://192.168.0.101/";
Object.defineProperties(config, {
    'API_SERVER': {
        writable: false,
        value: API_PROD
    }
});


export default config;