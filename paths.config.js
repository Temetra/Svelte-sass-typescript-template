// Resolves a path relative to "src" to a complete path
// eg pathTo("scss") => "x:\project\src\scss"
const path = require('path');
const pathTo = (subdir) => path.resolve(__dirname, "src", subdir) + "/";
module.exports = pathTo;
