/* 
    Created on : 08.07.2020
    Author     : Jacob Keilhauer
*/

/**
 * When the website is loaded, the Listener on the Play-Button will be activated.
 * @type function for the ready-content
 */
$(document).ready(function(){
    $("#btnPlay").on('click',function (){
        insertFizzBuzzRows('#content-ul',true,'<li>','</li>',$("#txtStartNum").val(),$("#txtStopNum").val(), 1);  
    });
});