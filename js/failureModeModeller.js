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
        console.log(JSON.stringify(this),null,'\t');
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
            el.attributes.push(FailureModeModelElementAttribute.readResilBlockly(element.attributes[i]));
        }
        for (let i = 0; i < element.relations.length; i++){
            el.relations.push(FailureModeModelElementRelation.readResilBlockly(element.relations[i]));
        }
        return el;
    }
    static readJSON(jsonObject){
        const el = new failureModeModelElement();
        el.name = jsonObject.name;
        for (let i = 0; i < jsonObject.relations.length; i++){
            el.relations.push(FailureModeModelElementRelation.readJSON(jsonObject.relations[i]));
        }
        for (let i = 0; i < jsonObject.attributes.length; i++){
            el.attributes.push(FailureModeModelElementAttribute.readJSON(jsonObject.attributes[i]));
        }
        for (let i = 0; i < jsonObject.regularModes.length; i++){
            el.regularModes.push(FailureModeModelElementRegularMode.readJSON(jsonObject.regularModes[i]));
        }
        for (let i = 0; i < jsonObject.failureModes.length; i++){
            el.failureModes.push(FailureModeModelElementFailureMode.readJSON(jsonObject.failureModes[i]));
        }
        return el;
    }
}
class FailureModeModelElementAttribute extends FailureModeModelObject{
    constructor(elementAttribute) {
        super()
        //TODO
    }
    static readResilBlockly(){

    }
    static readJSON(){

    }
}
class FailureModeModelElementRelation extends FailureModeModelObject{
    constructor(relation) {
        super()
        this.name = "";
        this.classname = "";
        //this.cardinality = "";                        ResilBlockly info not in use
        //this.type = "";                               ResilBlockly info not in use
        this.variables = [];
    }
    static readResilBlockly(relation){
        const er = new FailureModeModelElementRelation()
        er.name = relation.name;
        er.classname = relation.classname;
        //er.cardinality = relation.cardinality;      ResilBlockly info not in use
        //er.type = relation.type;                    ResilBlockly info not in use
        return er;
    }
    static readJSON(){

    }
}
class FailureModeModelElementRegularMode extends FailureModeModelObject{
    constructor() {
        super();
    }
    static readJSON(){

    }
}
class FailureModeModelElementFailureMode extends FailureModeModelObject{
    constructor() {
        super();
        this.name = "";
        this.modes = [];
    }
    static readJSON(){

    }
}
