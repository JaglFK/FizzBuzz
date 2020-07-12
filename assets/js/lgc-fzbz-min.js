/* 
    Created on : 12.07.2020
    Author     : Jacob Keilhauer
*/$(document).ready(function(){$("#btnPlay").on('click',function(){insertFizzBuzzRows('#content-ul',!0,'<li>','</li>',$("#txtStartNum").val(),$("#txtStopNum").val(),1)})});var FIZZ_BUZZ_RULES=[{divider:3,output:'Fizz'},{divider:5,output:'Buzz'}];function checkFizzBuzz(checkingNumber){let returnedRules=[];FIZZ_BUZZ_RULES.forEach(function(rule){if(checkingNumber%rule.divider==0)
returnedRules.push(rule)});return{number:checkingNumber,rules:returnedRules}}
function getFizzBuzzString(fzbzItem){let output="";if(fzbzItem.rules==null||fzbzItem.rules.length==0){output+=fzbzItem.number}else{fzbzItem.rules.forEach(function(rule){output+=rule.output+" "})}
return output}
function*iterateFizzBuzzRows(startPoint,endPoint,incrementationSteps){for(var i=parseFloat(startPoint);i<=parseFloat(endPoint);i+=parseFloat(incrementationSteps)){yield checkFizzBuzz(i)}}
function*iterateFizzBuzzRowStrings(startPoint,endPoint,incrementationSteps){const iterator=iterateFizzBuzzRows(startPoint,endPoint,incrementationSteps);let result=iterator.next();while(!result.done){yield getFizzBuzzString(result.value);result=iterator.next()}}
function insertFizzBuzzRows(appendableId,clearAppendableId,openingTag,closingTag,startPoint,endPoint,incrementationSteps){const iterator=iterateFizzBuzzRowStrings(startPoint,endPoint,incrementationSteps);let result=iterator.next();if(clearAppendableId)
$(appendableId).html("");while(!result.done){$(appendableId).append(openingTag+result.value+closingTag);result=iterator.next()}}