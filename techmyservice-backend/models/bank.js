const mongoose = require('mongoose')
const Schema = mongoose.Schema;

require('mongoose-iban').loadType(mongoose);


const Iban = Schema.Types.Iban;

const BankAccountSchema = new Schema({
  accountNumber: { type: Iban }

});

module.exports.BankAccount = mongoose.model('BankAccount', BankAccountSchema);
