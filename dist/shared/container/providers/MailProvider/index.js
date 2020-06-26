"use strict";

var _tsyringe = require("tsyringe");

var _mail = _interopRequireDefault(require("../../../../config/mail"));

var _EtherealMailProvider = _interopRequireDefault(require("./implementations/EtherealMailProvider"));

var _SESMailProvider = _interopRequireDefault(require("./implementations/SESMailProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  // ethereal: container.resolve(EtherealMailProvider),
  // ses: container.resolve(SESMailProvider),
  ethereal: _EtherealMailProvider.default,
  ses: _SESMailProvider.default
};

switch (_mail.default.driver) {
  case 'ethereal':
    console.log(_mail.default.driver);

    _tsyringe.container.registerInstance('MailProvider', _tsyringe.container.resolve(_EtherealMailProvider.default));

    break;

  case 'ses':
    _tsyringe.container.registerSingleton('MailProvider', providers[_mail.default.driver]);

    break;

  default:
    _tsyringe.container.register('MailProvider', _EtherealMailProvider.default);

}