// // const path = require("path")
// // const fs = require("fs")

// // // const deleteImageFile =(req ,deleteImage) => {

// // //     const rootDir = path.dirname(require.main.filename) 

// // //     filePath = path.join( rootDir,`/public/storyImages/${deleteImage}`)
    
// // //     fs.unlink(filePath, (res) => console.log(res,"file delete "));
    
// // // }

// // const deleteImageFile = (req, deleteImage) => {
// //   if (!deleteImage) return; // skip if no image provided
// //   const rootDir = path.dirname(require.main.filename);
// //   const filePath = path.join(rootDir, `/public/storyImages/${deleteImage}`);

// //   fs.unlink(filePath, (err) => {
// //     if (err) console.error("Error deleting file:", err);
// //     else console.log("File deleted:", filePath);
// //   });
// // };

// // module.exports = deleteImageFile


// const path = require("path");
// const fs = require("fs");

// const deleteImageFile = (req, deleteImage) => {
//   if (!deleteImage) return; // Skip if no image provided

//   const rootDir = path.dirname(require.main.filename);
//   const filePath = path.join(rootDir, `/public/storyImages/${deleteImage}`);

//   fs.unlink(filePath, (err) => {
//     if (err) console.error("Error deleting file:", err);
//     else console.log("File deleted:", filePath);
//   });
// };

// module.exports = deleteImageFile;



const path = require("path");
const fs = require("fs");

const deleteImageFile = (req, deleteImage) => {
  if (!deleteImage) return; // nothing to delete

  // Use project root directory instead of require.main.filename
  const rootDir = process.cwd();

  const filePath = path.join(rootDir, `/public/storyImages/${deleteImage}`);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(`Failed to delete file: ${filePath}`, err);
    } else {
      console.log(`File deleted successfully: ${filePath}`);
    }
  });
};

module.exports = deleteImageFile;