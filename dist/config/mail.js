"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    sender: {
      email: 'gobarber@celecsys.com',
      name: 'Wesley da Celecsys'
    }
  }
};
exports.default = _default;