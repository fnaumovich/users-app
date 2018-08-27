export function capitalizeFirstLowercaseRest(value) {
    if (typeof value === 'string' && value.length) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    return '';
}
