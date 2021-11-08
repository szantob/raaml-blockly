class Workspace extends AbstractBMFWorkspace{
    constructor(area,div,toolbox) {
        super();
        this.options.toolbox = toolbox;
        this.workspaceDIV = div;
        this.workspaceArea = area;
    }
}

let model;
let profile;
const failureModeModel = new FailureModeModel();
let workspace = null;
let sideContentDIV;

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


    sideContentDIV = document.getElementById("sideTools");
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

    const resilBlocklyProfile = "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"menu\" id=\"~Of(}~A7vqEHfnj/6s8Q\" x=\"-386\" y=\"-469\"><field name=\"name\">Elements</field><statement name=\"items\"><block type=\"menuitem\" id=\"c5d[H1*6EVM}t^G=V1^H\"><field name=\"name\">Pipe</field><next><block type=\"menuitem\" id=\"Q]FMD[*72%1?O3|6VfVM\"><field name=\"name\">Tank</field><next><block type=\"menuitem\" id=\"myC`Y:lpwvk#ubzr0Xe0\"><field name=\"name\">ValveActuator</field><next><block type=\"menuitem\" id=\"qm*#zmO-huO%JAN)}b]`\"><field name=\"name\">Valve</field><next><block type=\"menuitem\" id=\"}!GU3Io[4wQC4~$J7t]2\"><field name=\"name\">WaterLevelSensor</field><next><block type=\"menuitem\" id=\"O_hp8)~g#6;w_d/]5LZ]\"><field name=\"name\">WaterQualitySensor</field></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type=\"class\" id=\"E$F#W!c,J.#CH{T?$zH!\" x=\"-568\" y=\"94\"><field name=\"name\">Pipe</field><field name=\"colour\">#cccccc</field><field name=\"superclass\"></field><statement name=\"attributes\"><block type=\"attribute\" id=\"hp6ca.c4$_v@=,wMHh7?\"><field name=\"name\">diameter</field><field name=\"type\">string</field></block></statement></block><block type=\"class\" id=\"3:_c43l0W}PpxPZ:U.``\" x=\"-328\" y=\"92\"><field name=\"name\">Tank</field><field name=\"colour\">#ffcc00</field><field name=\"superclass\"></field><statement name=\"attributes\"><block type=\"attribute\" id=\")T3R,A(_Z2JaJ@f/,)Vz\"><field name=\"name\">level</field><field name=\"type\">string</field></block></statement><statement name=\"relations\"><block type=\"relation\" id=\"[wF=kyq{jvJh`jI+c%(%\"><field name=\"name\">inputPipe</field><field name=\"classname\">Pipe</field><field name=\"type\">reference</field><field name=\"cardinality\">1</field><next><block type=\"relation\" id=\"abyHR)@yV=s+h#`td-5!\"><field name=\"name\">outputPipe</field><field name=\"classname\">Pipe</field><field name=\"type\">reference</field><field name=\"cardinality\">1</field></block></next></block></statement></block><block type=\"class\" id=\"tx7rVl$.oK.hn*;[phT.\" x=\"-47\" y=\"93\"><field name=\"name\">ValveActuator</field><field name=\"colour\">#33ccff</field><field name=\"superclass\"></field><statement name=\"relations\"><block type=\"relation\" id=\"-}]BSt6t:#dbR^iikFHe\"><field name=\"name\">valve</field><field name=\"classname\">Valve</field><field name=\"type\">reference</field><field name=\"cardinality\">1</field></block></statement></block><block type=\"class\" id=\"NF=/e:lpNDEt8:+ENrDh\" x=\"-577\" y=\"502\"><field name=\"name\">Valve</field><field name=\"colour\">#99ff99</field><field name=\"superclass\"></field><statement name=\"relations\"><block type=\"relation\" id=\"d+msGxjqZO[I_EW]Pt=v\"><field name=\"name\">inputPipe</field><field name=\"classname\">Pipe</field><field name=\"type\">reference</field><field name=\"cardinality\">1</field><next><block type=\"relation\" id=\"j^MnwPjJ3xKyFL`:-z4z\"><field name=\"name\">outputPipe</field><field name=\"classname\">Pipe</field><field name=\"type\">reference</field><field name=\"cardinality\">1</field></block></next></block></statement></block><block type=\"class\" id=\"n,BnlcXK|mFR3sHd.DH`\" x=\"-114\" y=\"494\"><field name=\"name\">Sensor</field><field name=\"colour\">#33ccff</field><field name=\"superclass\"></field></block><block type=\"class\" id=\"4sr4i$kt!,l(k2cyS7*T\" x=\"-279\" y=\"671\"><field name=\"name\">WaterLevelSensor</field><field name=\"colour\">#33ccff</field><field name=\"superclass\">Sensor</field><statement name=\"attributes\"><block type=\"attribute\" id=\"6j]Yu95,u=@#zAgX5KJs\"><field name=\"name\">waterLevel</field><field name=\"type\">string</field></block></statement></block><block type=\"class\" id=\"}Zp;[04,6qfAUH%fN1p_\" x=\"-20\" y=\"673\"><field name=\"name\">WaterQualitySensor</field><field name=\"colour\">#33ccff</field><field name=\"superclass\">Sensor</field><statement name=\"attributes\"><block type=\"attribute\" id=\"[c:cU1]6P/@Yuxglgx}[\"><field name=\"name\">waterQuality</field><field name=\"type\">string</field></block></statement></block></xml>";
    const resilBlocklyModel = "{\"blocklyXmlWorkspace\":\"PHhtbCB4bWxucz0iaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYmxvY2tseS94bWwiPjxibG9jayB0eXBlPSJQaXBlIiBpZD0iPXVwVXUlRXsudzdqTEs6LHEoOnciIHg9IjY3IiB5PSItMTgwIj48ZmllbGQgbmFtZT0ibmFtZSI+aW5wdXRQaXBlPC9maWVsZD48ZmllbGQgbmFtZT0iZGlhbWV0ZXIiPjE8L2ZpZWxkPjxuZXh0PjxibG9jayB0eXBlPSJQaXBlIiBpZD0iUVU6RkxDK2o1SFNBOF1lVyx8RlgiPjxmaWVsZCBuYW1lPSJuYW1lIj53YXRlclRhbmtJbnB1dFBpcGU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJkaWFtZXRlciI+MTwvZmllbGQ+PG5leHQ+PGJsb2NrIHR5cGU9IlBpcGUiIGlkPSJ8S3YhdGxwTSFtX0gzVFRIOylTUiI+PGZpZWxkIG5hbWU9Im5hbWUiPndhdGVyVGFua091dHB1dFBpcGU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJkaWFtZXRlciI+MTwvZmllbGQ+PG5leHQ+PGJsb2NrIHR5cGU9IlBpcGUiIGlkPSJva1VsOlg/P2ZseHc7XSk6UUk5bSI+PGZpZWxkIG5hbWU9Im5hbWUiPm91dHB1dFBpcGU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJkaWFtZXRlciI+MTwvZmllbGQ+PG5leHQ+PGJsb2NrIHR5cGU9IlBpcGUiIGlkPSJfc1ZGZzIsLzd7QjpqdCptW1l8aiI+PGZpZWxkIG5hbWU9Im5hbWUiPmNobG9yaW5lSW5wdXRQaXBlPC9maWVsZD48ZmllbGQgbmFtZT0iZGlhbWV0ZXIiPjE8L2ZpZWxkPjxuZXh0PjxibG9jayB0eXBlPSJQaXBlIiBpZD0iMFFeZVRLTCtGSDdrN3svQ3pSLTMiPjxmaWVsZCBuYW1lPSJuYW1lIj5jaGxvcmluZU91dHB1dFBpcGU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJkaWFtZXRlciI+MTwvZmllbGQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48YmxvY2sgdHlwZT0iVmFsdmUiIGlkPSJXOH1oPT1AUU1CM29Oc2UqZj1obCIgeD0iMzc4IiB5PSItMTY0Ij48ZmllbGQgbmFtZT0ibmFtZSI+aW5wdXRWYWx2ZTwvZmllbGQ+PGZpZWxkIG5hbWU9ImFkZEJsb2NrIj48L2ZpZWxkPjxmaWVsZCBuYW1lPSJhZGRCbG9jayI+PC9maWVsZD48c3RhdGVtZW50IG5hbWU9Im91dHB1dHBpcGUiPjxibG9jayB0eXBlPSJSZWYiIGlkPSJuVEZTZHVbbC9mLmV1eF1pT0A5SCI+PGZpZWxkIG5hbWU9InJlZmVyZW5jZWRCbG9jayI+cjNtcCptaU1KUCskNzszPXRmWW08L2ZpZWxkPjwvYmxvY2s+PC9zdGF0ZW1lbnQ+PG5leHQ+PGJsb2NrIHR5cGU9IlZhbHZlIiBpZD0iOG95cithKjp7RiQpX34yQXQ6MFkiPjxmaWVsZCBuYW1lPSJuYW1lIj5vdXRwdXRWYWx2ZTwvZmllbGQ+PGZpZWxkIG5hbWU9ImFkZEJsb2NrIj48L2ZpZWxkPjxmaWVsZCBuYW1lPSJhZGRCbG9jayI+PC9maWVsZD48c3RhdGVtZW50IG5hbWU9ImlucHV0cGlwZSI+PGJsb2NrIHR5cGU9IlJlZiIgaWQ9InFnb2IuNVJfZDM4PVF4YiVKN1sqIj48ZmllbGQgbmFtZT0icmVmZXJlbmNlZEJsb2NrIj5yM21wKm1pTUpQKyQ3OzM9dGZZbTwvZmllbGQ+PC9ibG9jaz48L3N0YXRlbWVudD48bmV4dD48YmxvY2sgdHlwZT0iVmFsdmUiIGlkPSJ+WDpmbU90aFB8UyppNCNBTVUyMiI+PGZpZWxkIG5hbWU9Im5hbWUiPmNobG9yaW5lVmFsdmU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJhZGRCbG9jayI+PC9maWVsZD48ZmllbGQgbmFtZT0iYWRkQmxvY2siPjwvZmllbGQ+PHN0YXRlbWVudCBuYW1lPSJpbnB1dHBpcGUiPjxibG9jayB0eXBlPSJSZWYiIGlkPSJ4U2A4e34hbjUqPVt4LUBDV0g0VSI+PGZpZWxkIG5hbWU9InJlZmVyZW5jZWRCbG9jayI+ZWxaNDpIJFQxUktTRmRmLUdULV88L2ZpZWxkPjwvYmxvY2s+PC9zdGF0ZW1lbnQ+PHN0YXRlbWVudCBuYW1lPSJvdXRwdXRwaXBlIj48YmxvY2sgdHlwZT0iUmVmIiBpZD0idlNeMXF5dGA4X0ZsYCx9L3BGaW0iPjxmaWVsZCBuYW1lPSJyZWZlcmVuY2VkQmxvY2siPnIzbXAqbWlNSlArJDc7Mz10ZlltPC9maWVsZD48L2Jsb2NrPjwvc3RhdGVtZW50PjwvYmxvY2s+PC9uZXh0PjwvYmxvY2s+PC9uZXh0PjwvYmxvY2s+PGJsb2NrIHR5cGU9IlZhbHZlQWN0dWF0b3IiIGlkPSJWLDpTRDZWeSs2bkw2aVA1aXVOZyIgeD0iODQwIiB5PSItMTQ2Ij48ZmllbGQgbmFtZT0ibmFtZSI+aW5wdXRWYWx2ZUFjdHVhdG9yPC9maWVsZD48ZmllbGQgbmFtZT0iYWRkQmxvY2siPjwvZmllbGQ+PG5leHQ+PGJsb2NrIHR5cGU9IlZhbHZlQWN0dWF0b3IiIGlkPSI5N1ZHcUdxPVNoZW4jLnxBQ2FrMyI+PGZpZWxkIG5hbWU9Im5hbWUiPm91dHB1dFZhbHZlQWN0dWF0b3I8L2ZpZWxkPjxmaWVsZCBuYW1lPSJhZGRCbG9jayI+PC9maWVsZD48bmV4dD48YmxvY2sgdHlwZT0iVmFsdmVBY3R1YXRvciIgaWQ9Ii8/SDFtRmE9YkliQlUsXyw6RyUjIj48ZmllbGQgbmFtZT0ibmFtZSI+Y2hsb3JpbmVhbHZlQWN0dWF0b3I8L2ZpZWxkPjxmaWVsZCBuYW1lPSJhZGRCbG9jayI+PC9maWVsZD48L2Jsb2NrPjwvbmV4dD48L2Jsb2NrPjwvbmV4dD48L2Jsb2NrPjxibG9jayB0eXBlPSJUYW5rIiBpZD0icjNtcCptaU1KUCskNzszPXRmWW0iIHg9Ijk5IiB5PSI0NjciPjxmaWVsZCBuYW1lPSJuYW1lIj53YXRlclRhbms8L2ZpZWxkPjxmaWVsZCBuYW1lPSJsZXZlbCI+bm9ybWFsPC9maWVsZD48ZmllbGQgbmFtZT0iYWRkQmxvY2siPjwvZmllbGQ+PGZpZWxkIG5hbWU9ImFkZEJsb2NrIj48L2ZpZWxkPjxuZXh0PjxibG9jayB0eXBlPSJUYW5rIiBpZD0iZWxaNDpIJFQxUktTRmRmLUdULV8iPjxmaWVsZCBuYW1lPSJuYW1lIj5jaGxvcmluZVRhbms8L2ZpZWxkPjxmaWVsZCBuYW1lPSJsZXZlbCI+bm9ybWFsPC9maWVsZD48ZmllbGQgbmFtZT0iYWRkQmxvY2siPjwvZmllbGQ+PGZpZWxkIG5hbWU9ImFkZEJsb2NrIj48L2ZpZWxkPjwvYmxvY2s+PC9uZXh0PjwvYmxvY2s+PGJsb2NrIHR5cGU9IldhdGVyTGV2ZWxTZW5zb3IiIGlkPSJzfF1ObllrfEozQF5CYmVSb3lFMyIgeD0iNzgxIiB5PSI1MzEiPjxmaWVsZCBuYW1lPSJuYW1lIj53YXRlckxldmVsU2Vuc29yPC9maWVsZD48ZmllbGQgbmFtZT0id2F0ZXJMZXZlbCI+PC9maWVsZD48L2Jsb2NrPjxibG9jayB0eXBlPSJXYXRlclF1YWxpdHlTZW5zb3IiIGlkPSIhMGg3N2Y2IzU9cnt0aGV6LEA4NyIgeD0iNzc5IiB5PSI2NjQiPjxmaWVsZCBuYW1lPSJuYW1lIj53YXRlclF1YWxpdHlTZW5zb3I8L2ZpZWxkPjxmaWVsZCBuYW1lPSJ3YXRlclF1YWxpdHkiPjwvZmllbGQ+PC9ibG9jaz48L3htbD4=\",\"additionalData\":\"W3sicmVmQmxvY2tJZCI6Im5URlNkdVtsL2YuZXV4XWlPQDlIIiwiZmllbGRJZFZhbHVlIjoicjNtcCptaU1KUCskNzszPXRmWW0ifSx7InJlZkJsb2NrSWQiOiJxZ29iLjVSX2QzOD1ReGIlSjdbKiIsImZpZWxkSWRWYWx1ZSI6InIzbXAqbWlNSlArJDc7Mz10ZlltIn0seyJyZWZCbG9ja0lkIjoieFNgOHt+IW41Kj1beC1AQ1dINFUiLCJmaWVsZElkVmFsdWUiOiJlbFo0OkgkVDFSS1NGZGYtR1QtXyJ9LHsicmVmQmxvY2tJZCI6InZTXjFxeXRgOF9GbGAsfS9wRmltIiwiZmllbGRJZFZhbHVlIjoicjNtcCptaU1KUCskNzszPXRmWW0ifV0=\"}";

    //const resilBlocklyProfile = prompt("Profile text:", "");
    //const resilBlocklyModel = prompt("Model text:", "");
    const modelStr = atob(JSON.parse(resilBlocklyModel).blocklyXmlWorkspace);

    profile = new Profile(resilBlocklyProfile);
    model = new Model(modelStr, profile);

    failureModeModel.updateProfile(profile);
    failureModeModel.updateBlocklyWorkspace(blocklyWs);
    console.log(failureModeModel)

    for(let i = 0; i < profile.classes.length; i++) {
        const pclass = profile.classes[i];
        const classBlock = BlockDOM.create("elementtypegen")
        classBlock.setFieldText("name",pclass.name)
        classBlock.setPos(40,30*i);
        let commentString = "Attributes: {\n"
        for (let j = 0; j < pclass.attributes.length; j++) {
            const attribute = pclass.attributes[j];
            commentString += "  " + attribute.type + ":" + attribute.name + ";\n"
        }
        commentString += "}\nRelations: {\n";
        for (let j = 0; j < pclass.relations.length; j++) {
            const relation = pclass.relations[j];
            console.log(relation)
            commentString += "  " + relation.name + "-->" + relation.classname + ";\n"
        }
        commentString += "}";
        classBlock.setComment(CommentDOM.create(commentString));
        blocklyWs.add(classBlock);
    }
    console.log(blocklyWs.xml)
    workspace.updateWorkspace(blocklyWs.xml)
}

function onShowModelElement(id){
    const wsdom = new WorkspaceDOM(workspace.getWorkspaceDOM());
    const blockdom = wsdom.getBlockById(id);
    const name = blockdom.getFieldByName("name").getText();
    const profileClass = profile.getClassByName(name);
    const references = profileClass.relations;
    if(references.length === 0) return;


    let htmltext = "<table>\n\t<tr>\n\t\t<td></td>\n"
    for(let i = 0; i < references.length; i++){
        htmltext += "\t\t<td>"+references[i].name+"</td>\n"
    }
    htmltext += "\t</tr>\n"

    for(let i = 0; i < references.length; i++){
        htmltext += "\t</tr>\n\t\t<td>"+references[i].name+"</td>\n"
        for(let j = 0; j < references.length; j++) {
            htmltext += "\t\t<td></td>\n"
        }
        htmltext += "\t</tr>\n"
    }
    htmltext += "</table>"
    sideContentDIV.innerHTML = htmltext;
}

function setSideContent(){
    sideContentDIV.innerText = "asd";
}
function onNewFailureMode(id){
    const wsdom = new WorkspaceDOM(workspace.getWorkspaceDOM());
    const blockdom = wsdom.getBlockById(id);
    //TODO
}

window.onload = onLoad;