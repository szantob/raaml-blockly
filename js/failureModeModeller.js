class FailureModeModelObject{
    static readResilBlockly(){throw "Unimplemented"}
    static readJSON(){throw "Unimplemented"}
}

class FailureModeModel{
    constructor(){
        this.modelElements = [];
    }

    updateProfile(profile) {
        this.modelElements = [];
        const elemets = profile.classes;
        for (let i = 0; i < elemets.length; i++){
            this.modelElements.push(failureModeModelElement.readResilBlockly(elemets[i]));
        }
        console.log(this);
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

class failureModeModelElement extends FailureModeModelObject{
    constructor() {
        super();
        this.name = "";
        this.relations = [];
        this.attributes = [];
        this.regularModes = [];
        this.failureModes = [];
    }

    getRelation(name){
        for (let i = 0; i < this.relations.length; i++){
            if(this.relations[i].name === name) return this.relations[i];
        }
        return null;
    }

    static readResilBlockly(element){
        const el = new failureModeModelElement();
        el.name = element.name;
        for (let i = 0; i < element.attributes.length; i++){
            el.attributes.push(new failureModeModelElementAttribute().readResilBlockly(element.attributes[i]));
        }
        for (let i = 0; i < element.relations.length; i++){
            el.relations.push(new failureModeModelElementRelation().readResilBlockly(element.relations[i]));
        }
        return el;
    }
    readJSON(jsonObject){
        this.name = jsonObject.name;
        for (let i = 0; i < jsonObject.relations.length; i++){
            this.relations.push(new failureModeModelElementRelation(jsonObject.relations[i]));
        }
        for (let i = 0; i < jsonObject.attributes.length; i++){
            this.attributes.push(new failureModeModelElementAttribute(jsonObject.attributes[i]));
        }
        for (let i = 0; i < jsonObject.regularModes.length; i++){
            this.regularModes.push(new failureModeModelElementRegularMode(jsonObject.regularModes[i]));
        }
        for (let i = 0; i < jsonObject.failureModes.length; i++){
            this.failureModes.push(new failureModeModelElementFailureMode(jsonObject.failureModes[i]));
        }
    }
}
class failureModeModelElementAttribute extends FailureModeModelObject{
    constructor(elementAttribute) {
        super()
        //TODO
    }
    readResilBlockly(){

    }
    readJSON(){

    }
}
class failureModeModelElementRelation extends FailureModeModelObject{
    constructor(relation) {
        super()
        this.name = "";
        this.classname = "";
        //this.cardinality = "";                        ResilBlockly info not in use
        //this.type = "";                               ResilBlockly info not in use
        this.variables = [];
    }
    readResilBlockly(relation){
        this.name = relation.name;
        this.classname = relation.classname;
        //this.cardinality = relation.cardinality;      ResilBlockly info not in use
        //this.type = relation.type;                    ResilBlockly info not in use
    }
    readJSON(){

    }
}
class failureModeModelElementRegularMode extends FailureModeModelObject{
    readResilBlockly(){

    }
    readJSON(){

    }
}
class failureModeModelElementFailureMode extends FailureModeModelObject{
    readResilBlockly(){

    }
    readJSON(){

    }
}
