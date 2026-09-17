export var javaMdFiles = [];

export function getAllJavaMd() {
    return $.get('output.txt')
        .then(content => {
            const files = content
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);
            javaMdFiles = files;
            return javaMdFiles;
        });
}