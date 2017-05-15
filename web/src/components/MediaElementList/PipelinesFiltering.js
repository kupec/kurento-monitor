export function filterMatchingRegExp(elements, regexp) {
    if (!elements) {
        return [];
    }

    return elements.reduce((result, el) => {
        const nested = el.childrens ? filterMatchingRegExp(el.childrens, regexp) : [];
        if (nested.length || el.name.match(regexp)) {
            result.push({
                ...el,
                childrens: nested
            });
        }
        return result;
    }, []);
}

export function inNonStandartRegExp(regexp) {
    return regexp.toString() !== '/.*/gi';
}
