var phoneNumber = function() {
    return function(input) {
        if (input == null) return;
        var p = "";
        input = input.replace(/[\s\-]+/g, '');
        for (var i = 1; i <= input.length; i++) {
            p += (i > 5 ? (i%2==1 ? " " : "") : (i%4==0 ? "-" : "")) + input[i-1];
        }
        return p;
    }
};