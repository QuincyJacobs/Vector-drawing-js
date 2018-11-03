function createInfoEntry()
{
	// decide background color
	var entryBackgroundColor;
	$("#vectorInfoBox").children().length%2 ? entryBackgroundColor = "white" : entryBackgroundColor = "lightgrey";

	// color picker
	var currentColors = _drawLineColor.substr(4).slice(0, -1).split(",");
	var input = document.createElement('INPUT')
    var picker = new jscolor(input);
    picker.fromRGB(currentColors[0], currentColors[1], currentColors[2]);
    $(input).attr('id', 'input_'+lines);

    // delete
    var deleteButton = "<div class='removeVectorButton noselect' onClick='removeVector("+lines+")'>Delete</div>"

	//show line position in pixels
	$("#vectorInfoBox").append(
		"<div class='vectorInfo vectorInfo"+lines+"' style='background-color: "+entryBackgroundColor+"'>" +
			"<div class='infoVectorTitle'> vector "+vectorArray[lines].id+ "</div>" +
			"<div class='infoNumberBox'>" + vectorArray[lines].x1 + "</div>" +
			"<div class='smallDivider'/>" +
			"<div class='infoNumberBox'>" + vectorArray[lines].y1 + "</div>" +
			"<div class='infoBoxDivider'/>" +
			"<div class='infoNumberBox'>" + vectorArray[lines].x2 + "</div>" +
			"<div class='smallDivider'/>" +
			"<div class='infoNumberBox'>" + vectorArray[lines].y2 + "</div>" +
			"<div class='infoBoxDivider'/>" +
			"<div class='infoNumberBox'>" + vectorArray[lines].vecX + "</div>" +
			"<div class='smallDivider'/>" +
			"<div class='infoNumberBox'>" + vectorArray[lines].vecY + "</div>" +
			"<div class='infoBoxDivider'/>" +
		"</div>"
	);
	$(".vectorInfo"+lines).append(input);
	$(".vectorInfo"+lines+" INPUT").on('change', function()
	{
    	updateExistingVector(this.value, $(this).attr('id').substr(6));
    });
	$(".vectorInfo"+lines).append("<div class='infoBoxDivider'/>" + deleteButton);
}
