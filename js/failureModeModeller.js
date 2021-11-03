class FailureModeModel{
    constructor(){
        this.modelElements = [];
    }

    updateProfile(profile) {
        this.modelElements = [];
        const elemets = profile.classes;
        for (let i = 0; i < elemets.length; i++){
            this.modelElements.push(new failureModeModelElement(elemets[i]));
        }
    }
    updateBlocklyWorkspace(blocklyWorkspace){
        for(let i = 0; i < this.modelElements.length; i++) {
            const element = this.modelElements[i];
            const classBlock = BlockDOM.create("elementtypegen")
            classBlock.setFieldText("name",element.name)
            classBlock.setPos(40,30*i);
            for (let j = 0; j < element.attributes.length; j++) {
                const attribute = element.attributes[j];
            }
            for (let j = 0; j < element.relations.length; j++) {
                const relation = element.relations[j];
            }
            blocklyWorkspace.add(classBlock);
        }
        workspace.updateWorkspace(blocklyWorkspace.xml)
    }
}

class transferMatrix{
    constructor(element, relations) {
        this.parent = element;
        this.nameList = [];
        this.matrix = [];
        this.nameList.push(this.parent.name);
        this.matrix.push([]);
        for(let j= 0; j < this.size; j++){
            this.matrix[0].push(null)//TODO
        }
        if(relations === undefined) return null;
        this.size = relations.length + 1
        for (let i = 0; i < relations.length; i++) {
            this.nameList.push(relations[i]);
            this.matrix.push([]);
            for(let j= 0; j < this.size; j++){
                this.matrix[i+1].push(null)//TODO
            }
        }
    }
}
class failureModeModelElement{
    constructor(element) {
        this.name = element.name;

        this.matrix = new transferMatrix(this,element.relations)
        this.attributes = element.attributes //TODO
        this.relations = element.relations //TODO
    }
}

class failureModeRelation{
    constructor(name) {
        this.name = name;
        this.variables = [];
    }
}