const fs = require('fs').promises,
	mdPath = './tutorials/java',
	outputFile = './output.txt';

function readDirectory(dir, parent = null) {
	console.log("Reading inside:", dir);

	return fs.readdir(dir, { withFileTypes: true })
		.then(files => {
			const promises = files.map(file => {
				const path = `${dir}/${file.name}`;

				if (file.isDirectory()) {
					const newParent = parent
						? `${parent}/${file.name}`
						: file.name;

					return readDirectory(path, newParent);
				}

				if (file.isFile()) {
					const markdownPath = parent
						? `${parent}/${file.name}`
						: file.name;

					return fs.appendFile(
						outputFile,
						markdownPath.toLowerCase() + '\n'
					);
				}
			});

			return Promise.all(promises);
		});
}

// Clear the file first
fs.writeFile(outputFile, '')
	.then(() => {
		return readDirectory(mdPath);
	})
	.then(() => {
		console.log('Finished!');
	})
	.catch(err => {
		console.error(err);
	});