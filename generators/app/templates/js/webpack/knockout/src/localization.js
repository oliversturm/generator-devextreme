<% if (localization) { %>
    const locales = ['en'<% if (locales) locales.forEach(function (l) { %>, '<%- l %>' <% }); %>];

    <% if (localization === 'globalize') { %>
        require('devextreme/localization/globalize/message');
        require('devextreme/localization/globalize/number');
        require('devextreme/localization/globalize/currency');
        require('devextreme/localization/globalize/date');
        
        const Globalize = require('globalize');
        locales.forEach(locale => {
            Globalize.load(
                require(`cldr-data/main/${locale}/ca-gregorian.json`),
                require(`cldr-data/main/${locale}/numbers.json`),
                require(`cldr-data/main/${locale}/currencies.json`)
            );
        });
        
        Globalize.load(
            require('cldr-data/supplemental/likelySubtags.json'),
            require('cldr-data/supplemental/timeData.json'),
            require('cldr-data/supplemental/weekData.json'),
            require('cldr-data/supplemental/currencyData.json'),
            require('cldr-data/supplemental/numberingSystems.json')
        );

    <% } else if (localization === 'intl') { %>
        require('devextreme-intl');    
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
