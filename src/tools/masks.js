const ruPhone = ['+', '7', ' ', '(', ' ', /[1-69]/, /\d/, /\d/, ' ', ')', ' ', /\d/, /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/];
const date = [ /\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/ ];
const smsCode = [ /\d/, /\d/, /\d/, /\d/ ];

export default {
  phone: ruPhone,
  'phone-ru': ruPhone,
  date: date,
  'sms-code': smsCode,
};
