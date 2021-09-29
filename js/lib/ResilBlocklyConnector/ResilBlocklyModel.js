class Model{
    elementIdMap = []
    elements = []

    constructor(modelXMLString,profile) {
        this.profile = profile;

        const modelDOM = new DOMParser().parseFromString(modelXMLString,"text/xml");
        const modelWS = new WorkspaceDOM(modelDOM);

        const blocks = modelWS.getBlocks();
        for (let i = 0; i < blocks.length; i++){
            this.pass1(blocks[i])
        }
        for (let i = 0; i < blocks.length; i++){
            this.pass2(blocks[i],this.profile)
        }
    }
    pass1(block){
        if(block.getType() !== "Ref") {
            const name = block.getFieldByName("name").getText();
            const id = block.getId();

            for (let i = 0; i < this.elementIdMap.length; i++) {
                if (this.elementIdMap[i].name === name) throw "Duplicate unique name"
            }
            this.elementIdMap.push({name: name, id: id})
        }
    }
    pass2(block,profile){
        const type = block.getType();
        if(type !== "Ref") {
            const classType = profile.getClassByName(type);
            if(classType === null) throw "Class \""+type+"\" not defined"

            const element = {};
            element.type = classType.name;
            element.name = block.getFieldByName("name").getText();
            element.attributes = [];
            element.relations = [];

            this.readAttributes(block,classType.attributes,element)
            this.readRelations(block,classType.relations,element)

            this.elements.push(element);
        }
    }
    getElementNameById(id){
        for (let i = 0; i < this.elementIdMap.length; i++) {
            if (this.elementIdMap[i].id === id) return this.elementIdMap[i].name;
        }
    }
    readAttributes(block, attList, element){
        for(let i = 0; i < attList.length; i++){
            const attField = block.getFieldByName(attList[i].name.toLowerCase());
            if(attField !== null) {
                element.attributes.push({name:attList[i].name,value:attField.getText()})
            }
        }
    }
    readRelations(block, relList, element){
        for(let i = 0; i < relList.length; i++){
            const relStmt = block.getStatementByName(relList[i].name.toLowerCase());
            if(relStmt !== null){
                const relationBlockList = relStmt.toBlockList();
                for(let j = 0; j < relationBlockList.length; j++){
                    const relationId = relationBlockList[j].getFieldByName("referencedBlock").getText();
                    const relationName = this.getElementNameById(relationId);
                    element.relations.push({type:relList[i].name,to:relationName});
                }
            }
        }
    }
    toString(){
        let ret = "";
        for(let i = 0; i < this.elements.length; i++){
            const element = this.elements[i];
            ret += element.type + " : " + element.name + "\n";
            for(let j = 0; j < element.attributes.length; j++){
                const attribute = element.attributes[j];
                ret += "\t" + attribute.name + " : " + attribute.value + "\n"
            }
            for(let j = 0; j < element.relations.length; j++){
                const relation = element.relations[j];
                ret += "\t" + relation.type + " --> " + relation.to + "\n"
            }
        }
        return ret;
    }
}