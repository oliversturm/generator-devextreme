const { Buffer } = require('buffer');
const path = require('path');
const { format } = require('prettier');
const through2 = require('through2');

module.exports = () => {
  const parsers = {
    '.js': 'babylon',
    '.ts': 'typescript',
    '.json': 'json'
  };

  return through2.obj((file, enc, cb) => {
    if (file.isNull()) return cb(null, file);
    const extension = path.extname(file.path);
    if (!parsers[extension]) return cb(null, file);
    if (file.isStream())
      return cb(new Error('prettier-transform: Streams not supported'));
    file.contents = new Buffer(
      format(file.contents.toString(), {
        singleQuote: true,
        parser: parsers[extension]
      })
    );
    return cb(null, file);
  });
};
