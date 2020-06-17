/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Notify } from 'quasar';
import { i18n } from 'src/boot/i18n';

export default {
  success (message: string) {
    this.send('positive', message);
  },

  error (message: string) {
    this.send('negative', message);
  },

  info (message: string) {
    this.send('info', message);
  },

  warn (message: string) {
    this.send('warning', message);
  },

  send (type: string, message: string) {
    Notify.create({
      type,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `${i18n.t(message)}`,
      position: 'top-right'
    });
  }
};
