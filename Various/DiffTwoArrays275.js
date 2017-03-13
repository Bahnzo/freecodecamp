function diffArray(arr1, arr2) {
    var newArr = [];
    var len, x, y = 0;
    for (var i = 0; i < arr1.length; i++) {
        x = arr1[i];
        if (arr2.indexOf(arr1[i]) === -1) {
            newArr.push(arr1[i]);
        }
    }
    for (var i = 0; i < arr2.length; i++) {
        x = arr2[i];
        if (arr1.indexOf(arr2[i]) === -1) {
            newArr.push(arr2[i]);
        }
    }
    // Same, same; but different.
    return newArr;
}

diffArray(["andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]);