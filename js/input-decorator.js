function checkPhoneNumber(num) {
    return /^\d+$/.test(removeSymbols(num, [" ", "+", "-", "(", ")", "."]));
}

function setIntervalsInto(data, ch, intervals) {
    if (data.length < 3) {
        return data;
    }
    let res = [];
    let interval = 0; // interval counter
    for (let i = data.length - 1; i >= 0; i--, interval--) {
        while (interval === 0 && intervals.length > 0) {
            interval = intervals.pop();
        }
        res.unshift(data.charAt(i));
        if (interval === 1) {
            res.unshift(ch);
        }
    }
    return trim(res.join(''), '-');
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
        let curr = symbols.pop();
        msg = msg
            .split(curr)
            .join("");
    }
    return msg;
}

function getPhoneDecorator(id) { //{names: {telephone: {id}}}) {
    return function() {
        let data = removeSymbols(
            $('input' + id).val().trim(),
            [" ", "+", "-", "(", ")", "."]
        );
        if (checkPhoneNumber(data)) {
            let sign = (data.charAt(0) === "+")
                ? "+"
                : "";
            let number = setIntervalsInto(
                data,
                "-",
                [3, 3, 2, 2] // интервалы: 333-333-22-22
            );
            $(id).val(sign + number);
        } else {
            $('#checkout-phone-decorator')
                .addClass('phone-decorator-alert');
        }
        incMsg();
    }
}

function getPhoneResetDecorator(id, cl1, cl2) {
    return function() {
        $(id)
            .removeClass(cl2)
            .addClass(cl1);
    }
}

function incMsg() {
    let $msg = $('#msgtxt');
    let text = $msg.html();
    $msg.html(text + '&square;');
}

$(document).ready(function() {
    let names = {
        telephone: {
            id: '#billing-telephone'
        },
        decorator: {
            id: '#checkout-phone-decorator',
            classes: {
                main: 'phone-decorator',
                alert: 'phone-decorator-alert'
            }

        }
    };
    $(names.telephone.id)
        .focus(getPhoneResetDecorator(names.decorator.id, names.decorator.classes.main, names.decorator.classes.alert))
        .blur(getPhoneDecorator(names.telephone.id));
});