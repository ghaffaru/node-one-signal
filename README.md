# node-one-signal
A Nodejs wrapper for the One Signal API 

## Installation

You can install the package via npm:

```bash
npm install nodejs-one-signal
```

## Usage

Add a new device
``` javascript
const OneSignal = require('nodejs-one-signal');

const client = new OneSignal('appId', 'restApiSecret');

client.addDevice({
    "identifier": "ce777617da7f548fe7a9ab6febb56cf39fba6d382000c0395666288d961ee566",
    "timezone": "-28800",
    "device_type": 1
}).then(response => {
    console.log(response);
}).catch(err => {
    console.log(err);
})
```

All subscribed devices
``` javascript
const client = new OneSignal('appId', 'restApiSecret');

client.allDevices().then(devices => console.log(devices)).catch(err => console.log(err))
```

Send notification to one device
``` javascript
const client = new OneSignal('appId', 'restApiSecret');
 fields = {
        "headings":{
            "en":  "Project",
        },
        "contents": {
            "en": "Hello Notification"
        },
        "web_url": "https://blahblab.com/",
        "mobile_url": "/chat"
   }
client.sendNotificationTo('####deviceToken', fields).then(response => console.log(response)).catch(err => console.log(err))
```

Visit the [doc](https://documentation.onesignal.com/reference/create-notification) to see more field keys

Send notification to all devices
``` javascript
const client = new OneSignal('appId', 'restApiSecret');
 fields = {
        "headings":{
            "en":  "Project",
        },
        "contents": {
            "en": "Hello Notification"
        },
        "web_url": "https://blahblab.com/",
        "mobile_url": "/chat"
   }
client.sendNotificationToAll(fields).then(response => console.log(response)).catch(err => console.log(response))
```
## Testing

``` bash
npm run test
```

## Contributing

Please see [CONTRIBUTING](./CONTRIBUTING.md) for details.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
