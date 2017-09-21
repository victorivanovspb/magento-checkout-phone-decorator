
function checkPhoneNumber(num) {
    return /^\d+$/
        .test(removeSymbols(num, [" ", "+", "-"])); // is only digits
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
    var curr;
    while (symbols.length > 0) {
        curr = symbols.pop();
        msg = msg.split(curr).join("");
    }
    return msg;
}

function getFuncPhoneDecorator(id) {
    var num, result;
    return function() {
        num = $(id).val().trim();

        if (checkPhoneNumber(num)) {
            num = removeSymbols(num, [" ", "-", "+"]);
            result = setIntervalsInto(num, "-", [3, 3, 2, 2]); // set intervals: 333-333-22-22
            result = (num.charAt(0) === "+".charAt(0)) ? "+" + result : result;
            $(id).val(result);
        } else {
            $("#checkout-phone-decorator")
                .attr("class", "phone-decorator-alert");
        }

        incMsg();
    }
}

function phoneDecoratorReset() {
    $("#checkout-phone-decorator")
        .attr("class", "phone-decorator");
}

function incMsg() {
    var $msg = $("#msgtxt");
    $msg.html($msg.html() + "&square;");
}

$(document).ready(function() {
    $("input#billing-telephone")
        .focus(phoneDecoratorReset)
        .blur(getFuncPhoneDecorator("input#billing-telephone"));
});