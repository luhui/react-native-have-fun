export const createActionTypes = function (module, ...types) {
    let formatTypes = {};
    for (var index in types) {
        if (types.hasOwnProperty(index)) {
            const type = types[index];
            formatTypes[type] = `${module}.${type}`;
        }
    }
    formatTypes.prefix = `${module}.`;
    return formatTypes;
}
