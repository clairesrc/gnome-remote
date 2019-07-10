import {POST, Path} from 'typescript-rest';
import {DBUSService} from './../../dbus';

/**
 * This is a demo operation to show how to use typescript-rest library.
 */
@Path('/notification')
export class NotificationController {
    /**
     * Send a greeting message.
     * @param name The name that will receive our greeting message
     */
   @Path("/")
    @POST
    public notify(text: string): string {
        const dbus = new DBUSService();
        dbus.sendNotification(text);
        return 'success';
    }
}
