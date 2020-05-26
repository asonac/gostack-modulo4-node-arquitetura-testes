import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

import IMailProvider from './models/IMailProvider';

const providers = {
  // ethereal: container.resolve(EtherealMailProvider),
  // ses: container.resolve(SESMailProvider),
  ethereal: EtherealMailProvider,
  ses: SESMailProvider,
};

switch (mailConfig.driver) {
  case 'ethereal':
    console.log(mailConfig.driver);
    container.registerInstance<IMailProvider>(
      'MailProvider',
      container.resolve(EtherealMailProvider),
    );
    break;
  case 'ses':
    container.registerSingleton<IMailProvider>(
      'MailProvider',
      providers[mailConfig.driver],
    );
    break;
  default:
    container.register<IMailProvider>('MailProvider', EtherealMailProvider);
}
