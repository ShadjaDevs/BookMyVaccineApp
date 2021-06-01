import axios from 'axios';

export default class APIService {
    constructor() {
        this.URL = "https://api.bookmyvaccine.app";
        this.baseAPIInstance = {
            baseURL: '',
            timeout: 60000, // time out of 1 minute
            headers: { 'Access-Control-Allow-Origin' : '*' }
        }
    }

    /**
     *
     * @param instance - axios instance to make the query
     * @param options - additional options for the query
     */
    getAPI(instance, options = {}){
        //Build the options into a query string
        //let qs = Object.keys(options).map(key => key + '=' + options[key]).join('&');
        return instance.get('', options).then(response => {
            const status = response.status;
            if(status === 200) {
                return response;
            } else {
                throw new Error('Please check your internet connection and try again.');
            }
        })
            .catch((error) => {
                alert(error);
            });
    }

    /**
     *
     * @param instance - axios instance to make the query
     * @param options - additional options for the query
     */
    putAPI(instance, options){
        //Build the options into a query string
        let qs = Object.keys(options).map(key => key + '=' + options[key]).join('&');
        return instance.put('?'+qs).then(response => {
            const status = response.status;
            if(status === 200) {
                return response;
            } else {
                throw new Error('Please check your internet connection and try again.');
            }
        })
            .catch((error) => {
                alert(error);
            });
    }

    /**
     *
     * @param instance - axios instance to make the query
     * @param options - additional options for the query
     */
    postAPI(instance, options){
        //Build the options into a query string
        //let qs = Object.keys(options).map(key => key + '=' + options[key]).join('&');
        //qs = 'projects' + qs;
        return instance.post('', options).then(response => {
            const status = response.status;
            if(status === 200) {
                return response;
            } else {
                throw new Error('Please check your internet connection and try again.');
            }
        })
            .catch((error) => {
                alert(error);
            });
    }

    getNearByPinCodes(pinCode, radius) {

        this.baseAPIInstance.baseURL = `${this.URL}/nearby_pincodes/${pinCode}/${radius}`;

        let instance = axios.create(this.baseAPIInstance);

        return this.getAPI(instance);

    }

    getUUIDDetails(uuid) {
        this.baseAPIInstance.baseURL = `${this.URL}/get_subscription/${uuid}`;

        let instance = axios.create(this.baseAPIInstance);

        return this.getAPI(instance);
    }

    removeSubscription(uuid) {
        this.baseAPIInstance.baseURL = `${this.URL}/remove_subscription/${uuid}`;

        let instance = axios.create(this.baseAPIInstance);

        return this.getAPI(instance);
    }

    postSubscription(formData) {
        this.baseAPIInstance.baseURL = `${this.URL}/add_subscription`;

        let instance = axios.create(this.baseAPIInstance);

        return this.postAPI(instance, formData);
    }

    postOTP(formData, uuid) {
        this.baseAPIInstance.baseURL = `${this.URL}/input_otp/${uuid}`;

        let instance = axios.create(this.baseAPIInstance);

        return this.postAPI(instance, formData);
    }

    updateSubscription(formData, uuid) {
        this.baseAPIInstance.baseURL = `${this.URL}/update_subscription/${uuid}`;

        let instance = axios.create(this.baseAPIInstance);

        return this.postAPI(instance, formData);
    }
}