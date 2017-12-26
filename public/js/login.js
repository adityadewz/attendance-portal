$(document).ready(function()
{
	$('#createAcc').click(function(e) {
		console.log("hello")
    e.preventDefault()
    $('form').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow");
});

$('a').click(function (e) {
    e.preventDefault();
});
})