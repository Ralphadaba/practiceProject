export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency', 
    currency: 'USD',
})

/**
 * new Intl.NumberFormat([locales], [options])
 * locales (optional): A string or an array of locale identifiers (e.g., 'en-US' for English (United States) or 'de-DE' for German). 
 * It determines the formatting style based on language and region.
 * 
 * options (optional): An object that customizes the formatting.
 * 
 * 
 */