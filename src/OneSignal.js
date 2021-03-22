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

    async allDevices () {
        try {
            const endpoint = `https://onesignal.com/api/v1/players?app_id=${this.appId}&limit=300&offset=0`;

            const response = await axios.get(endpoint, {
                headers: {
                    "Authorization": `Basic ${this.restApiKey}`
                }
            });

            return response.data

        } catch (err) {
            throw Error(err.response.data.errors);
        }
    }

    async sendNotificationTo (deviceToken, fields) {
        try {
            const devices = await this.allDevices();
    
            const user = devices.players.find(player => player.identifier === deviceToken);

            const endpoint = 'https://onesignal.com/api/v1/notifications';

            fields['app_id'] = this.appId
            fields['include_player_ids'] = [user.id]

            const response = await axios.post(endpoint, fields, {
                headers: {
                    Authorization: `Basic ${this.restApiKey}`
                }
            });
           
            return response.data

        } catch (err) {
            throw Error(err.response.data.errors);
        }
    }

    async sendNotificationToAll(fields) {
        try {
            const devices = await this.allDevices();

            const endpoint = 'https://onesignal.com/api/v1/notifications';

            const playerIds = [];
            devices.players.forEach(player => {
                playerIds.push(player.id)
            });
            fields['include_player_ids'] = playerIds;
            fields['app_id'] = this.appId

            const response = await axios.post(endpoint, fields, {
                headers: {
                    Authorization: `Basic ${this.restApiKey}`
                }
            });

            return response.data
        } catch (err) {
            throw Error(err.response.data.errors);
        }
    }
}

module.exports = OneSignal;
