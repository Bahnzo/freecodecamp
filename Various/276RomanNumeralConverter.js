function convertToRoman(num) {
    switch (true) {
        case num >= 1000:
            thousand(num);
            break;
        case num >= 500:
            fiveHundred(num);
            break;
        case num >= 100:
            hundred(num);
            break;
        case num >= 50:
            fifty(num);
            break;
        case num >= 10:
            ten(num);
            break;
        case num >= 5:
            five(num);
            break;
        case num >= 1:
            one(num);
            break;
        default:
            assemble();
            break;
    }
}

function thousand(num) {
    whole = Math.trunc(num / 1000);
    mod = num % 1000;
    for (var i = 0; i < whole; i++) {
        hold.push('M');
    }
    convertToRoman(mod);
}

function fiveHundred(num) {
    whole = Math.trunc(num / 100);
    mod = num % 100;
    if (whole == 9) {
        hold.push('C', 'M');
    } else if (whole == 5) {
        hold.push('D');
    } else {
        hold.push('D');
        for (var i = 5; i < whole; i++) {
            hold.push('C');
        }
    }
    convertToRoman(mod);
}

function hundred(num) {
    whole = Math.trunc(num / 100);
    mod = num % 100;
    if (whole == 4) {
        hold.push('C', 'D');
    } else {
        for (var i = 0; i < whole; i++) {
            hold.push('C');
        }
    }
    convertToRoman(mod);
}

function fifty(num) {
    whole = Math.trunc(num / 10);
    mod = num % 10;
    if (whole == 9) {
        hold.push('X', 'C');
    } else if (whole == 5) {
        hold.push('L');
    } else {
        hold.push('L');
        for (var i = 5; i < whole; i++) {
            hold.push('X');
        }
    }
    convertToRoman(mod);
}

function ten(num) {
    whole = Math.trunc(num / 10);
    mod = num % 10;
    if (whole == 4) {
        hold.push('X', 'L');
    } else {
        for (var i = 0; i < whole; i++) {
            hold.push('X');
        }
    }
    convertToRoman(mod);
}

function five(num) {
    whole = Math.trunc(num / 1);
    mod = num % 1;
    if (whole == 9) {
        hold.push('I', 'X');
    } else if (whole == 5) {
        hold.push('V');
    } else {
        hold.push('V');
        for (var i = 5; i < whole; i++) {
            hold.push('I');
        }
    }
    convertToRoman(mod);
}

function one(num) {
    whole = Math.trunc(num / 1);
    mod = num % 1;
    if (whole == 4) {
        hold.push('I', 'V');
    } else {
        for (var i = 0; i < whole; i++) {
            hold.push('I');
        }
    }
    convertToRoman(mod);
}

function assemble() {
    console.log(hold.join(""));
    return hold.join("");
}
var hold = [];
var whole = 0;
var mod = 0;
convertToRoman(425);