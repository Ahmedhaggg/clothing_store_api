Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

exports.addHoursToDate = (date, hours) => {
    let newDate = date.addHours(hours);
    return newDate;
}