const $ = require('jquery');

<% if (localization) { %>
    <% if (localization === 'globalize') { %>
        require('devextreme/localization/globalize/message');
        require('devextreme/localization/globalize/number');
        require('devextreme/localization/globalize/currency');
        require('devextreme/localization/globalize/date');
        
        const Globalize = require('globalize');
        Globalize.load(
            require('cldr-data/main/en/ca-gregorian.json'),
            require('cldr-data/main/en/numbers.json'),
            require('cldr-data/main/en/currencies.json'),
            <% if (addlang) addlang.forEach(function (lang) { %>
                // CLDR data for <%- lang %>
                require('cldr-data/main/<%- lang %>/ca-gregorian.json'),
                require('cldr-data/main/<%- lang %>/numbers.json'),
                require('cldr-data/main/<%- lang %>/currencies.json'),
            <% }); %>
            require('cldr-data/supplemental/likelySubtags.json'),
            require('cldr-data/supplemental/timeData.json'),
            require('cldr-data/supplemental/weekData.json'),
            require('cldr-data/supplemental/currencyData.json'),
            require('cldr-data/supplemental/numberingSystems.json')
        );

    <% } else if (localization === 'intl') { %>
        require('devextreme-intl');    
    <% } %>

    <% if (addlang) { addlang.forEach(function (lang) { -%>
        const { loadMessages, locale } = require('devextreme/localization');
        
        // DevExtreme messages for <%- lang %>
        loadMessages(require('devextreme/localization/messages/<%- lang %>.json'));
        <% }); %>
        // Setting locale depending on browser settings
        locale(navigator.language || navigator.browserLanguage);
        // Alternatively, set a specific locale:
        // locale('de');
    <% } %>
<% } %>

// Load required DevExtreme widgets
var dialog = require('devextreme/ui/dialog');
require('devextreme/ui/button');
require('devextreme/ui/date_box');

// Set style sheets
require('devextreme/dist/css/dx.common.css');
require('devextreme/dist/css/dx.light.css');


$('#button').dxButton({
  text: "Say 'Hello world'",
  onClick: function() {
    dialog.alert('Hello world!', '', false);
  }
});

$('#datebox').dxDateBox();
