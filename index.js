const { dirname } = require("path");
const fs = require("fs");
const TreeNode = require("./Tree");

const filePath = "../../../Downloads/2.2_dress/2.2_dress";
const contentFileDestination = "./test.json";

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


function extractName(name){
    //remover numero
    let nameAltered = name.replace(/[0-9]/g, '');
    return nameAltered.replace(/[_]/g,' ');
}
function extractPrice(path){
    if(path.split(".")[1]=="csv" & path.split(".")[0]=="price"){
       
        return '0';
    }
}
function extractType(){}
function extractInfo(){}

function buildTree(rootPath) {
    const root = new TreeNode(rootPath);
    const stack = [root];
    while (stack.length) {
        const currentNode = stack.pop();
        if (currentNode) {
            const children = fs.readdirSync(currentNode.path);
            for (const child of children) {
                const childPath = `${currentNode.path}/${child}`;
                const name = extractName(child);
                const price = extractPrice(child)
                const type = extractPrice(child)
                const info = extractPrice(child)
                const childNode = new TreeNode(childPath, name, price, type, info)
                if(fs.statSync(childNode.path).isDirectory()){
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
