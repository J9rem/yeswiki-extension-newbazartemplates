/*
 * This file is part of the YesWiki Extension newbazartemplates.
 *
 * Authors : see README.md file that was distributed with this source code.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// Extract files that we need from the node_modules folder
// The extracted files are integrated to the repository, so production server don't need to
// have node installed

// Include fs and path module

const fs = require('fs-extra')
const path = require('path')

const basePath = path.join(__dirname, '../')

function copySync(src, dest, opts) {
  if (fs.existsSync(src)) {
    fs.copySync(path.join(basePath, src), path.join(basePath, dest), opts)
  } else {
    console.log(`${src} is not existing !`)
  }
}

// function mergeFilesSync(sources, dest) {
//   const fullDest = path.join(basePath, dest)
//   if (!fs.existsSync(fullDest)) {
//     fs.mkdirSync(path.dirname(fullDest), { recursive: true })
//   } else {
//     fs.unlinkSync(fullDest)
//   }
//   sources.forEach((file) => {
//     const fullSrc = path.join(basePath, file)
//     if (!fs.existsSync(fullSrc)) {
//       console.log(`${fullSrc} is not existing !`)
//     } else {
//       fs.appendFileSync(fullDest, fs.readFileSync(fullSrc))
//     }
//   })
// }

// vis-network
copySync(
  'node_modules/vis-network/dist/vis-network.min.js',
  'javascripts/vendor/vis-network/vis-network.min.js',
  { overwrite: true }
)
// images
copySync('node_modules/vis-network/dist/img/', 'javascripts/vendor/vis-network/img/', {
  overwrite: true,
  filter(src) {
    return (fs.statSync(src).isDirectory() && ['img', 'network'].includes(path.basename(src)))
      || path.basename(src).match(/.*\.png$/)
  }
})
// license files
copySync('node_modules/vis-network/', 'javascripts/vendor/vis-network/', {
  overwrite: true,
  // filter(src, dest) {
  filter(src) {
    return (fs.statSync(src).isDirectory() && path.basename(src) === 'vis-network')
      || ['LICENSE-MIT', 'LICENSE-APACHE-2.0', 'README.md'].includes(path.basename(src))
  }
})

copySync(
  'node_modules/vis-network/dist/dist/vis-network.min.css',
  'styles/vendor/vis-network/vis-network.min.css',
  { overwrite: true }
)
// license files
copySync('node_modules/vis-network/', 'styles/vendor/vis-network/', {
  overwrite: true,
  filter(src) {
    return (fs.statSync(src).isDirectory() && path.basename(src) === 'vis-network')
      || ['LICENSE-MIT', 'LICENSE-APACHE-2.0', 'README.md'].includes(path.basename(src))
  }
})

// example
// mergeFilesSync(
//   [
//     'node_modules/file1.js',
//     'node_modules/file2.js',
//   ],
//   'javascripts/vendor/output-file.js');
