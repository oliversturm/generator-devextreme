<% if (localization) { %>
    const locales = ['en'<% if (locales) locales.forEach(function (l) { %>, '<%- l %>' <% }); %>];

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
             // Now we can define and bind the Knockout view model:
             const viewModel = {
                 buttonOptions: {
                     width: '200px',
                     text: "Say 'Hello world'",
                     onClick: function() {
                         DevExpress.ui.dialog.alert('Hello world!', '', false);
                     }
                 },
                 <% if (localization === 'intl') { -%>             
                     // For date parsing when using Intl localization, please read
                     // https://github.com/DevExpress/DevExtreme-Intl#restrictions
                     <% } -%>
                 dateBoxOptions: {
                     width: '200px',
                     placeholder: 'Please enter a date'
                 }
             };
             ko.applyBindings(viewModel);
<% if (localization === 'globalize') { %>    
     });
<% } %>
