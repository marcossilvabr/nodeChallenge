const RandExp = require('randexp');
const { Readable } = require('stream');

const reports = new Readable();

console.log(`creating random reports...`);

let i = 0;
do {
  reports.push(new RandExp(/^([Y-Z]{1,4}) (0[0-9]|[12][0-9]|3[01])(0[0-9]|[1-2][0-4])(0[0-9]|[0-5][0-9])Z ([0-9]{3})([0-9]{2,3})(G([0-9]{2}))?(KT|MPS)$/).gen() + '\n');
  i++
} while (i <= 200000)

console.log(`reports generated!`);

reports.push(null);

module.exports = reports;