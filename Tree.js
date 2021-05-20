class TreeNode {

    constructor(path, name, price, type, info) {
        this.path = path;
        this.name = name;
        this.price = price;
        this.type = type;
        this.info = info;
        this.children = []
    }

}

module.exports = TreeNode;