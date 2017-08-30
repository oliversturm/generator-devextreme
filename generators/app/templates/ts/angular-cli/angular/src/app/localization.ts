<% if (localization) { %>
<% if (locales) { %>                       
// Pacify TypeScript. Seriously.... types in a dynamic world? Nothing
// but hassle.

// Not sure why this seems to be required - @types/node is installed
// and I understand that should make require available. But it doesn't
// work without an extra configuration like this.
declare var require: any;

// Extend the Navigator so we can be flexible about retrieving the
// language prefs from it. Apparently this should work, but it doesn't.
// interface Navigator {
//     browserLanguage?: string;
// }
declare var navigator: any;

const locales = ['en'<% if (locales) locales.forEach(function (l) { %>, '<%- l %>' <% }); %>];
<% } %>
<% if (localization === 'intl') { %>
import 'devextreme-intl';
<% } %>

<% if (locales) { %>                       
const { loadMessages, locale } = require('devextreme/localization');
        
const shorten = l => l.replace(/-.*$/, '');
new Set(locales.map(shorten).filter(i => i !== 'en')).forEach(locale =>
                                                              loadMessages(require(`devextreme/localization/messages/${locale}.json`))
                                                             );

// Setting locale depending on browser settings, taking into account
// available locales.
const requestedLocale = navigator.language || navigator.browserLanguage;
const setLocale = locales.find(i => i === requestedLocale) ||
    locales.find(i => i === shorten(requestedLocale)) ||
    'en';
locale(setLocale);

// Alternatively, set a specific locale:
// locale('de');
<% } %>
<% } %>
