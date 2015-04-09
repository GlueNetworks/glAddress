/**
 * @ngdoc directive
 * @name glAddress.directive:glAddress
 * @restrict E
 *
 * @description
 * This is a description of the glAddress directive.
 * TODO fill me out...
 *
 * @param {settings} angular expression evaluating to a settings hash.
 * - TODO fill me out...
 */
angular.module('glAddress').directive('glAddress', ["$compile", "$timeout", function ($compile, $timeout) {
    'use strict';

    return {
        restrict: 'E',
        scope: {
            settings: '=',
            api: '='
        },
        link: function (scope, element, attrs, controller) {

            var elementLabel;
            var elementError;
            var templateLabel = '<label class="gl-address-label">Address</label>';
            var templateError = '<p class="gl-address-error" data-ng-bind="api._data.error"></p>';
            var classEdit = "gl-edit";
            var classView = "gl-view";
            var countries = [
                {value: 'AF', label: 'AFGHANISTAN'},
                {value: 'AX', label: 'ÅLAND ISLANDS'},
                {value: 'AL', label: 'ALBANIA'},
                {value: 'DZ', label: 'ALGERIA'},
                {value: 'AS', label: 'AMERICAN SAMOA'},
                {value: 'AD', label: 'ANDORRA'},
                {value: 'AO', label: 'ANGOLA'},
                {value: 'AI', label: 'ANGUILLA'},
                {value: 'AQ', label: 'ANTARCTICA'},
                {value: 'AG', label: 'ANTIGUA AND BARBUDA'},
                {value: 'AR', label: 'ARGENTINA'},
                {value: 'AM', label: 'ARMENIA'},
                {value: 'AW', label: 'ARUBA'},
                {value: 'AU', label: 'AUSTRALIA'},
                {value: 'AT', label: 'AUSTRIA'},
                {value: 'AZ', label: 'AZERBAIJAN'},
                {value: 'BS', label: 'BAHAMAS'},
                {value: 'BH', label: 'BAHRAIN'},
                {value: 'BD', label: 'BANGLADESH'},
                {value: 'BB', label: 'BARBADOS'},
                {value: 'BY', label: 'BELARUS'},
                {value: 'BE', label: 'BELGIUM'},
                {value: 'BZ', label: 'BELIZE'},
                {value: 'BJ', label: 'BENIN'},
                {value: 'BM', label: 'BERMUDA'},
                {value: 'BT', label: 'BHUTAN'},
                {value: 'BO', label: 'BOLIVIA, PLURINATIONAL STATE OF'},
                {value: 'BQ', label: 'BONAIRE, SINT EUSTATIUS AND SABA'},
                {value: 'BA', label: 'BOSNIA AND HERZEGOVINA'},
                {value: 'BW', label: 'BOTSWANA'},
                {value: 'BV', label: 'BOUVET ISLAND'},
                {value: 'BR', label: 'BRAZIL'},
                {value: 'IO', label: 'BRITISH INDIAN OCEAN TERRITORY'},
                {value: 'BN', label: 'BRUNEI DARUSSALAM'},
                {value: 'BG', label: 'BULGARIA'},
                {value: 'BF', label: 'BURKINA FASO'},
                {value: 'BI', label: 'BURUNDI'},
                {value: 'KH', label: 'CAMBODIA'},
                {value: 'CM', label: 'CAMEROON'},
                {value: 'CA', label: 'CANADA'},
                {value: 'CV', label: 'CAPE VERDE'},
                {value: 'KY', label: 'CAYMAN ISLANDS'},
                {value: 'CF', label: 'CENTRAL AFRICAN REPUBLIC'},
                {value: 'TD', label: 'CHAD'},
                {value: 'CL', label: 'CHILE'},
                {value: 'CN', label: 'CHINA'},
                {value: 'CX', label: 'CHRISTMAS ISLAND'},
                {value: 'CC', label: 'COCOS (KEELING) ISLANDS'},
                {value: 'CO', label: 'COLOMBIA'},
                {value: 'KM', label: 'COMOROS'},
                {value: 'CG', label: 'CONGO'},
                {value: 'CD', label: 'CONGO, THE DEMOCRATIC REPUBLIC OF THE'},
                {value: 'CK', label: 'COOK ISLANDS'},
                {value: 'CR', label: 'COSTA RICA'},
                {value: 'CI', label: 'CÔTE D\'IVOIRE'},
                {value: 'HR', label: 'CROATIA'},
                {value: 'CU', label: 'CUBA'},
                {value: 'CW', label: 'CURAÇAO'},
                {value: 'CY', label: 'CYPRUS'},
                {value: 'CZ', label: 'CZECH REPUBLIC'},
                {value: 'DK', label: 'DENMARK'},
                {value: 'DJ', label: 'DJIBOUTI'},
                {value: 'DM', label: 'DOMINICA'},
                {value: 'DO', label: 'DOMINICAN REPUBLIC'},
                {value: 'EC', label: 'ECUADOR'},
                {value: 'EG', label: 'EGYPT'},
                {value: 'SV', label: 'EL SALVADOR'},
                {value: 'GQ', label: 'EQUATORIAL GUINEA'},
                {value: 'ER', label: 'ERITREA'},
                {value: 'EE', label: 'ESTONIA'},
                {value: 'ET', label: 'ETHIOPIA'},
                {value: 'FK', label: 'FALKLAND ISLANDS (MALVINAS)'},
                {value: 'FO', label: 'FAROE ISLANDS'},
                {value: 'FJ', label: 'FIJI'},
                {value: 'FI', label: 'FINLAND'},
                {value: 'FR', label: 'FRANCE'},
                {value: 'GF', label: 'FRENCH GUIANA'},
                {value: 'PF', label: 'FRENCH POLYNESIA'},
                {value: 'TF', label: 'FRENCH SOUTHERN TERRITORIES'},
                {value: 'GA', label: 'GABON'},
                {value: 'GM', label: 'GAMBIA'},
                {value: 'GE', label: 'GEORGIA'},
                {value: 'DE', label: 'GERMANY'},
                {value: 'GH', label: 'GHANA'},
                {value: 'GI', label: 'GIBRALTAR'},
                {value: 'GR', label: 'GREECE'},
                {value: 'GL', label: 'GREENLAND'},
                {value: 'GD', label: 'GRENADA'},
                {value: 'GP', label: 'GUADELOUPE'},
                {value: 'GU', label: 'GUAM'},
                {value: 'GT', label: 'GUATEMALA'},
                {value: 'GG', label: 'GUERNSEY'},
                {value: 'GN', label: 'GUINEA'},
                {value: 'GW', label: 'GUINEA-BISSAU'},
                {value: 'GY', label: 'GUYANA'},
                {value: 'HT', label: 'HAITI'},
                {value: 'HM', label: 'HEARD ISLAND AND MCDONALD ISLANDS'},
                {value: 'VA', label: 'HOLY SEE (VATICAN CITY STATE)'},
                {value: 'HN', label: 'HONDURAS'},
                {value: 'HK', label: 'HONG KONG'},
                {value: 'HU', label: 'HUNGARY'},
                {value: 'IS', label: 'ICELAND'},
                {value: 'IN', label: 'INDIA'},
                {value: 'ID', label: 'INDONESIA'},
                {value: 'IR', label: 'IRAN, ISLAMIC REPUBLIC OF'},
                {value: 'IQ', label: 'IRAQ'},
                {value: 'IE', label: 'IRELAND'},
                {value: 'IM', label: 'ISLE OF MAN'},
                {value: 'IL', label: 'ISRAEL'},
                {value: 'IT', label: 'ITALY'},
                {value: 'JM', label: 'JAMAICA'},
                {value: 'JP', label: 'JAPAN'},
                {value: 'JE', label: 'JERSEY'},
                {value: 'JO', label: 'JORDAN'},
                {value: 'KZ', label: 'KAZAKHSTAN'},
                {value: 'KE', label: 'KENYA'},
                {value: 'KI', label: 'KIRIBATI'},
                {value: 'KP', label: 'KOREA, DEMOCRATIC PEOPLE\'S REPUBLIC OF'},
                {value: 'KR', label: 'KOREA, REPUBLIC OF'},
                {value: 'KW', label: 'KUWAIT'},
                {value: 'KG', label: 'KYRGYZSTAN'},
                {value: 'LA', label: 'LAO PEOPLE\'S DEMOCRATIC REPUBLIC'},
                {value: 'LV', label: 'LATVIA'},
                {value: 'LB', label: 'LEBANON'},
                {value: 'LS', label: 'LESOTHO'},
                {value: 'LR', label: 'LIBERIA'},
                {value: 'LY', label: 'LIBYA'},
                {value: 'LI', label: 'LIECHTENSTEIN'},
                {value: 'LT', label: 'LITHUANIA'},
                {value: 'LU', label: 'LUXEMBOURG'},
                {value: 'MO', label: 'MACAO'},
                {value: 'MK', label: 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF'},
                {value: 'MG', label: 'MADAGASCAR'},
                {value: 'MW', label: 'MALAWI'},
                {value: 'MY', label: 'MALAYSIA'},
                {value: 'MV', label: 'MALDIVES'},
                {value: 'ML', label: 'MALI'},
                {value: 'MT', label: 'MALTA'},
                {value: 'MH', label: 'MARSHALL ISLANDS'},
                {value: 'MQ', label: 'MARTINIQUE'},
                {value: 'MR', label: 'MAURITANIA'},
                {value: 'MU', label: 'MAURITIUS'},
                {value: 'YT', label: 'MAYOTTE'},
                {value: 'MX', label: 'MEXICO'},
                {value: 'FM', label: 'MICRONESIA, FEDERATED STATES OF'},
                {value: 'MD', label: 'MOLDOVA, REPUBLIC OF'},
                {value: 'MC', label: 'MONACO'},
                {value: 'MN', label: 'MONGOLIA'},
                {value: 'ME', label: 'MONTENEGRO'},
                {value: 'MS', label: 'MONTSERRAT'},
                {value: 'MA', label: 'MOROCCO'},
                {value: 'MZ', label: 'MOZAMBIQUE'},
                {value: 'MM', label: 'MYANMAR'},
                {value: 'NA', label: 'NAMIBIA'},
                {value: 'NR', label: 'NAURU'},
                {value: 'NP', label: 'NEPAL'},
                {value: 'NL', label: 'NETHERLANDS'},
                {value: 'NC', label: 'NEW CALEDONIA'},
                {value: 'NZ', label: 'NEW ZEALAND'},
                {value: 'NI', label: 'NICARAGUA'},
                {value: 'NE', label: 'NIGER'},
                {value: 'NG', label: 'NIGERIA'},
                {value: 'NU', label: 'NIUE'},
                {value: 'NF', label: 'NORFOLK ISLAND'},
                {value: 'MP', label: 'NORTHERN MARIANA ISLANDS'},
                {value: 'NO', label: 'NORWAY'},
                {value: 'OM', label: 'OMAN'},
                {value: 'PK', label: 'PAKISTAN'},
                {value: 'PW', label: 'PALAU'},
                {value: 'PS', label: 'PALESTINE, STATE OF'},
                {value: 'PA', label: 'PANAMA'},
                {value: 'PG', label: 'PAPUA NEW GUINEA'},
                {value: 'PY', label: 'PARAGUAY'},
                {value: 'PE', label: 'PERU'},
                {value: 'PH', label: 'PHILIPPINES'},
                {value: 'PN', label: 'PITCAIRN'},
                {value: 'PL', label: 'POLAND'},
                {value: 'PT', label: 'PORTUGAL'},
                {value: 'PR', label: 'PUERTO RICO'},
                {value: 'QA', label: 'QATAR'},
                {value: 'RE', label: 'RÉUNION'},
                {value: 'RO', label: 'ROMANIA'},
                {value: 'RU', label: 'RUSSIAN FEDERATION'},
                {value: 'RW', label: 'RWANDA'},
                {value: 'BL', label: 'SAINT BARTHÉLEMY'},
                {value: 'SH', label: 'SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA'},
                {value: 'KN', label: 'SAINT KITTS AND NEVIS'},
                {value: 'LC', label: 'SAINT LUCIA'},
                {value: 'MF', label: 'SAINT MARTIN (FRENCH PART)'},
                {value: 'PM', label: 'SAINT PIERRE AND MIQUELON'},
                {value: 'VC', label: 'SAINT VINCENT AND THE GRENADINES'},
                {value: 'WS', label: 'SAMOA'},
                {value: 'SM', label: 'SAN MARINO'},
                {value: 'ST', label: 'SAO TOME AND PRINCIPE'},
                {value: 'SA', label: 'SAUDI ARABIA'},
                {value: 'SN', label: 'SENEGAL'},
                {value: 'RS', label: 'SERBIA'},
                {value: 'SC', label: 'SEYCHELLES'},
                {value: 'SL', label: 'SIERRA LEONE'},
                {value: 'SG', label: 'SINGAPORE'},
                {value: 'SX', label: 'SINT MAARTEN (DUTCH PART)'},
                {value: 'SK', label: 'SLOVAKIA'},
                {value: 'SI', label: 'SLOVENIA'},
                {value: 'SB', label: 'SOLOMON ISLANDS'},
                {value: 'SO', label: 'SOMALIA'},
                {value: 'ZA', label: 'SOUTH AFRICA'},
                {value: 'GS', label: 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS'},
                {value: 'SS', label: 'SOUTH SUDAN'},
                {value: 'ES', label: 'SPAIN'},
                {value: 'LK', label: 'SRI LANKA'},
                {value: 'SD', label: 'SUDAN'},
                {value: 'SR', label: 'SURINAME'},
                {value: 'SJ', label: 'SVALBARD AND JAN MAYEN'},
                {value: 'SZ', label: 'SWAZILAND'},
                {value: 'SE', label: 'SWEDEN'},
                {value: 'CH', label: 'SWITZERLAND'},
                {value: 'SY', label: 'SYRIAN ARAB REPUBLIC'},
                {value: 'TW', label: 'TAIWAN, PROVINCE OF CHINA'},
                {value: 'TJ', label: 'TAJIKISTAN'},
                {value: 'TZ', label: 'TANZANIA, UNITED REPUBLIC OF'},
                {value: 'TH', label: 'THAILAND'},
                {value: 'TL', label: 'TIMOR-LESTE'},
                {value: 'TG', label: 'TOGO'},
                {value: 'TK', label: 'TOKELAU'},
                {value: 'TO', label: 'TONGA'},
                {value: 'TT', label: 'TRINIDAD AND TOBAGO'},
                {value: 'TN', label: 'TUNISIA'},
                {value: 'TR', label: 'TURKEY'},
                {value: 'TM', label: 'TURKMENISTAN'},
                {value: 'TC', label: 'TURKS AND CAICOS ISLANDS'},
                {value: 'TV', label: 'TUVALU'},
                {value: 'UG', label: 'UGANDA'},
                {value: 'UA', label: 'UKRAINE'},
                {value: 'AE', label: 'UNITED ARAB EMIRATES'},
                {value: 'GB', label: 'UNITED KINGDOM'},
                {value: 'US', label: 'UNITED STATES'},
                {value: 'UM', label: 'UNITED STATES MINOR OUTLYING ISLANDS'},
                {value: 'UY', label: 'URUGUAY'},
                {value: 'UZ', label: 'UZBEKISTAN'},
                {value: 'VU', label: 'VANUATU'},
                {value: 'VE', label: 'VENEZUELA, BOLIVARIAN REPUBLIC OF'},
                {value: 'VN', label: 'VIET NAM'},
                {value: 'VG', label: 'VIRGIN ISLANDS, BRITISH'},
                {value: 'VI', label: 'VIRGIN ISLANDS, U.S.'},
                {value: 'WF', label: 'WALLIS AND FUTUNA'},
                {value: 'EH', label: 'WESTERN SAHARA'},
                {value: 'YE', label: 'YEMEN'},
                {value: 'ZM', label: 'ZAMBIA'},
                {value: 'ZW', label: 'ZIMBABWE'}
            ];

            scope.api = scope.api || {};
            scope.api._data = {};
            scope.api._data.id = angular.isUndefined(scope.settings.id) ? undefined : scope.settings.id;
            scope.api._data.name = angular.isUndefined(scope.settings.name) ? undefined : scope.settings.name;
            scope.api._data.valid = angular.isUndefined(scope.settings.valid) ? true : scope.settings.valid;
            scope.api._data.error = angular.isUndefined(scope.settings.error) ? undefined : scope.settings.error;
            scope.api._data.countries = angular.isUndefined(scope.settings.countries) ? countries : scope.settings.countries;
            scope.api._data.value = {street: null, street2: null, city: null, state: null, zip: null, country: null};
            var valueSet = false;
            if (!angular.isUndefined(scope.settings.value)) {
                angular.forEach(scope.api._data.value, function (v, k) {
                    if (angular.isString(scope.settings.value[k]) || angular.isNumber(scope.settings.value[k])) {
                        scope.api._data.value[k] = scope.settings.value[k];
                        valueSet = true;
                    }
                });
            }
            scope.api._data.disabled = angular.isUndefined(scope.settings.disabled) ? false : scope.settings.disabled;
            scope.api._data.editable = angular.isUndefined(scope.settings.editable) ? true : scope.settings.editable;
            scope.api._data.onChange = angular.isFunction(scope.settings.onChange) ? scope.settings.onChange : function () {
            };

            var nameStreet = scope.api._data.name + "-street";
            var nameStreet2 = scope.api._data.name + "-street2";
            var nameCity = scope.api._data.name + "-city";
            var nameState = scope.api._data.name + "-state";
            var nameZip = scope.api._data.name + "-zip";
            var nameCountry = scope.api._data.name + "-country";

            scope.address = {
                street: {
                    input: undefined,
                    template: '<gl-textfield class="gl-address-street" api="address.street.api" settings="address.street.settings" ></gl-textfield>',
                    api: {},
                    settings: {id: nameStreet, name: nameStreet, onChange: onChange, placeholder: "Address Line 1"}
                },
                street2: {
                    input: undefined,
                    template: '<gl-textfield class="gl-address-street2" api="address.street2.api" settings="address.street2.settings" ></gl-textfield>',
                    api: {},
                    settings: {id: nameStreet2, name: nameStreet2, onChange: onChange, placeholder: "Address Line 2"}
                },
                city: {
                    input: undefined,
                    template: '<gl-textfield class="gl-address-city" api="address.city.api" settings="address.city.settings" ></gl-textfield>',
                    api: {},
                    settings: {id: nameCity, name: nameCity, onChange: onChange, placeholder: "City"}
                },
                state: {
                    input: undefined,
                    template: '<gl-textfield class="gl-address-state" api="address.state.api" settings="address.state.settings" ></gl-textfield>',
                    api: {},
                    settings: {id: nameState, name: nameState, onChange: onChange, placeholder: "State/Province"}
                },
                zip: {
                    input: undefined,
                    template: '<gl-textfield class="gl-address-zip" api="address.zip.api" settings="address.zip.settings" ></gl-textfield>',
                    api: {},
                    settings: {id: nameZip, name: nameZip, onChange: onChange, placeholder: "Postal Code/Zip"}
                },
                country: {
                    input: undefined,
                    template: '<gl-multi-select class="gl-address-country" api="address.country.api" settings="address.country.settings" ></gl-multi-select>',
                    api: {},
                    settings: {
                        id: nameCountry,
                        name: nameCountry,
                        onChange: onChange,
                        placeholder: "Country",
                        options: scope.api._data.countries
                    }
                }
            }

            scope.api.setInvalid = function (msg) {
                scope.api._data.valid = false;
                if (angular.isString(msg)) {
                    scope.api._data.error = msg;
                } else {
                    scope.api._data.error = undefined;
                }
                errorMsgCheck();
            }

            scope.api.setValid = function () {
                scope.api._data.valid = true;
                errorMsgCheck();
            }

            scope.api.setValue = function (val) {
                angular.forEach(scope.address, function (v, k) {
                    if (angular.isUndefined(val[k])) {
                        v.api.setValue();
                    } else {
                        v.api.setValue(val[k]);
                    }
                });
            }

            scope.api.getValue = function () {
                return scope.api._data.value;
            }

            scope.api.disable = function () {
                scope.api._data.disabled = true;
                angular.forEach(scope.address, function (v, k) {
                    v.api.disable();
                });
            }

            scope.api.enable = function () {
                scope.api._data.disabled = false;
                angular.forEach(scope.address, function (v, k) {
                    v.api.enable();
                });
            }

            scope.api.view = function () {
                scope.api._data.editable = false;
                setViewMode();
            }

            scope.api.edit = function () {
                scope.api._data.editable = true;
                setEditMode();
            }

            function initFields() {
                elementLabel = angular.element(templateLabel);
                element.append(elementLabel);
                angular.forEach(scope.address, function (v, k) {
                    v.input = angular.element(v.template);
                    element.append($compile(v.input)(scope));
                });
                if (valueSet) {
                    scope.api.setValue(scope.api._data.value);
                }
                if (scope.api._data.editable) {
                    element.addClass(classEdit);
                    element.removeClass(classView);
                    errorMsgCheck();
                } else {
                    scope.api.view();
                }
            }

            function setEditMode() {
                elementLabel = angular.element(templateLabel);
                element.prepend(elementLabel);
                element.addClass(classEdit);
                element.removeClass(classView);
                angular.forEach(scope.address, function (v, k) {
                    v.api.edit();
                });
                errorMsgCheck();
            }

            function setViewMode() {
                elementLabel.remove();
                element.addClass(classView);
                element.removeClass(classEdit);
                angular.forEach(scope.address, function (v, k) {
                    v.api.view();
                });
                errorMsgCheck();
            }

            var errorMsgCheck = function () {
                if (!angular.isUndefined(elementError)) {
                    elementError.remove();
                }
                if (scope.api._data.editable) {
                    if (scope.api._data.valid) {
                        angular.forEach(scope.address, function (v, k) {
                            v.api.setValid();
                        });
                    } else {
                        angular.forEach(scope.address, function (v, k) {
                            v.api.setInvalid();
                        });
                        if (angular.isString(scope.api._data.error)) {
                            $timeout(function () {
                                elementError = $compile(angular.element(templateError))(scope);  // ensure .error has been updated prior to this compile
                                element.append(elementError);
                            }, 0);
                        }
                    }
                }
            }


            function onChange(val, obj) {
                switch (obj.id) {
                    case nameStreet:
                        scope.api._data.value.street = val;
                        break;
                    case nameStreet2:
                        scope.api._data.value.street2 = val;
                        break;
                    case nameCity:
                        scope.api._data.value.city = val;
                        break;
                    case nameState:
                        scope.api._data.value.state = val;
                        break;
                    case nameZip:
                        scope.api._data.value.zip = val;
                        break;
                    case nameCountry:
                        scope.api._data.value.country = val;
                        break;
                }
                scope.api._data.onChange(scope.api._data.value);
            }

            // INIT
            initFields();

            // we make our own onChange as browsers onchange only fire on blur
            if (angular.isFunction(scope.api._data.onChange)) {
                scope.$watch("api._data.value", function () {
                    scope.api._data.onChange(scope.api._data.value);
                });
            }
        }
    };
}]);
