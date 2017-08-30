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

// Remove a pair of ' or " around the string, plus
// any whitespace before or after the ' or ".
// The following variations:
// ' de, en-GB  '
//   'de, en-GB '
// de, en-GB
// ... and others
// all result in de, en-GB
function stripParam(s) {
  return s.replace(/^\s*[\'"]?\s*(.*?)\s*[\'"]?\s*$/, '$1');
}

function noEmptyArray(a) {
  if (!a || !a.length || a.length <= 0) return undefined;
  else return a;
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
  return fp.compose(
    debug,
    noEmptyArray,
    debug,
    v => (v ? v.split(/\s*,\s*/) : undefined),
    stripParam,
    stringOnly
  );
}

module.exports = {
  stringOnly,
  toLowerCase,
  oneOf,
  fromCsv
};
