function Range(n) {
    return Array.apply(null, {
        length: n
    }).map(Number.call, Number);
}

function Range2(n) {
    var array = [];
    for (var i = 0; i < n; ++i) {
        array.push(i);
    }
    return array;
}




console.time('Range');
for (var i = 0; i < 10000; ++i) {

    Range(10000);

}
console.timeEnd('Range');



console.time('Range2');
for (var i = 0; i < 10000; ++i) {

    Range2(10000);

}
console.timeEnd('Range2');
