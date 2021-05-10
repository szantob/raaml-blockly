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
    Blockly.Xml.domToWorkspace("<xml xmlns=\"https://developers.google.com/blockly/xml\" id=\"workspace\" style=\"display: none\"></xml>", workspace);
}
function onExport(){
    const wsDOM = workspace.getWorkspaceDOM();
    const generator = new ModelGenerator(wsDOM);
    /*const lineArray = generator.generate();
    for(let i = 0; i < lineArray.length; i++){
        console.log(lineArray[i]);
    }*/
}
window.onload = onLoad;