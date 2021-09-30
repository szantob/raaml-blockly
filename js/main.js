class Workspace extends AbstractBMFWorkspace{
    constructor(area,div,toolbox) {
        super();
        this.options.trashcan = true;
        this.options.toolbox = toolbox;
        this.workspaceDIV = div;
        this.workspaceArea = area;
    }
}

let workspace = null;

function onSave(){
    const wsXML = workspace.getWorkspaceXML();
    window.localStorage.setItem("WorkspaceSave",wsXML);
}
function onLoad(){
    const div = document.getElementById("blocklyDiv");
    if(div === null) throw "Missing DIV"
    const area = document.getElementById("blocklyArea");
    if(area === null) throw "Missing Area"
    const toolbox = document.getElementById("toolbox");
    if(area === null) throw "Missing Toolbox"

    workspace = new Workspace(area,div,toolbox);
    workspace.inject();

    //workspace.onresize();

    /*const wsXML = window.localStorage.getItem("WorkspaceSave");
    if(wsXML !== null){
        workspace.updateWorkspaceXML(wsXML);
    }*/
}
function onInit(){
    workspace.clear();
}
function onExport(){
    const wsDOM = workspace.getWorkspaceDOM();
    const generator = new ModelGenerator(wsDOM);
    /*const lineArray = generator.generate();
    for(let i = 0; i < lineArray.length; i++){
        console.log(lineArray[i]);
    }*/
}
function onResilBlocklyImport(){
    workspace.clear();
    const blocklyWs = WorkspaceDOM.create();

    const resilBlocklyProfile = prompt("Profile text:", "");
    const resilBlocklyModel = prompt("Model text:", "");
    const modelStr = atob(JSON.parse(resilBlocklyModel).blocklyXmlWorkspace);

    const profile = new Profile(resilBlocklyProfile);
    const model = new Model(modelStr, profile);


    for(let i = 0; i < profile.classes.length; i++) {
        const pclass = profile.classes[i];
        const classBlock = BlockDOM.create("elementtypegen")
        classBlock.setFieldText("name",pclass.name)
        classBlock.setPos(40,30*i);
        for (let j = 0; j < pclass.attributes.length; j++) {
            const attribute = pclass.attributes[j];
        }
        for (let j = 0; j < pclass.relations.length; j++) {
            const relation = pclass.relations[j];
        }
        blocklyWs.add(classBlock);
    }
    workspace.updateWorkspace(blocklyWs.xml)
}

window.onload = onLoad;