Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2))
        s = "0" + s;

    return s;
};

Date.prototype.toSerializable = function (includeTime) {
    includeTime = includeTime || false;

    var year = this.getFullYear();
    var month = this.getMonth() + 1;
    var day = this.getDate();
    var hours = this.getHours();
    var minutes = this.getMinutes();
    var seconds = this.getSeconds();

    var date = year + '-' + month + '-' + day;
    if (includeTime)
        date += ' ' + hours + ':' + minutes + ':' + seconds; 

    return date;
};

Date.prototype.substractDays = function (dayNum) {
    return new Date(this - dayNum * 24 * 60 * 60 * 1000);
};