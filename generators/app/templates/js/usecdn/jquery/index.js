<% if (localization) { %>
const locales = ['en', 'de'];

<% if (localization === 'globalize') { %>    
$.when
  .apply(
    $,
    [].concat
      .apply(
        [
          // standard cldr files
          'https://unpkg.com/cldr-core/supplemental/likelySubtags.json',
          'https://unpkg.com/cldr-core/supplemental/timeData.json',
          'https://unpkg.com/cldr-core/supplemental/weekData.json',
          'https://unpkg.com/cldr-core/supplemental/currencyData.json',
          'https://unpkg.com/cldr-core/supplemental/numberingSystems.json'
        ],
        // additional files per locale
        locales.map(l => [
          'https://unpkg.com/cldr-dates-full/main/' + l + '/ca-gregorian.json',
          'https://unpkg.com/cldr-numbers-full/main/' + l + '/numbers.json',
          'https://unpkg.com/cldr-numbers-full/main/' + l + '/currencies.json'
        ])
      )
      .map(s => $.getJSON(s))
  )
  .then((...list) => list.map(r => r[0]))
  .then(Globalize.load)
 .then(() => {
<% } else if (localization === 'intl') { %>
<% } %>
<% if (locales) { %>
         const shorten = l => l.replace(/-.*$/, '');

         // Setting locale depending on browser settings, taking into account
         // available locales.
         const requestedLocale = navigator.language || navigator.browserLanguage;
         const setLocale =
             locales.find(i => i === requestedLocale) ||
             locales.find(i => i === shorten(requestedLocale)) ||
             'en';
         DevExpress.localization.locale(setLocale);

         // Alternatively, set a specific locale:
         // DevExpress.localization.locale('de');
<% } %>
<% } %>
     $('#button').dxButton({
         width: '200px',
         text: "Say 'Hello world'",
         onClick: function() {
             DevExpress.ui.dialog.alert('Hello world!', '', false);
         }
     });

     $('#datebox').dxDateBox({
         width: '200px',
         placeholder: 'Please enter a date'
     });
<% if (localization === 'globalize') { %>    
     });
<% } %>
