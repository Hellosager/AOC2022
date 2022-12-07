const lines = input.split(/\n/);

var directoryTree = new Map();
directoryTree.set("/", new Map());
var currentDir = directoryTree.get("/");
currentDir.set("fileSizes", 0);

lines.forEach(line => {
    if(line === "$ ls") {
        // skip
    } else {
        if(line.startsWith("$ cd")) {
            let dirName = line.split(" ")[2];
            if (dirName === "/") {
                currentDir = directoryTree.get("/");
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

function returnDirSize(directory) {
    let isRoot = directory.has("/");
    let entries = directory.entries();
    for(let [key, value] of entries) {
        console.log("going into " + key);
        if(value.size === 2) {
            return value.get("fileSizes");
        }
        if (!(key === "fileSizes") && !(key === "..")) { // this blocks my recursion

            // if (key === "..") {
            //     return 0;
            // }

            let size = returnDirSize(value);
            value.set("fileSizes", value.get("fileSizes") + size)
            if (size <= 100000) {
                totalDeletableFileSize += size;
            }
            if (!isRoot) {
                console.log("size of " + key + " : " + (value.get("fileSizes") + size));
                return value.get("fileSizes");
            } else {
                continue;
            }
        }
    }
    // dirEntries.forEach(key => {
    //     let size = returnDirSize(dirEntries.get(key).entries());
    //     dirEntries.set("fileSizes", dirEntries.get("fileSizes") + size)
    //     if(size <= 100000) {
    //         totalDeletableFileSize += size;
    //     }
    //    return size;
    // });
}

returnDirSize(directoryTree);
result1div.innerHTML = totalDeletableFileSize;