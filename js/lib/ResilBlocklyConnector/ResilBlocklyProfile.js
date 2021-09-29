class PClass{
    constructor(name) {
        this.name = name;
        this.attributes = [];
        this.relations = [];
    }
}
class PAttribute{
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
class PRelation{
    constructor(name, type, classname, cardinality) {
        this.name = name;
        this.type = type;
        this.classname = classname;
        this.cardinality = cardinality;
    }
}

class Profile{
    classes = [];

    constructor(profileXMLString){
        const profileDOM = new DOMParser().parseFromString(profileXMLString,"text/xml");
        const profileWS = new WorkspaceDOM(profileDOM);

        const blocks = profileWS.getBlocks();
        for (var i = 0; i < blocks.length; i++){
            const pClass = readClass(blocks[i]);
            if(pClass !== undefined){
                this.classes.push(pClass)
            }
        }
    }
    getClassNameList(){
        const nameList = [];
        for(let i = 0; i < this.classes.length; i++){
            nameList.push(this.classes[i].name);
        }
        return nameList;
    }
    toString(){
        let ret = "";
        for(let i = 0; i < this.classes.length; i++){
            const pclass = this.classes[i];
            ret += pclass.name + "\n"
            const attr = pclass.attributes;
            for(let j = 0; j < attr.length; j++){
                ret += "\t"+ attr[j].type + " : " + attr[j].name+"\n";
            }
            const rels = pclass.relations;
            for(let j = 0; j < rels.length; j++){
                ret += "\t"+ rels[j].type + " : " + rels[j].name+"\n";
            }
        }
        return ret;
    }
    getClassByName(name){
        for(let i = 0; i < this.classes.length; i++){
            if(this.classes[i].name === name){
                return this.classes[i];
            }
        }
        return null;
    }
}


function readClass(classBlock){
    const type = classBlock.getType();
    if(type === "class") {
        const name = classBlock.getFieldByName("name").getText();
        const pClass = new PClass(name);

        const attStmt = classBlock.getStatementByName("attributes");
        if(attStmt !== null){
            const attList = attStmt.toBlockList();
            for (var j = 0; j < attList.length; j++){
                pClass.attributes.push(readAttribute(attList[j]));
            }
        }

        const refStmt = classBlock.getStatementByName("relations");
        if(refStmt !== null){
            const refList = refStmt.toBlockList();
            for (var k = 0; k < refList.length; k++){
                pClass.relations.push(readRelation(refList[k]))
            }
        }
        return pClass
    }
}
function readAttribute(attributeBlock){
    const name = attributeBlock.getFieldByName("name").getText();
    const type = attributeBlock.getFieldByName("type").getText();
    return new PAttribute(name,type);
}
function readRelation(relationBlock){
    const name = relationBlock.getFieldByName("name").getText();
    const type = relationBlock.getFieldByName("type").getText();
    const classname = relationBlock.getFieldByName("classname").getText();
    const cardinality = relationBlock.getFieldByName("cardinality").getText();
    return new PRelation(name,type,classname,cardinality);
}