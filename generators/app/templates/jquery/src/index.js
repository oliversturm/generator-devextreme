var $ = require('jquery');

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
  require('cldr-data/main/de/ca-gregorian.json'),
  require('cldr-data/main/de/numbers.json'),
  require('cldr-data/main/de/currencies.json'),
  require('cldr-data/supplemental/likelySubtags.json'),
  require('cldr-data/supplemental/timeData.json'),
  require('cldr-data/supplemental/weekData.json'),
  require('cldr-data/supplemental/currencyData.json'),
  require('cldr-data/supplemental/numberingSystems.json')
);

var dialog = require('devextreme/ui/dialog');
require('devextreme/ui/button');
require('devextreme/ui/date_box');
require('devextreme/ui/data_grid');

require('devextreme/dist/css/dx.common.css');
require('devextreme/dist/css/dx.light.css');

var deMessages = require('devextreme/localization/messages/de.json');
var localization = require('devextreme/localization');
localization.loadMessages(deMessages);
localization.locale('de');
<% } %>
  
$('#button').dxButton({
  text: "Say 'Hello world'",
  onClick: function() {
    dialog.alert('Hello world!', '', false);
  }
});

