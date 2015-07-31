var fs = require('fs');

// 异步
/*fs.exists('abc.txt', function(exists) {
  console.log(exists ? '存在' : '不存在！');
});*/

console.log(fs.existsSync('abc.txt') ? '存在' : '不存在！');
