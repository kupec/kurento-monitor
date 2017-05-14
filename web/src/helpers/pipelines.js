export function getAllElementIds(pipelines) {
    const getIdAndChildrenId = (elements) => {
        let result = [];
        if (!elements) {
            return result;
        }
        elements.forEach(el => {
            result.push(el.id);
            result = result.concat(getIdAndChildrenId(el.childrens));
        });
        return result;
    };
    return getIdAndChildrenId(pipelines);
}