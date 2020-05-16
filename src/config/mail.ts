interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    sender: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    sender: {
      email: 'gobarber@celecsys.com',
      name: 'Wesley da Celecsys',
    },
  },
} as IMailConfig;
