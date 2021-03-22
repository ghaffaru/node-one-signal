require('dotenv').config({path: __dirname + '/.env'})

const chai = require('chai');
const chaiHttp = require('chai-http');
const OneSignal = require('../index');

describe('One signal tests', () => {

    const client = new OneSignal(process.env.APP_ID, process.env.REST_API_KEY)

    it ('can create a device token on one signal', async () => {
        try {
           const fields = {
                "identifier": "ce777617da7f548fe7a9ab6febb56cf39fba6d382000c0395666288d961ee566",
                "timezone": "-28800",
                "device_type": 1
           }
           
           const addDeviceResponse = await client.addDevice(fields);

           chai.expect(addDeviceResponse).to.have.property('success');

        } catch (err) {
            throw Error(err.message);
        }
    });

    it ('can get add registered devices', async () => {
        try {
            const getAllDevicesResponse = await client.allDevices();

            chai.expect(getAllDevicesResponse).to.have.property('players');

        } catch (err) {
            throw Error(err.message);
        }
    });

    it ('can send notification to a user', async () => {
        try {
            fields = {
              
                "headings":{
                    "en":  "The African Wear",
                },
                "contents": {
                    "en": "Hello Notification"
                },
                "web_url": "https://blahblab.com/",
                "mobile_url": "/chat"
            }
            const sendNotificationResponse = await client.sendNotificationTo('ce777617da7f548fe7a9ab6febb56cf39fba6d382000c0395666288d961ee566', fields);
            
            chai.expect(sendNotificationResponse).to.have.property('id');

        } catch (err) {
            throw new Error(err.message);
        }
    });

    it('can send notification to all users', async () => {
        try {
            fields = {
                "headings":{
                    "en":  "The African Wear Customer",
                },
                "contents": {
                    "en": "Hello Notification"
                },
                "web_url": "https://blahblab.com/",
                "mobile_url": "/chat"
            }
            const sendNotificationResponse = await client.sendNotificationToAll(fields);
            
            chai.expect(sendNotificationResponse).to.have.property('id');
            
        } catch (err) {
            throw new Error(err.message);
        }
    })
});