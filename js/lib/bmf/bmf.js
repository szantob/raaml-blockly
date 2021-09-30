class Block{

    static createFromXML(xml){
        const type = xml.getAttribute("type");

        const inputArray = xml.getElementsByTagName("content")[0].getElementsByTagName("input"); //TODO

        const tooltip = xml.getElementsByTagName("tooltip")[0].innerHTML; //TODO
        const helpurl = xml.getElementsByTagName("helpurl")[0].innerHTML; //TODO
        const color = xml.getElementsByTagName("color")[0].innerHTML; //TODO

        Blockly.Blocks[type] = {
            init: function (){

                for(let i = 0; i < inputArray.length; i++){
                    const input = inputArray[i];
                    const type = input.getAttribute("type");
                    let blockInput;
                    switch (type) {
                        case "dummy":
                            blockInput = this.appendDummyInput();
                            break;
                        default:
                            throw "lusta"
                    }
                    const fieldArray = input.getElementsByTagName("field");
                    for(let i = 0; i < fieldArray.length; i++){
                        const field = fieldArray[i];
                        const name = field.getAttribute("name");
                        const type = field.getAttribute("type");
                        switch (type) {
                            case "textinput":
                                const content = field.innerHTML;
                                blockInput.appendField(new Blockly.FieldTextInput(content), name);
                                break;
                            case "dropdown":
                                const optionList = field.getElementsByTagName("option");
                                const options = [];
                                for(let i = 0; i < optionList.length; i++){
                                    const option = optionList[i];
                                    const id = option.getAttribute("id"); //TODO
                                    const text = option.innerHTML; //TODO

                                    options.push([text.toString(),id.toString()]);
                                }

                                blockInput.appendField(new Blockly.FieldDropdown(options), name)
                                break;
                            default:
                                throw "lusta"
                        }
                    }
                }

                this.setColour(color);
                this.setTooltip(tooltip);
                this.setHelpUrl(helpurl);
            }
        }
        /*Blockly.Blocks['message_attribute'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField(new Blockly.FieldDropdown([["String","0"], ["Integer","1"], ["Bool","2"]]), "type")
                    .appendField(new Blockly.FieldTextInput("name"), "name");
                this.setPreviousStatement(true, "attribute-type");
                this.setNextStatement(true, "attribute-type");
                this.setColour(45);
                this.setTooltip("");
                this.setHelpUrl("");
            }
        };*/
    }
}

class Toolbox{
    constructor(toolboxElement,toolboxXML) {
        const type = toolboxXML.getAttribute("type");
        if(type === "static") {
            //TODO
        }
        this.element = toolboxElement;
        this.xml = toolboxXML;
    }
    initialize(workspace){
        const parser = new DOMParser();
        const root = parser.parseFromString(this.defaultXml,"text/xml").getElementsByTagName("xml")[0];
        const contentList = this.xml.childNodes;
        for(let i = 0; i < contentList.length; i++){
            console.log(root);
            root.a
            console.log(root);
        }

        console.log(content)
        workspace.updateToolbox(root.toXml());
    }
}

class AbstractBMFWorkspace{
    options = {
        toolbox     : null,
        collapse    : true,
        comments    : true,
        disable     : true,
        maxBlocks   : Infinity,
        trashcan    : false,
        horizontalLayout : false,
        toolboxPosition : 'start',
        css         : true,
        media       : 'https://blockly-demo.appspot.com/static/media/',
        rtl         : false,
        scrollbars  : true,
        sounds      : true,
        oneBasedIndex : true,
        grid        : {},
        zoom        : {}
    }
    workspace = null;
    workspaceDIV = null;
    workspaceArea = null;

    enableCollapse(value){this.options.collapse = value === true}
    enableComments(value){this.options.comments = value === true}
    enableBlockDisable(value){this.options.disable = value === true}
    enableTrashcan(value){this.options.trashcan = value === true}
    enableCSS(value){this.options.css = value === true}
    enableRTL(value){this.options.rtl = value === true}
    enableSounds(value){this.options.sounds = value === true}
    enableScrollbars(value){this.options.scrollbars = value === true}
    enableOneBasedIndex(value){this.options.oneBasedIndex = value === true}

    setPathToBlockly(value){this.options.media = value}

    setGrid(spacing, length, colour, snap){
        this.options.grid = {
            spacing : spacing,
            length : length,
            colour : colour,
            snap : snap
        }
    }
    removeGrid(){this.options.grid = {}}

    setZoom(controls,wheel,startScale,maxScale,minScale,scaleSpeed){
        this.options.zoom = {
            controls : controls,
            wheel : wheel,
            startScale : startScale,
            maxScale : maxScale,
            minScale : minScale,
            scaleSpeed : scaleSpeed
        }
    }
    removeZoom(){this.options.zoom = {}}

    setMaxBlocks(value){this.options.maxBlocks = value}
    setInfiniteBlocks(){this.options.maxBlocks = Infinity}

    setToolboxHorizontal(){this.options.horizontalLayout = true}
    setToolboxVertical(){this.options.horizontalLayout = false}
    setToolboxEnd(){this.options.toolboxPosition = 'end'}
    setToolboxStart(){this.options.toolboxPosition = 'start'}

