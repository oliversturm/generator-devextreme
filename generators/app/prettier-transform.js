const { Buffer } = require('buffer');
const { format } = require('prettier');
const through2 = require('through2');

module.exports = () => {
  return through2.obj((file, enc, cb) => {
    if (file.isNull()) return cb(null, file);
    if (!file.path.match(/\.js$/)) return cb(null, file);
    if (file.isStream())
      return cb(new Error('prettier-transform: Streams not supported'));
    file.contents = new Buffer(
      format(file.contents.toString(), {
        singleQuote: true
      })
    );
    return cb(null, file);
  });
};
