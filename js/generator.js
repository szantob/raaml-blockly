class ModelGenerator{
    constructor(domObject){
        this.root = new WorkspaceDOM(domObject);

        this.references = {};
        this.model = {};
        const root = new WorkspaceDOM(domObject);

        this.model.elements = [];

        const elements = root.getRootBlocksByType('elementtype');
        for(let i = 0; i < elements.length; i++){
            this.model.elements.push(this.readElement(elements[i]));
        }
        console.log(this.model);
    }
    readElement(element){
        const model = {}
        model.name = element.getFieldText("name");
        model.failureModes = [];

        const failureModesStmt = element.getStatementByName("failureModes");
        if(failureModesStmt !== null){
            const failureModes = failureModesStmt.toBlockList();
            for(let i = 0; i < failureModes.length; i++){
                const failureMode = failureModes[i]
                model.failureModes.push(this.readFailureMode(failureMode));
            }
        }
        return model;
    }
    readFailureMode(failureMode){
        const model = {}
        model.name = failureMode.getFieldText("name");

        model.conditions = [];
        model.effects = [];

        const conditionsStmt = failureMode.getStatementByName("condition");
        if(conditionsStmt !== null){
            const conditions = conditionsStmt.toBlockList();
            for(let i = 0; i < conditions.length; i++){
                const condition = conditions[i]
                const name = condition.getFieldText("name");
                const type = condition.get

                model.conditions.push({name:name});
            }
        }
        const effectsStmt = failureMode.getStatementByName("effect");
        if(effectsStmt !== null){
            const effects = effectsStmt.toBlockList();
            for(let i = 0; i < effects.length; i++){
                const effect = effects[i]
                model.effects.push();
            }
        }

        return model;
    }
    generate(){
        const lineArray = [];
        const tab = "  ";


        lineArray.push("system " + this.model.name + " {")

        for(let i = 0; i < this.model.messages.length; i++){
            this.generateMessage(this.model.messages[i], lineArray, tab);
        }
        for(let i = 0; i < this.model.topics.length; i++){
            this.generateTopic(this.model.topics[i],lineArray,tab);
        }
        for(let i = 0; i < this.model.nodes.length; i++){
            this.generateNode(this.model.nodes[i],lineArray,tab);
        }
        lineArray.push("}")

        return lineArray;
    }
    generateMessage(message, lineArray, tabs) {
        lineArray.push(tabs + "message " + message.name + " {");

        for(let i = 0; i < message.attributes.length; i++){
            const att = message.attributes[i]
            lineArray.push(tabs + tabs + att.name + ":" + att.type + ";");
        }

        lineArray.push(tabs + "}");
    }
}