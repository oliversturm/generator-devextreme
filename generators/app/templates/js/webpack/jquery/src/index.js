const $ = require('jquery');
<% if (localization) { -%>
require('./localization');
<% } %>
// Load required DevExtreme widgets
var dialog = require('devextreme/ui/dialog');
require('devextreme/ui/button');
require('devextreme/ui/date_box');

// Set style sheets
require('devextreme/dist/css/dx.common.css');
require('devextreme/dist/css/dx.light.css');


$('#button').dxButton({
  width: '200px',
  text: "Say 'Hello world'",
  onClick: function() {
    dialog.alert('Hello world!', '', false);
  }
});

<% if (localization === 'intl') { -%>             
// For date parsing when using Intl localization, please read
// https://github.com/DevExpress/DevExtreme-Intl#restrictions
<% } -%>
$('#datebox').dxDateBox({
  width: '200px',
  placeholder: 'Please enter a date'
});
