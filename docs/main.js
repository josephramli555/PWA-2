var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dX80bWgHaSA:APA91bHqZonLW-XXvFn4kJsow72dGJItntKWLGLakTD0sUKYv9TgnJWDg7tAFNlBtOLDwDjB4VrF3U1stJ3O8e_lZ0zsYuyyX1kCWZH3gtLkw1wN2ydF7RtBrju3t8Lyr-z2tfN7EoNo",
    "keys": {
        "p256dh": "BLZ8519C8QVHwBZICOQAdqzPdnYMMvcehV2vdCjL3yll5XEoxc/5aBVOZe34QfbL84QdUz5Q33Xcrka0Q+jXldk=", 
        "auth": "G5SSW05XGM58Fu0PGlSEqA=="
    }
};
var payload = 'Hello data  payload!';
var options = {
    gcmAPIKey: 'AAAAxtEaudE:APA91bFhaDwb60Kuq56TmffFkozGYm8EOleRwCDkCdpg51IIspVvQBox0f0og-6JyUNjVxcycjrhhEEW0PO1186oBFr2FQ0han6UxXW2Dl4UNrr__eyD7lxeFK463kZzslJPHVM1zoCG',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);