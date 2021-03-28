let locale = localStorage.getItem('bikeTripAcrossCanada_locale') || 'fr';

export const getLocale = () => locale;

export const setLocale = (inputLocale) => {
    localStorage.setItem('bikeTripAcrossCanada_locale', inputLocale);
    locale = inputLocale;
}