const fs = require('fs')
const path = require('path')

// http://researchhubs.com/post/computing/javascript/convert-directory-structure--to-json-with-node-js.html
function dirTree(filename) {
    const stats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
    }

    return info;
}

fs.writeFileSync('./src/dirTree.json', JSON.stringify(dirTree('./public/demo_videos')))
