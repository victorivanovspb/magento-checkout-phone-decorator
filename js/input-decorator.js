
function isOnlyDigits(num) {
    return /^\d+$/.test(num);
}

function checkPhoneNumber(num) {
    num = removeSymbols(num, [" ", "+", "-"]);
    if (isOnlyDigits(num)) {
        return true;
    }
    return false;
}

function setIntervalsInto(msg, ch, intervals) {
    if (msg.length < 3) {
        return msg;
    }

    var result = "";
    var ic = 0; // current interval counter
    for (var i = msg.length - 1; i >= 0; i--, ic--) {

        // load/pop next interval
        while (ic == 0 && intervals.length > 0) {
            ic = intervals.pop()
        }

        // add next character
        result = msg.charAt(i) + result;

        // add special symbol (param ch) when interval counter is 1
        if (ic == 1) {
            result = ch + result;
        }
    }

    result = trim(result, '-');
    return result;
}

function trim(s, mask) {
    while (~mask.indexOf(s[0])) {
        s = s.slice(1);
    }
    while (~mask.indexOf(s[s.length - 1])) {
        s = s.slice(0, -1);
    }
    return s;
}

function removeSymbols(msg, symbols) {
    while (symbols.length > 0) {
        curr = symbols.pop();
        msg = msg.split(curr).join("");
    }
    return msg;
}

function phoneDecorator() {
    var num = document.getElementById("billing:telephone").value.trim();
    var isPlus = (num.charAt(0) === "+".charAt(0) ? true : false);
    
    if (checkPhoneNumber(num)) {
        num = removeSymbols(num, [" ", "-", "+"]);
        result = setIntervalsInto(num, "-", [3, 3, 2, 2]) // set intervals: 333-333-22-22
        result = (isPlus) ? "+" + result : result;
        document.getElementById("billing:telephone").value = result;
    } else {
        document.getElementById("checkout-phone-decorator").setAttribute("class", "phone-decorator-alert");
    }

    incMsg();
}

function phoneDecoratorReset() {
    document.getElementById("checkout-phone-decorator").setAttribute("class", "phone-decorator");
}

function incMsg() {
    var msg = document.getElementById("msgtxt").innerHTML;
    document.getElementById("msgtxt").innerHTML = msg + "&square;";
}