
var fs = require('fs');

var disk = 'D:/';
var readPath =  disk + 'wj';

fs.readdir(readPath, function(err, result) {
	if (err) console.log('has error:', err);
	console.log(result);
	var p = readPath + '/' + result[1];
	status(p);
});

function status(path) {
	console.log('状态路径是:', path);
	 fs.stat(path, function(err, result) {
	 	handleErr(err);
	 	//console.log('状态:', result);
	 	console.log('是否是文件夹:', result.isDirectory());
	 });
}



function handleErr(err) {
	if (err) {
		throw err;
	}
	//console.log('has error:', err); 
}