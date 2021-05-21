class TreeNode {

    constructor(path, name, price, type, info) {
        this.path = path;
        this.name = name;
        this.image = null;
        this.relativePath = null;
        this.price = price;
        this.type = type;
        this.info = info;
        this.children = [];
    }

}

module.exports = TreeNode;