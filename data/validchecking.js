function checkString(str) {
    if (!str || typeof str !== 'string' || !str.trim()) return false;
    return true;
}


// Takes in a single argument.
// Return true if the argument is a boolean; otherwise return false.
function checkBoolean(bool) {
    if (typeof bool !== 'boolean') return false;
    return true;
}

// Takes in a MongoDB document (JavaScript object).
// Returns the same document with its _id field as a string.
// function convertId(doc) {
//     doc._id = doc._id.toString();
//     return doc;
// }


function checkRating(num){
    if (!num || (typeof num != 'number') || !Number.isInteger(num) || num < 1 || num > 10) return false;
    return true;
}

// Takes in a string argument.
// Return true if the argument is a valid email using regex expression.
function validEmail(email) {
    if (!validString(email)) return false;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// function validMetrics(metrics) {
//     if ((!metrics || typeof(metrics)!=='object') || (!validBoolean(metrics.distancedTables)) ||
//         (!validBoolean(metrics.maskedEmployees)) || (!validBoolean(metrics.noTouchPayment))  ||
//         (!validBoolean(metrics.outdoorSeating))  || (!validRating(metrics.price)) ||
//         (!validRating(metrics.rating))) return false;

//     return true;
// }

function validLink(link) {
    if (!validString(link)) return false;
    const re = /^https:\/\/www\.yelp\.com\/biz\/((\w+)-)*\w+/;
    return re.test(String(link).toLowerCase());
}

function generateList(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(i);
    }
    return arr;
}

module.exports = {
    checkString,
    checkBoolean,
    checkRating,
    //validAge,
    validEmail,
    //validBoolean,
    //validRating,
    //validMetrics,
    validLink,
    generateList
};