    setToolbox(toolbox){this.options.toolbox = toolbox}

    /*constructor(xmldom) {

        const toolboxName = divname + "_toolbox"
        const workspaceName = divname + "_workspace"

        const options = xmldom.getElementsByTagName("options");
        if(options.length === 0)   {this.options = new WorkspaceOptions()}

        const toolboxL = xmldom.getElementsByTagName("toolbox");
        if(toolboxL.length > 1) console.warn("Multiple Toolbox elements defined.")
        let toolboxContent;
        if(toolboxL.length === 1){
            toolboxContent = toolboxL[0].getElementsByTagName("xml")[0]; //TODO
            toolboxContent.setAttribute("id",toolboxName);
        }else{
            const parser = new DOMParser();
            toolboxContent = parser.parseFromString("<xml xmlns=\"https://developers.google.com/blockly/xml\" id=\""+toolboxName+"\" style=\"display: none\"></xml>\n","text/xml");
        }
        div.innerHTML = //TODO minden szépet és jót annak akinek az XML implementációja miatt 2 órája itt ülhetek
            "<xml xmlns=\"https://developers.google.com/Blockly/xml\" id=\""+toolboxName+"\" style=\"display: none\"><block type=\"message_attribute\"/></xml>\n" +
            "<xml xmlns=\"https://developers.google.com/blockly/xml\" id=\""+workspaceName+"\" style=\"display: none\"></xml>"
        const toolboxElement = document.getElementById(toolboxName);
        const toolbox = new Toolbox(toolboxElement,toolboxL[0]);

        this.div = div;
        this.area = area;
        this.options.setToolbox(toolboxElement);
        this.toolbox = toolbox;
    }*/

    inject(){
        if (this.workspaceDIV === null) throw "WorkspaceDIV undefined";
        this.workspace = Blockly.inject(this.workspaceDIV,this.options);
    }
    getWorkspaceDOM(){
        return Blockly.Xml.workspaceToDom(this.workspace);
    }
    getWorkspaceXML(){
        return Blockly.Xml.domToText(this.getWorkspaceDOM());
    }
    updateWorkspace(dom){
        Blockly.Xml.domToWorkspace(dom, this.workspace);
    }
    updateWorkspaceXML(xml){
        this.updateWorkspace(Blockly.Xml.textToDom(xml));
    }
    clear(){
        this.workspace.clear();
        this.updateWorkspaceXML("<xml xmlns=\"https://developers.google.com/blockly/xml\" id=\"workspace\" style=\"display: none\"></xml>");
    }

    onresize() {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        let element = this.workspaceArea;
        let x = 0;
        let y = 0;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        // Position blocklyDiv over blocklyArea.
        this.workspaceDIV.style.left = x + 'px';
        this.workspaceDIV.style.top = y + 'px';
        this.workspaceDIV.style.width = this.area.offsetWidth + 'px';
        this.workspaceDIV.style.height = this.area.offsetHeight + 'px';
        Blockly.svgResize(this.workspace);
    }
}

class BlocklyModellingFramework{

    /*constructor(modelXmlPath) {
        this.state = "initial";
        this.model = null;
        this.workspaceArray = [];


        function onXMLLoaded() {
            console.log("KAKADU");
            if (this.readyState === 4 && this.status === 200) {
                const parser = new DOMParser();
                this.model = parser.parseFromString(xhttp.responseText,"text/xml");
                this.state = "loaded";
            }else{
                throw "Error"
                //TODO
            }
        }
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = onXMLLoaded;
        xhttp.open("GET", modelXmlPath, true);
        xhttp.send();
        this.state = "loading";
    }*/
    getWorkspaceXML(i){
        if(i < 0) throw "Invalid index";
        if(i >= this.workspaceArray.length) throw "Invalid index";
        return this.workspaceArray[i].getWorkspaceXML();
    }
    setWorkspaceXML(i,xml){
        if(i < 0) throw "Invalid index";
        if(i >= this.workspaceArray.length) throw "Invalid index";
        this.workspaceArray[i].setWorkspaceXML(xml);
    }
    onloadCallback(){
        console.log(this.state);
        if(this.state === "initial") throw "Model loaded"
        /*while(this.state !== "loaded") {
            //TODO
        }*/

        const blocksArray = this.model.getElementsByTagName("blocks");
        if(blocksArray.length !== 1) console.warn("Multiple block definition list.");
        const blockList = blocksArray[0].getElementsByTagName("block");
        for (let i = 0; i < blockList.length; i++){
            Block.createFromXML(blockList[0])
            //TODO process blocks
            //console.log(blockList[i]);
        }

        const workspacesArray = this.model.getElementsByTagName("workspaces");
        if(workspacesArray.length !== 1) console.warn("Multiple workspace definition list.");
        const workspaceList = workspacesArray[0].getElementsByTagName("workspace");
        for (let i = 0; i < workspaceList.length; i++){
            const workspace = new Workspace(workspaceList[0]);
            this.workspaceArray.push(workspace);
            workspace.inject();
        }
    }
}