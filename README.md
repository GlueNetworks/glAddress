# Glue Branded Address
## Overview
An interface to both view and edit a address. It provides both an editable input field as well as a static visual view.

## States

* Invalid
* Invalid + Message
* disabled
* View  - (label + value) and is not an option for password type

## HTML

    <gl-address api="myApi" settings="mySettings"></gl-address>

## Settings

* name - required by angular forms
* disabled
* editable
* value - an object with properties: street, street2, city, state, zip, country
* valid - true/false
* error - init with an error message. requires valid to be false in order to be displayed
* onChange = define a event handler for onChange. We fire this when the value actually changes unlike native browsers which only call it on blur

### Example 

    var mySettings = {
      name: "myAddr",
      editable: true,
      label: "Addr",
      value: {street:"666 Sesame St.",city:"Sacramento",state:"CA",zip:"95814",country:"US"},
      invalid: false,
      disabled: false,
      onChange: function(val,obj){ 
        console.log(val);
        console.log(obj.settings.name); // references to the settings obj
      }
    };

## API Methods

* view
* edit
* setValue
* getValue
* setInvalid
* setValid
* enable
* disable

### Example API

    var myApi = {};
    
    // Api Method call examples
    myApi.disable();     // Disabled the input fields leaving text visible but not editable.
    myApi.enable();      // Enables editing of the input fields
    myApi.setValue("abc");  // Sets the value of the input fields
    myApi.getValue();       // returns an object literal: {street:"666 Sesame St.",city:"Sacramento",state:"CA",zip:"95814",country:"US"}
    myApi.setInvalid();   // makes all fields invalid
    myApi.setInvalid("Danger");   // adds the "gl-invalid" input class plus displays the invalid message text.
    myApi.edit();        // enables edit mode
    myApi.view();        // enables view mode
    
