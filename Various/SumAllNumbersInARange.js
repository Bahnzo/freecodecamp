function sumAll(arr) {
    var len = arr.length;
    var sum1;
    arr = arr.sort(function(a, b) { return a - b; });
    sum1 = arr[0] + arr[len - 1];
    for (var i = arr[0] + 1; i < arr[len - 1]; i++) {
        sum1 += i;
    }
    return sum1;
}

sumAll([4, 1]);