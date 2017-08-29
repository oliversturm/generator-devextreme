const fp = require('lodash/fp');

function debug(v) {
  console.log('Value: ', v);
  return v;
}

function stringOnly(v) {
  return typeof v === 'string' ? v : undefined;
}

function toLowerCase(v) {
  return v ? v.toLowerCase() : undefined;
}

function oneOf(options, defaultvalue, allowUndefined = false) {
  return fp.compose(
    v =>
      v
        ? options.find(o => v === o) ||
            options.find(o => o.startsWith(v)) ||
            defaultvalue
        : allowUndefined ? undefined : defaultvalue,
    toLowerCase,
    stringOnly
  );
}

function fromCsv() {
  return fp.compose(v => (v ? v.split(/\s*,\s*/) : undefined), stringOnly);
}

module.exports = {
  stringOnly,
  toLowerCase,
  oneOf,
  fromCsv
};
