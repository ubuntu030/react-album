const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

http.createServer((request, response) => {
	const { headers, method, url } = request;
	let respData = {
		status: 'fail',
		imgs: []
	};

	if (method === 'GET') {
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
			response.statusCode = 200;
			response.setHeader('Content-Type', 'application/json');
			response.setHeader('Access-Control-Allow-Origin', '*');
			response.write(JSON.stringify(respData))
			response.end();
		});
	}

	if (method === 'POST') {
		const form = formidable({ multiples: true, uploadDir: __dirname });
		form.parse(request, (err, fields, file) => {
			if (typeof file === 'object' && Object.keys(file).length > 0) {
				let oldpath = file.img.path;
				let newpath = __dirname + '\\public\\' + file.img.name;
				// 檔案處理
				fs.rename(oldpath, newpath, err => {
					if (err) throw err;
					respData.status = 'ok'
					response.setHeader('Content-Type', 'application/json');
					response.setHeader('Access-Control-Allow-Origin', '*');
					response.write(JSON.stringify(respData))
					response.end();
				})
			}
		})
	}
}).listen(8080)

// data資料格式處理
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
