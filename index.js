const { dirname } = require("path");
const { promisify } = require("util");
const fs = require("fs");
const TreeNode = require("./Tree")
const prefix = ""
const filePath = "../../../Downloads/2.2_dress"
const contentFileDestination = "./test.json";



const items = [];
function save(content) {
    const contentString = JSON.stringify(content);
    return fs.writeFileSync(contentFileDestination, contentString);
}

function load() {
    const fileBuffer = fs.writeFileSync(contentFileDestination, 'utf-8')
    const contentJson = JSON.parse(fileBuffer);
    return contentJson;
}

function readPath(path) {
    const files = fs.readdirSync(path);
    for (const file of files) {
        const c = fs.createReadStream(`${path}/price.csv`)
        console.log(c)
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

async function readType(file) {
    let type;
    fs.createReadStream(`${file}/type.csv`)
        .pipe(csv({ separator: ',' }))
        .on('headers', (headers) => {
            type = headers[0];
        })
        .on('end', () => {
        });

    return type;
}
function generateObjets() {
    const path = readPath(filePath);
    //leio os dados normais
    //abro o csv de preco
    //abro o csv de group

    //verifico se tem pasta no diretorio
    //para cada pasta que encontrar ele deve entrar listar e verificar se tem pasta, tudo isso durante 8 niveis, e fazendo um por um.

}

function buildTree(rootPath) {
    const root = new TreeNode(rootPath)
    const stack = [root];
    while (stack.length) {
        const currentNode = stack.pop();
        if (currentNode) {
            const children = fs.readdirSync(currentNode.path)
            for (let child of children) {
                const childPath = `${currentNode.path}/${child}`;
                const pathRelative = childPath.substring(29);
                const name = child;

                const childNode = new TreeNode(childPath, name);
                currentNode.children.push(childNode);
                if (fs.statSync(childNode.path).isDirectory()) {
                    stack.push(childNode)
                }
            }
        }
    }
    return root;
}
const x = buildTree(filePath);
save(x)