const fs = require('fs').promises;

function readDirectory(dir, parent = null) {
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

                    return Promise.resolve([markdownPath]);
                }
            });

            return Promise.all(promises);
        })
        .then(results => {
            return results.flat();
        });
}

module.exports = { readDirectory };