const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
	res.writeHead(200,
		{
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*"
		});
	const form = formidable({ multiples: true, uploadDir: __dirname });
	let respData = {
		status: 'fail',
		imgs: []
	};

	form.parse(req, function (err, fields, file) {
		// 讀取 public 下的照片
		if (fields && fields.type === 'get') {
			let extname = null;
			return fs.readdir(__dirname + '\\public\\', (err, files) => {
				// 過濾副檔名
				let newFiles = files.filter(function (file) {
					extname = path.extname(file).toLowerCase()
					return ((extname === '.png') || (extname === '.jpg'))
				});
				newFiles = setImgsInfo(newFiles)
				respData.status = 'ok';
				respData.imgs = newFiles;
				res.write(JSON.stringify(respData))
				res.end();
			});
		}
		// 處理上傳
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

function setImgsInfo(imgs) {
	return imgs.map(img => {
		return {
			id: img,
			description: 'my upload img',
			urls: {
				small: '/' + img
			},
			user: {
				name: 'Max'
			},
		}
	});
}
