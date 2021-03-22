const axios = require('axios');

class OneSignal {
    constructor(appId, restApiKey) {
        this.appId = appId;
        this.restApiKey = restApiKey
    }

    async addDevice (fields) {
        try {
            const endpoint = 'https://onesignal.com/api/v1/players';

            fields['app_id'] = this.appId

            const response = await axios.post(endpoint, fields, {
                headers: {
                    "Authorization": `Basic ${this.restApiKey}`
                }
            })

            return response.data

        } catch (err) {
            throw Error(err.response.data.errors)
        }
    }

    async allDevices (fields) {
        try {
            const endpoint = `https://onesignal.com/api/v1/players?app_id=${this.appId}&limit=300&offset=0`;

            const response = await axios.get(endpoint, {
                headers: {
                    "Authorization": `Basic ${this.restApiKey}`
                }
            });

            return response.data
            
        } catch (err) {
            throw Error(err.response.data.errors)
        }
    }
}

module.exports = OneSignal;
