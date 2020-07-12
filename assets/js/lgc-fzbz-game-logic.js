/* 
    Created on : 08.07.2020
    Author     : Jacob Keilhauer
*/

/**
 * The Rules on how to play the FizzBuzz-Game.
 * If the current number is dividable by the 'divider' it'll show the output-value(s). 
 * @type Array of JSON-Objects {divider:numerable,output:string}
 */
var FIZZ_BUZZ_RULES = [
    {divider: 3, output: 'Fizz'},
    {divider: 5, output: 'Buzz'}
];


/**
 * Checks the 'checkingNumber' if it is dividable by the FIZZ_BUZZ_RULES-Array
 * Example:
 * {divider: 3, output: 'Fizz'}  |   current number: 6
 * 6 modulo 3 = 0
 * It returns {number:6, rules:[{divider:3, output:'Fizz'}]}
 * If no rule is applied to the currentNumber, the 'rules'-Array remains empty.
 * @param {numerable} checkingNumber
 * @returns JSON-Object {number:numerable,rules:[Array of JSON-Objects {divider:numerable,output:string}]}
 */
function checkFizzBuzz(checkingNumber) {
    let returnedRules = [];
    FIZZ_BUZZ_RULES.forEach(function (rule) {
        if (checkingNumber % rule.divider == 0)
            returnedRules.push(rule);
    });
    return {number: checkingNumber, rules: returnedRules};
}

/**
 * If a rule was applied to the number, then it'll return the rule's output-string otherwise it'll return the number.
 * @param {JSON-Object {number:numerable,rules:[Array of JSON-Objects {divider:numerable,output:string}]}} fzbzItem - return-value from checkFizzBuzz
 * @returns {String} The Rule-Output or the Number
 */
function getFizzBuzzString(fzbzItem) {
    let output = "";
    if (fzbzItem.rules == null || fzbzItem.rules.length == 0) {
        output += fzbzItem.number;
    } else {
        fzbzItem.rules.forEach(function (rule) {
            output += rule.output + " ";
        });
    }
    return output;
}

/**
 * Loops from start- to endPoint and calls for every increment the function 'checkFizzBuzz'
 * @param {numerable} startPoint Start-Number
 * @param {numerable} endPoint Last-Number
 * @param {numerable} incrementationSteps The value added after every increment
 * @returns JSON-Object {number:numerable,rules:[Array of JSON-Objects {divider:numerable,output:string}]}
 */
function* iterateFizzBuzzRows(startPoint, endPoint, incrementationSteps) {
    for (var i = parseFloat(startPoint); i <= parseFloat(endPoint); i+=parseFloat(incrementationSteps)) {
        yield checkFizzBuzz(i);
    }
}

/**
 * Gets the String-Values for the 'iterateFizBuzzRows
 * @param {numerable} startPoint Start-Number
 * @param {numerable} endPoint Last-Number
 * @param {numerable} incrementationSteps The value added after every increment
 * @returns {String} The Rule-Output or the Number
 */
function* iterateFizzBuzzRowStrings(startPoint, endPoint,incrementationSteps) {
    const iterator = iterateFizzBuzzRows(startPoint, endPoint,incrementationSteps);
    let result = iterator.next();
    
    while (!result.done) {
        yield getFizzBuzzString(result.value);
        result = iterator.next();
    }
}

/**
 * USES JQUERY
 * Calls the FizzBuzz-Generation and appends its content to the 'appendableID'-HTML-Element
 * @param {String} appendableId the ID for the FizzBuzz-Content
 * @param {bool} clearAppendableId 
 * @param {String} openingTag HTML-Open-Tag for the value
 * @param {String} closingTag HTML-End-Tag for the Value
 * @param {numerable} startPoint Start-Number
 * @param {numerable} endPoint Last-Number
 * @param {numerable} incrementationSteps The value added after every increment
 * @returns nothing 
 */
function insertFizzBuzzRows(appendableId, clearAppendableId, openingTag, closingTag,startPoint, endPoint, incrementationSteps) {
    const iterator = iterateFizzBuzzRowStrings(startPoint, endPoint,incrementationSteps);
    let result = iterator.next();
    
    if(clearAppendableId)
        $(appendableId).html("");
    
    while (!result.done) {
        $(appendableId).append(openingTag + result.value + closingTag);
        result = iterator.next();
    }
}