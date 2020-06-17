/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Notify } from 'quasar';
import { i18n } from 'src/boot/i18n';

export default {
  success (message: any) {
    this.send('positive', message);
  },

  error (message: any) {
    this.send('negative', message);
  },

  info (message: any) {
    this.send('info', message);
  },

  warn (message: any) {
    this.send('warning', message);
  },

  /**
   * when message is string will be print as default
   * when message is a object will be resolved to print it with his asserts
   *
   * @param type type of toast
   * @param message string|object
   */
  send (type: string, message: any) {
    let asserts = null;
    let messageText = '';

    if (typeof message === 'object') {
      try {
        const { message: objMessage, asserts: objAsserts } = JSON.parse(message[0]);

        objAsserts.field = i18n.t(objAsserts.field);
        asserts = objAsserts;
        messageText = objMessage;
      } catch (error) {
        messageText = 'error';
      }
    } else {
      messageText = message;
    }

    Notify.create({
      type,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `${i18n.t(messageText, asserts)}`,
      position: 'top-right'
    });
  }
};
