const http = require('http');
const formidable = require('formidable');
const fs = require('fs');

http.createServer((req, res) => {
	res.writeHead(200,
		{
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*"
		});
	const form = formidable({ multiples: true, uploadDir: __dirname });
	let respData = {
		status: 'fail'
	};

	form.parse(req, function (err, fields, file) {
		if (typeof file === 'object' && Object.keys(file).length > 0) {
			let oldpath = file.img.path;
			let newpath = __dirname + '\\public\\' + file.img.name;
			fs.rename(oldpath, newpath, err => {
				if (err) throw err;
				respData.status = 'ok'
				res.end(JSON.stringify(respData));
			})
		} else {
			res.write(JSON.stringify(respData));
			res.end();
		}
	})
}).listen(8080)


