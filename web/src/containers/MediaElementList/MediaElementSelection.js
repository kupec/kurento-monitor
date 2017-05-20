export function onSelectAll(state, pipelines) {
    let allChecked, selectedItems;
    if (state) {
        allChecked = true;
        selectedItems = getAllElementIds(pipelines);
    } else {
        allChecked = false;
        selectedItems = [];
    }
    return {allChecked, selectedItems};
}

export function onSelectOneItem(selectedItems, id, state) {
    let allChecked = false;
    if (state) {
        selectedItems.push(id);
    } else {
        const index = selectedItems.indexOf(id);
        selectedItems.splice(index, 1);
    }
    return {allChecked, selectedItems};
}

function getAllElementIds(pipelines) {
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
