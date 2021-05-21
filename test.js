const { dirname, resolve, delimiter } = require("path");
const readline = require("readline")
const fs = require("fs");
const fsPromises = fs.promises;
const Node = require("./Node");
const csv = require("csvtojson")
const filePath = "../../../Downloads/2.1_top"
const contentFileDestination = "./test.json";
const parse = require('csv-parse/lib/sync');
const assert = require('assert')
function save(content) {
    const contentString = JSON.stringify(content);
    return fs.writeFileSync(contentFileDestination, contentString);
}

function readPath(path) {
    const files = fs.readdirSync(path);
    for (const { } of files) {
        const c = fs.createReadStream(`${path}/price.csv`);
        console.log(c);
    }
}

// function readPrice(file) {
//     let price = [];
//     fs.createReadStream(`${file}/price.csv`)
//         .pipe(csv({ separator: ',' }))
//         .on('headers', (headers) => {
//             price.push(headers[0]);
//         })
//         .on('end', () => {
//         });
//     return price;
// }


function extractname(name) {
    let stringWithoutFilePath = name.replace(filePath, '');
    let stringConvertedArray = stringWithoutFilePath.split('/');
    let updatedName = stringConvertedArray[stringConvertedArray.length - 1]
    let nameAltered = updatedName.replace(/[0-9]/g, '');
    return nameAltered.replace(/[_]/g, ' ');
}
function extractToRelativePath(name) {
    let stringWithoutFilePath = name.replace(filePath, '');
    console.log(stringWithoutFilePath)
    return stringWithoutFilePath;
}
function extractPrice(path) {
    if (path.split(".")[1] == "csv" & path.split(".")[0] == "price") {

        return '0';
    }
}
function extractType() { }
function extractInfo() { }

async function read(rstream, encoding = "utf-8") {
    rstream.setEncoding(encoding);
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: rstream
        })
        rl.on('line', (line) => {
            let i = String(line).split(',')[0]
            childNode.price = i;

        })
    })
}
function init() {
    return new Promise((res, err) => setTimeout(() => res('resolve'), 1000))
}
function test(path) {
    const a = fs.readFileSync(path);
    const records = parse(a, {
        skip_empty_lines: true,
        delimiter: ','
    })
    return records[0][0];
}
function buildTree(rootPath) {
    const root = new Node(rootPath);
    console.log(root)
    const stack = [root];
    while (stack.length) {
        const currentNode = stack.pop();
        if (currentNode) {
            const children = fs.readdirSync(currentNode.path);
            console.log(children)
            for (const child of children) {
                const childPath = `${currentNode.path}/${child}`;
                const childNode = new Node(childPath)
                //     console.log(childNode)
                //     // if (fs.lstatSync(childNode.path).isFile()) {
                //     //     if (childNode.path.includes('price')) {

                //     //         const rstream = test(childNode.path)
                //     //         currentNode.price = rstream

                //     //         //mapear preço                        
                //     //     } else if (childNode.path.includes('type')) {
                //     //         const rstream = test(childNode.path)
                //     //         currentNode.type = rstream
                //     //         //mapear type                        
                //     //     } else if (childNode.path.includes('icon')) {
                //     //         //mapear preço         
                //     //         currentNode.image = "_icon.png";
                //     //     }
                //     // }
                if (fs.statSync(childNode.path).isDirectory()) {
                    currentNode.children.push(childNode);
                }
                if (fs.statSync(childNode.path).isDirectory()) {
                    stack.push(childNode);
                }
            }
        }
    }
    return root;
}
const x = buildTree(filePath);
save(x);
