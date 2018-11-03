$(document).ready(function(){
	$("#reset").on("click", function(){
		drawCartesian();
	});
});

function updateEdgeColor(jscolor)
{
	_edgeColor = '#' + jscolor;
	elements = document.getElementsByClassName("cartesian_edge");
	for (var i = 0; i < elements.length; i++) {
    	elements[i].style.backgroundColor = _edgeColor;
	}
	elements = document.getElementsByClassName("cartesian_number");
	for (var i = 0; i < elements.length; i++) {
    	elements[i].style.color = _edgeColor;
	}
	$("#cartesian").css({"border-color": _edgeColor});
}

function updateLineColor(jscolor)
{
	_lineColor = '#' + jscolor;
	elements = document.getElementsByClassName("cartesian_line");
	for (var i = 0; i < elements.length; i++) {
    	elements[i].style.backgroundColor = _lineColor;
	}
}

function updateBackgroundColor(jscolor)
{
	_backGroundColor = '#' + jscolor;
	$("#cartesian").css({"background-color": _backGroundColor});
}

function updateDrawColor(jscolor)
{
	_drawLineColor = '#' + jscolor;

	// always use colors in rgb so both the background drawing of arrows and the picker get the right color!
	if(_drawLineColor.indexOf('#') == 0)
	{
		var rgb = hexToRgb(_drawLineColor);
		_drawLineColor = "rgb("+rgb.r+", "+rgb.g+", "+rgb.b+")";
	}

}

function removeVector(id)
{
	$("#vectors").children('#vector'+id).remove();
	$("#vectors").children('#arrowParent'+id).remove();
	$("#vectorInfoBox").children('.vectorInfo'+id).remove();
	for(var i = 0; i < vectorArray.length; i++)
	{
		if(vectorArray[i] && vectorArray[i].id == id)
		{
			delete vectorArray[i];
		}
	}
	redoEntryBackgrounds();
}

function updateExistingVector(jscolor, id)
{
	var rgb = hexToRgb(jscolor);
	jscolor = "rgb("+rgb.r+", "+rgb.g+", "+rgb.b+")";

	$("#vectors").children('#vector'+id).css('background-color', jscolor);
	$("#vectors").children('#arrowParent'+id).children('#arrowCW'+id).css('border-color', jscolor);

	for(var i = 0; i < vectorArray.length; i++)
	{
		if(vectorArray[i] && vectorArray[i].id == id)
		{
			vectorArray[i].color = jscolor;
		}
	}
}

function redoEntryBackgrounds()
{
	for(var i = 0; i < $("#vectorInfoBox").children().length; i++)
	{
		$("#vectorInfoBox").children()[i].style.backgroundColor = (i%2 ? "white" : "lightgrey");
	}
}
