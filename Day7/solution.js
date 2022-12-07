const lines = input.split(/\n/);

var rootDir = new Map();
// rootDir.set("/", new Map());
var currentDir = rootDir;
// currentDir.set("fileSizes", 0);

lines.forEach(line => {
    if(line === "$ ls") {
        // skip
    } else {
        if(line.startsWith("$ cd")) {
            let dirName = line.split(" ")[2];
            if (dirName === "/") {
                currentDir = rootDir;
            } else if (dirName === "..") {
                currentDir = currentDir.get("..");
            } else if (!currentDir.get(dirName)) {
                currentDir.set(dirName, new Map());
                currentDir.get(dirName).set("..", currentDir);
                currentDir.get(dirName).set("fileSizes", 0);
                currentDir = currentDir.get(dirName);
            }
            // } else if(line.startsWith("dir")) {
            //     let dirName = line.split(" ")[1];
            //
            // }
        } else if (/\d+\s\w/.test(line)) {
            let size = line.split(" ")[0];
            currentDir.set("fileSizes", (currentDir.get("fileSizes") + Number(size)));
        }
    }
});

var totalDeletableFileSize = 0;
var totalSize = 0;

function getDirSize(file){
    let tempSize = 0;
    for(let [fileName, fileValue] of file.entries()) {
        if(fileName !== ".." && fileName !== "fileSizes") {
            if(fileValue.size === 2) { // dir has only files
                if(fileValue.get("fileSizes") <= 100000) {
                    totalDeletableFileSize += fileValue.get("fileSizes");
                }
                tempSize += fileValue.get("fileSizes");
            } else { // dir has files and dirs
                let size = getDirSize(fileValue);
                if((fileValue.get("fileSizes") + size) <= 100000) {
                    totalDeletableFileSize += (fileValue.get("fileSizes") + size);
                }
                tempSize += fileValue.get("fileSizes") + size;
            }

        }
    }
    return tempSize;
}

// function getDirSize(file){
//     let tempSize = 0;
//     for(let [fileName, fileValue] of file.entries()) {
//         if(fileName !== ".." && fileName !== "fileSizes") {
//             if(fileValue.size === 2) { // dir has only files
//                 tempSize += fileValue.get("fileSizes");
//                 if(fileValue.get("..").get("dirSize")) {
//                     fileValue.get("..").set("dirSize", fileValue.get("..").get("dirSize") + tempSize);
//                 } else {
//                     fileValue.get("..").set("dirSize", tempSize);
//                 }
//             } else { // dir has files and dirs
//                 let size = getDirSize(fileValue);
//                 tempSize += fileValue.get("fileSizes") + size;
//             }
//
//         }
//     }
//     return tempSize;
// }


for(let file of rootDir) {
    if(file[1].size === 2) {
        let size = file[1].get("fileSizes");
        totalSize += size;
        if(size <= 100000) {
            totalDeletableFileSize += size;
        }
    } else {
        totalSize += getDirSize(file[1]);
    }
}


// part 2
let neededSpace = 30000000 - (70000000 - totalSize);
var closestToDelete = 70000000;

function getDirSizeFindClosestToDelete(file){
    let tempSize = 0;
    for(let [fileName, fileValue] of file.entries()) {
        if(fileName !== ".." && fileName !== "fileSizes") {
            if(fileValue.size === 2) {
                if(fileValue.get("fileSizes") >= neededSpace && fileValue.get("fileSizes") < closestToDelete) {
                    console.log("setting " + file + " as clostedToDelete with " + fileValue.get("fileSizes"));
                    closestToDelete = fileValue.get("fileSizes");
                }
                tempSize += fileValue.get("fileSizes");
            } else {
                let size = getDirSizeFindClosestToDelete(fileValue);
                if(fileValue.get("fileSizes") >= neededSpace && fileValue.get("fileSizes") < closestToDelete) {
                    console.log("setting " + file + " as clostedToDelete with " + fileValue.get("fileSizes"));
                    closestToDelete = fileValue.get("fileSizes");
                }
                tempSize += fileValue.get("fileSizes") + size;
            }

        }
    }
    if(tempSize >= neededSpace && tempSize < closestToDelete) {
        console.log("setting " + file + " as clostedToDelete with " +tempSize);
        closestToDelete = tempSize;
    }
    return tempSize;
}


for(let file of rootDir) {
    if(file[1].size === 2) {
        let size = file[1].get("fileSizes");
        if(size >= neededSpace && size < closestToDelete) {
            console.log("setting " + file + " as clostedToDelete with " + size);
            closestToDelete = size;
        }
    } else {
        let size = getDirSizeFindClosestToDelete(file[1]);
        if(size >= neededSpace && size < closestToDelete) {
            console.log("setting " + file + " as clostedToDelete with " + size);
            closestToDelete = size;
        }
        totalSize += size;
    }
}







// function returnDirSize(directory) {
//     let entries = directory.entries();
//     for(let [key, value] of entries) {
//         console.log("going into " + key);
//         if(value.size === 2) {
//             console.log("returning from " + key);
//             return value.get("fileSizes");
//         }
//         if (!(key === "fileSizes") && !(key === "..")) {
//
//             let size = returnDirSize(value);
//             value.set("fileSizes", value.get("fileSizes") + size)
//             if (size <= 100000) {
//                 totalDeletableFileSize += size;
//             }
//             // if (!isRoot) {
//                 console.log("size of " + key + " : " + (value.get("fileSizes") + size));
//             console.log("returning from " + key);
//             return value.get("fileSizes");
//             // }
//         }
//     }
    // dirEntries.forEach(key => {
    //     let size = returnDirSize(dirEntries.get(key).entries());
    //     dirEntries.set("fileSizes", dirEntries.get("fileSizes") + size)
    //     if(size <= 100000) {
    //         totalDeletableFileSize += size;
    //     }
    //    return size;
    // });
// }

// returnDirSize(rootDir);
// var totalSize = 0;
// for(let [key, value] of rootDir.entries()) {
//     console.log("key: " + key);
//     if(key !== "fileSizes") {
//         let size = returnDirSize(value);
//         value.set("fileSizes", value.get("fileSizes") + size)
//
//         console.log("size of " + key + " is " + value.get("fileSizes"));
//
//         if (size <= 100000) {
//             totalDeletableFileSize += size;
//         }
//         if(value.get("fileSizes") <= 100000) {
//             totalDeletableFileSize += value.get("fileSizes");
//         }
//         totalSize += value.get("fileSizes");
//     }
// }


result1div.innerHTML = totalDeletableFileSize;
result2div.innerHTML = closestToDelete;