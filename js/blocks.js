Blockly.Blocks['scenario'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Scenario:")
            .appendField(new Blockly.FieldTextInput("default"), "NAME");
        this.appendStatementInput("NAME")
            .setCheck(["Scenario", "Cause"]);
        this.setPreviousStatement(true, "Scenario");
        this.setNextStatement(true, ["Scenario", "Effect", "FailureMode"]);
        this.setColour(345);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['cause'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Cause:")
            .appendField(new Blockly.FieldTextInput("default"), "name");
        this.appendDummyInput()
            .appendField("occurrence: ")
            .appendField(new Blockly.FieldNumber(0, 0, 1, 0.00001), "occurrence");
        this.setPreviousStatement(true, "Cause");
        this.setNextStatement(true, ["Scenario", "Effect", "FailureMode"]);
        this.setColour(15);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['failuremode'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck("EffectFactor")
            .appendField("FailureMode:")
            .appendField(new Blockly.FieldTextInput("default"), "name")
            .appendField("on:");
        this.appendDummyInput()
            .appendField("detectability:")
            .appendField(new Blockly.FieldNumber(0, 0, 1, 0.00001), "occurrence");
        this.setInputsInline(false);
        this.setPreviousStatement(true, "FailureMode");
        this.setNextStatement(true, ["Scenario", "Effect", "FailureMode"]);
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['effect'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Effect:")
            .appendField(new Blockly.FieldTextInput("default"), "name");
        this.appendDummyInput()
            .appendField("severity:")
            .appendField(new Blockly.FieldNumber(0, 0, 1, 0.00001), "occurrence");
        this.setPreviousStatement(true, "Effect");
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['risk'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("default"), "NAME");
        this.appendDummyInput()
            .appendField("score:")
            .appendField(new Blockly.FieldNumber(0), "score");
        this.appendStatementInput("NAME")
            .setCheck(["Scenario", "Cause"]);
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['logical'] = {
    init: function() {
        this.appendStatementInput("a")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["and","OPTIONNAME"], ["or","OPTIONNAME"]]), "logic");
        this.appendStatementInput("b")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['elementtype'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Element:")
            .appendField(new Blockly.FieldTextInput("name"), "name");
        this.appendDummyInput()
            .appendField("FailureModes:");
        this.appendStatementInput("failureModes")
            .setCheck("ElementTypeFailureMode");
        this.setColour(125);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['elementtypegen'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabelSerializable(""), "name");
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabel("FailureModes:"));
        this.appendStatementInput("failureModes")
            .setCheck("ElementTypeFailureMode");
        this.setColour(125);
        this.setTooltip("FailureModes");
        this.setHelpUrl("");
        this.customContextMenu = function(options) {
            options[0] = options[1]; //Remove Duplicate[0] + Shift Add Comment[1]
            options[1] = options[3]; //Remove Inline Inputs[2] + Shift Collapse Block[3]
            options[2] = options[4]; //Shift Disable[4]
            options[3] = {text:"Add Failure Mode",enabled:true,callback:onAddNewFailureModeCallbackFactory(this.id)} //Remove Delete[5]
            options[4] = {text:"Show transfer matrix",enabled:true, callback:onShowReferenceMatrixCallbackFactory(this.id)}
            options[5] = options[6]; //Shift Help[6]
            options[6] = null;
        };
    }
};
Blockly.Blocks['elementtypefailuremode'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("failureMode"), "name");
        this.appendStatementInput("condition")
            .setCheck("ElementTypeFailureModeCondition")
            .appendField("Conditions:");
        this.appendStatementInput("effect")
            .setCheck("ElementTypeFailureModeEffect")
            .appendField("Effects:");
        this.setPreviousStatement(true, "ElementTypeFailureMode");
        this.setNextStatement(true, "ElementTypeFailureMode");
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
        this.customContextMenu = function(options) {
        };
    }
};

Blockly.Blocks['elementtypefailuremodeeffect'] = {
    init: function() {
        this.appendValueInput("effectFactor")
            .setCheck("EffectFactor")
            .appendField(new Blockly.FieldTextInput("default"), "name")
            .appendField("on:");
        this.setPreviousStatement(true, "ElementTypeFailureModeEffect");
        this.setNextStatement(true, "ElementTypeFailureModeEffect");
        this.setColour(285);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['effectfactor'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("default"), "NAME");
        this.setOutput(true, "EffectFactor");
        this.setColour(30);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['elementtypefailuremodecondition'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("default"), "name")
            .appendField("Occurrence:")
            .appendField(new Blockly.FieldNumber(0, 0, 1, 0.00001), "NAME");
        this.setPreviousStatement(true, "ElementTypeFailureModeCondition");
        this.setNextStatement(true, "ElementTypeFailureModeCondition");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['elementtypefailuremodeconditiont'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck("EffectFactor")
            .appendField(new Blockly.FieldTextInput("default"), "name")
            .appendField("on:");
        this.setPreviousStatement(true, "ElementTypeFailureModeCondition");
        this.setNextStatement(true, "ElementTypeFailureModeCondition");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

function onShowModelElementCallbackFactory(id){
    return function (){
        onShowModelElement(id)
    }
}
function onAddNewFailureModeCallbackFactory(id){
    return function (){
        onNewFailureMode(id);
    }
}