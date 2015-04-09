/*! 
  glTextfield v(0.0.71) 
  (c) 2013-2015
  https://gluenetworks.kilnhg.com/Code/Web-Development
  Release Date: 2015-04-08 
*/
"use strict";

/**
 * @ngdoc overview
 * @name glTextfield
 */
angular.module("glTextfield", []), angular.module("glTextfield", []), angular.module("glTextfield").directive("glTextfield", [ "$compile", "$timeout", function($compile, $timeout) {
    return {
        restrict: "EA",
        replace: !0,
        scope: {
            settings: "=",
            api: "="
        },
        link: function(scope, element) {
            var elInput, elError, elLabel, elValue, classInput = "gl-textfield-input", classError = "gl-textfield-error", classLabel = "gl-textfield-view-label", classValue = "gl-textfield-view-value", classInvalid = "gl-invalid", classEmpty = "gl-empty", classCapsLock = "gl-caps-lock", classMouseOver = "gl-mouse-over", classNumberUpArrow = "gl-number-up-arrow-pressed", classNumberDownArrow = "gl-number-down-arrow-pressed", classNumberSpinner = "gl-number-mouseover-spinner";
            scope.api = scope.api || {}, scope.api._data = {}, scope.api._data.capsLocked = !1, 
            scope.api._data.numberMouseOverSpinner = !1, // MAP SETTINGS
            scope.api._data.name = angular.isUndefined(scope.settings.name) ? void 0 : scope.settings.name, 
            scope.api._data.id = angular.isUndefined(scope.settings.id) ? scope.settings.name : scope.settings.id, 
            scope.api._data.placeholder = angular.isUndefined(scope.settings.placeholder) ? angular.isUndefined(scope.settings.label) ? void 0 : scope.settings.label : scope.settings.placeholder, 
            scope.api._data.disabled = angular.isUndefined(scope.settings.disabled) ? !1 : scope.settings.disabled, 
            scope.api._data.type = angular.isUndefined(scope.settings.type) ? "text" : scope.settings.type, 
            scope.api._data.max = angular.isUndefined(scope.settings.max) ? void 0 : scope.settings.max, 
            scope.api._data.min = angular.isUndefined(scope.settings.min) ? void 0 : scope.settings.min, 
            scope.api._data.maxLength = angular.isUndefined(scope.settings.maxLength) ? void 0 : scope.settings.maxLength, 
            scope.api._data.step = angular.isUndefined(scope.settings.step) ? void 0 : scope.settings.step, 
            scope.api._data.value = "number" == scope.api._data.type ? angular.isUndefined(scope.settings.value) ? void 0 : parseInt(scope.settings.value) : angular.isUndefined(scope.settings.value) ? void 0 : scope.settings.value, 
            scope.api._data.valid = angular.isUndefined(scope.settings.valid) ? !0 : scope.settings.valid, 
            scope.api._data.label = angular.isUndefined(scope.settings.label) ? angular.isUndefined(scope.settings.placeholder) ? void 0 : scope.settings.placeholder : scope.settings.label, 
            scope.api._data.error = angular.isUndefined(scope.settings.error) ? void 0 : scope.settings.error, 
            scope.api._data.editable = angular.isUndefined(scope.settings.editable) ? !0 : scope.settings.editable, 
            scope.api._data.onKeyDown = angular.isFunction(scope.settings.onKeyDown) ? function(evt) {
                scope.settings.onKeyDown(evt, {
                    id: scope.api._data.id,
                    name: scope.api._data.name,
                    settings: scope.settings
                });
            } : void 0, scope.api._data.onKeyPress = angular.isFunction(scope.settings.onKeyPress) ? function(evt) {
                scope.settings.onKeyPress(evt, {
                    id: scope.api._data.id,
                    name: scope.api._data.name,
                    settings: scope.settings
                });
            } : void 0, scope.api._data.onKeyUp = angular.isFunction(scope.settings.onKeyUp) ? function(evt) {
                scope.settings.onKeyUp(evt, {
                    id: scope.api._data.id,
                    name: scope.api._data.name,
                    settings: scope.settings
                });
            } : void 0, scope.api._data.onInput = angular.isFunction(scope.settings.onInput) ? function(evt) {
                scope.settings.onInput(evt, {
                    id: scope.api._data.id,
                    name: scope.api._data.name,
                    settings: scope.settings
                });
            } : void 0, scope.api._data.onFocus = angular.isFunction(scope.settings.onFocus) ? function(evt) {
                scope.settings.onFocus(evt, {
                    id: scope.api._data.id,
                    name: scope.api._data.name,
                    settings: scope.settings
                });
            } : void 0, scope.api._data.onBlur = angular.isFunction(scope.settings.onBlur) ? function(evt) {
                scope.settings.onBlur(evt, {
                    id: scope.api._data.id,
                    name: scope.api._data.name,
                    settings: scope.settings
                });
            } : void 0, scope.api._data.onMouseOver = angular.isFunction(scope.settings.onMouseOver) ? function(evt) {
                scope.settings.onMouseOver(evt, {
                    id: scope.api._data.id,
                    name: scope.api._data.name,
                    settings: scope.settings
                });
            } : void 0, scope.api._data.onMouseOut = angular.isFunction(scope.settings.onMouseOut) ? function(evt) {
                scope.settings.onMouseOut(evt, {
                    id: scope.api._data.id,
                    name: scope.api._data.name,
                    settings: scope.settings
                });
            } : void 0, scope.api._data.onMouseMove = angular.isFunction(scope.settings.onMouseMove) ? function(evt) {
                scope.settings.onMouseMove(evt, {
                    id: scope.api._data.id,
                    name: scope.api._data.name,
                    settings: scope.settings
                });
            } : void 0, scope.api._data.onMouseDown = angular.isFunction(scope.settings.onMouseDown) ? function(evt) {
                scope.settings.onMouseDown(evt, {
                    id: scope.api._data.id,
                    name: scope.api._data.name,
                    settings: scope.settings
                });
            } : void 0, scope.api._data.onMouseUp = angular.isFunction(scope.settings.onMouseUp) ? function(evt) {
                scope.settings.onMouseUp(evt, {
                    id: scope.api._data.id,
                    name: scope.api._data.name,
                    settings: scope.settings
                });
            } : void 0, scope.api._data.onChange = angular.isFunction(scope.settings.onChange) ? function(val) {
                scope.settings.onChange(val, {
                    id: scope.api._data.id,
                    name: scope.api._data.name,
                    settings: scope.settings
                });
            } : void 0, // NUMBER settings
            scope.api._data.numberSpinner = angular.isUndefined(scope.settings.numberSpinner) ? !0 : scope.settings.numberSpinner;
            // Templates
            var templateInput = '<input id="' + scope.api._data.id + '" title="{{api._data.label}}" name="' + scope.api._data.name + '" type="' + scope.api._data.type + '" class="' + classInput + '" placeholder="{{api._data.placeholder}}" data-ng-model="api._data.value" data-ng-value="api._data.value" ';
            templateInput += scope.api._data.disabled ? ' disabled="disabled" ' : "", templateInput += angular.isUndefined(scope.api._data.max) ? "" : ' max="{{api._data.max}}" ', 
            templateInput += angular.isUndefined(scope.api._data.min) ? "" : ' min="{{api._data.min}}" ', 
            templateInput += angular.isUndefined(scope.api._data.maxLength) ? "" : ' maxlength="{{api._data.maxLength}}" ', 
            templateInput += angular.isUndefined(scope.api._data.step) ? "" : ' step="{{api._data.step}}" ', 
            templateInput += ">";
            var templateError = '<p class="' + classError + '" data-ng-bind="api._data.error"></p>', templateLabel = '<label class="' + classLabel + '" data-ng-bind="api._data.label"></label>', templateValue = '<p class="' + classValue + '" data-ng-bind="api._data.value"></p>', canViewMode = function() {
                var can = !1;
                switch (scope.api._data.type) {
                  case "text":
                  case "email":
                  case "url":
                  case "tel":
                  case "number":
                  case "search":
                    can = !0;
                }
                return can;
            };
            scope.api.setInvalid = function(msg) {
                scope.api._data.valid = !1, scope.api._data.error = angular.isString(msg) ? msg : void 0, 
                errorMsgCheck();
            }, scope.api.setValid = function() {
                scope.api._data.valid = !0, errorMsgCheck();
            }, scope.api.setValue = function(val) {
                scope.api._data.value = val;
            }, scope.api.getValue = function() {
                return scope.api._data.value;
            }, scope.api.setPlaceholder = function(placeholder) {
                scope.api._data.placeholder = placeholder;
            }, scope.api.getPlaceholder = function() {
                return scope.api._data.placeholder;
            }, scope.api.disable = function() {
                scope.api._data.disabled = !0, elInput.attr("disabled", !0);
            }, scope.api.enable = function() {
                scope.api._data.disabled = !1, elInput.removeAttr("disabled");
            };
            var getInputEl = function() {
                // event bindings
                // filter out letters for number types
                /////////////////////////////////////////////////////////
                // CAPS LOCK
                // END CAPS LOCK
                /////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////
                // NUMBER SPINNER logic
                // End NUMBER SPINNER logic
                /////////////////////////////////////////////////////////
                // emit events
                return elInput = angular.element(templateInput), elInput.val(scope.api._data.value), 
                angular.isString(scope.api._data.value) && "" != scope.api._data.value ? elInput.removeClass(classEmpty) : elInput.addClass(classEmpty), 
                angular.isUndefined(scope.api._data.onKeyDown) || elInput.bind("keydown", scope.api._data.onKeyDown), 
                angular.isUndefined(scope.api._data.onKeyUp) || elInput.bind("keyup", scope.api._data.onKeyUp), 
                angular.isUndefined(scope.api._data.onKeyPress) || elInput.bind("keypress", scope.api._data.onKeyPress), 
                angular.isUndefined(scope.api._data.onInput) || elInput.bind("input", scope.api._data.onInput), 
                angular.isUndefined(scope.api._data.onBlur) || elInput.bind("blur", scope.api._data.onBlur), 
                angular.isUndefined(scope.api._data.onMouseOver) || elInput.bind("mouseover", scope.api._data.onMouseOver), 
                angular.isUndefined(scope.api._data.onMouseOut) || elInput.bind("mouseout", scope.api._data.onMouseOut), 
                angular.isUndefined(scope.api._data.onMouseMove) || elInput.bind("mousemove", scope.api._data.onMouseMove), 
                angular.isUndefined(scope.api._data.onMouseDown) || elInput.bind("mousedown", scope.api._data.onMouseDown), 
                angular.isUndefined(scope.api._data.onMouseUp) || elInput.bind("mouseup", scope.api._data.onMouseUp), 
                "number" == scope.api._data.type && elInput.bind("keydown", function(evt) {
                    evt.keyCode > 64 && evt.keyCode < 96 && evt.preventDefault();
                }), elInput.bind("keypress", function(event) {
                    var code = event.charCode || event.keyCode, shift = event.shiftKey;
                    code > 96 && 123 > code && shift ? (elInput.removeClass(classCapsLock), scope.api._data.capsLocked = !1) : code > 64 && 91 > code && !shift && (elInput.addClass(classCapsLock), 
                    scope.api._data.capsLocked = !0);
                }), elInput.bind("keyup keydown", function(event) {
                    {
                        var code = event.charCode || event.keyCode;
                        event.shiftKey;
                    }
                    20 == code && 1 == scope.api._data.capsLocked && (elInput.removeClass(classCapsLock), 
                    scope.api._data.capsLocked = !1);
                }), "number" == scope.api._data.type && scope.api._data.numberSpinner && (elInput.bind("mouseover", function() {
                    elInput.addClass(classMouseOver), // necessary for cursor styling over spinner
                    elInput.bind("mousemove", function(evt) {
                        var rect = elInput[0].getBoundingClientRect(), x = evt.offsetX || evt.clientX - $(evt.target).offset().left, y = evt.offsetY || evt.clientY - $(evt.target).offset().top;
                        x > rect.width - 20 ? y < rect.height / 2 ? elInput.addClass(classNumberSpinner) : y > rect.height / 2 && elInput.addClass(classNumberSpinner) : elInput.removeClass(classNumberSpinner);
                    });
                }), elInput.bind("mouseout", function() {
                    elInput.removeClass(classMouseOver), elInput.removeClass(classNumberSpinner), elInput.off("mousemove");
                }), elInput.bind("mousedown", function(evt) {
                    var rect = elInput[0].getBoundingClientRect(), x = evt.offsetX || evt.clientX - $(evt.target).offset().left, y = evt.offsetY || evt.clientY - $(evt.target).offset().top;
                    x > rect.width - 20 && (y < rect.height / 2 ? (elInput.addClass(classNumberUpArrow), 
                    incrementVal()) : y > rect.height / 2 && (elInput.addClass(classNumberDownArrow), 
                    decrementVal()));
                }), elInput.bind("mouseup", function() {
                    elInput.removeClass(classNumberUpArrow), elInput.removeClass(classNumberDownArrow);
                })), angular.forEach(scope.api._data.emitEvents, function(value) {
                    elInput.bind(value, function(evt) {
                        // sorry for the long wait, but we must let the model and value update each other before emitting.
                        $timeout(function() {
                            scope.$emit(scope.settings.name + "-" + value, evt);
                        }, 0);
                    });
                }), $compile(elInput)(scope);
            };
            scope.$watch("api._data.value", function() {
                emptyCheck();
            }), // IF CAN VIEW MODE
            canViewMode() && (scope.api.setLabel = function(label) {
                scope.api._data.label = label;
            }, scope.api.getLabel = function() {
                return scope.api._data.label;
            }, scope.api.view = function() {
                setViewMode();
            }, scope.api.edit = function() {
                setEditMode();
            });
            var setViewMode = function() {
                scope.api._data.editable = !1, element.children().remove(), angular.isString(scope.api._data.label) && (elLabel = $compile(angular.element(templateLabel))(scope), 
                element.append(elLabel)), elValue = $compile(angular.element(templateValue))(scope), 
                element.append(elValue);
            }, setEditMode = function() {
                scope.api._data.editable = !0, element.children().remove(), element.append(getInputEl()), 
                errorMsgCheck(), emptyCheck();
            }, emptyCheck = function() {
                angular.isUndefined(elInput) || ("number" == scope.api._data.type ? angular.isNumber(scope.api._data.value) && null != scope.api._data.value ? elInput.removeClass(classEmpty) : elInput.addClass(classEmpty) : angular.isString(scope.api._data.value) && scope.api._data.value.length > 0 ? elInput.removeClass(classEmpty) : elInput.addClass(classEmpty));
            }, errorMsgCheck = function() {
                angular.isUndefined(elError) || elError.remove(), scope.api._data.editable && (scope.api._data.valid ? elInput.removeClass(classInvalid) : (elInput.addClass(classInvalid), 
                angular.isString(scope.api._data.error) && $timeout(function() {
                    elError = $compile(angular.element(templateError))(scope), // ensure .error has been updated prior to this compile
                    element.append(elError);
                }, 0)));
            }, incrementVal = function() {
                var val = scope.api.getValue();
                val++, isNaN(val) && (val = 0), scope.api.setValue(val), elInput.val(val);
            }, decrementVal = function() {
                var val = scope.api.getValue();
                val--, isNaN(val) && (val = 0), scope.api.setValue(val), elInput.val(val);
            };
            // INIT
            // we make our own onChange as browsers onchange only fire on blur
            angular.isFunction(scope.api._data.onChange) && scope.$watch("api._data.value", function() {
                scope.api._data.onChange(scope.api._data.value);
            }), canViewMode() && !angular.isUndefined(scope.settings.view) && 1 == scope.settings.view ? setViewMode() : setEditMode();
        }
    };
} ]);