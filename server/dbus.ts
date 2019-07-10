const dbus: any = require('dbus-native');

export class DBUSService {
    sessionBus: any;

    constructor() {
        this.sessionBus = dbus.sessionBus();
    }

    sendNotification({ text }: { text: string }) {
        this.sessionBus.getService('org.freedesktop.Notifications').getInterface(
            '/org/freedesktop/Notifications',
            'org.freedesktop.Notifications', function(err: any, notifications: any) {
        
            // dbus signals are EventEmitter events
            notifications.on('ActionInvoked', function() {
                console.log('ActionInvoked', arguments);
            });
            notifications.on('NotificationClosed', function() {
                console.log('NotificationClosed', arguments);
            });
            notifications.Notify('example', 0, '', 'summary 3', text, [], [],  5, function(err: any, id: any) {
                setTimeout(function() { notifications.CloseNotification(id, console.log); }, 4000);
            });
        });
    }
}
