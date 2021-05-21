const fs = require("fs");
const parse = require('csv-parse/lib/sync');
class Node {

    constructor(path) {
        this.id = this.setId()
        this.path = path;
        this.name = this.setName(path);
        this.image = "_icon.png";
        this.relativePath = this.setRelativePath(path);
        this.id = this.setId()
        this.price = this.setPrice(path);
        this.type = this.setType(path);
        this.info = null;
        this.children = [];
    }
    setId() {
        return Math.ceil(Math.random() * Math.pow(10, 15))
    }
    readCsv(path) {
        const a = fs.readFileSync(path);
        const records = parse(a, {
            skip_empty_lines: true,
            delimiter: ','
        })
        return records[0][0];
    }
    setName(name) {
        let stringWithoutFilePath = name.replace('../../../Downloads/', '');
        let stringConvertedArray = stringWithoutFilePath.split('/');
        let updatedName = stringConvertedArray[stringConvertedArray.length - 1]
        let nameAltered = updatedName.replace(/[0-9]/g, '');
        return nameAltered.replace(/[_]/g, ' ');
    }
    setRelativePath(path) {
        let stringWithoutFilePath = path.replace("../../../Downloads/", '');
        return stringWithoutFilePath;
    }
    setPrice(path) {
        console.log(path)
        if (fs.lstatSync(path).isDirectory()) {
            const dir = fs.readdirSync(path)
            for (const child of dir) {
                if (fs.lstatSync(`${path}/${child}`).isFile()) {
                    if (`${path}/${child}`.includes('price')) {
                        const rstream = this.readCsv(`${path}/${child}`)
                        return rstream
                    }
                }
            }
        }
    }
    setType(path) {
        if (fs.lstatSync(path).isDirectory()) {
            const dir = fs.readdirSync(path)
            for (const child of dir) {
                if (fs.lstatSync(`${path}/${child}`).isFile()) {
                    if (`${path}/${child}`.includes('type')) {
                        const rstream = this.readCsv(`${path}/${child}`)
                        return rstream
                    }
                }
            }
        }
    }
    setInfo(path) { }

    //     if(fs.lstatSync(childNode.path).isFile()) {
    //     if (childNode.path.includes('price')) {

    //         const rstream = test(childNode.path)
    //         currentNode.price = rstream

    //         //mapear preço                        
    //     } else if (childNode.path.includes('type')) {
    //         const rstream = test(childNode.path)
    //         currentNode.type = rstream
    //         //mapear type                        
    //     } else if (childNode.path.includes('icon')) {
    //         //mapear preço         
    //         currentNode.image = "_icon.png";
    //     }
    // }
}

module.exports = Node;