var makeDate = function(){
    var D = new Date();
    var formattedDate = " ";

    formattedDate += (D.getMonth() + 1) + "_";
    formattedDate += D.getDate() + "_";
    formattedDate += D.getFullYear();
    return formattedDate;
};

module.exports = makeDate;