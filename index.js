var _cartesianRange = 10;
var _cartesianSize = 500;

var _lineColor = 'grey';
var _edgeColor = 'black';
var _drawLineColor = 'red';
var _backGroundColor = 'white';

var vectorArray = [];

//************************************************************************************************************************************************************************************************************************************
// VECTOR STUFF
//************************************************************************************************************************************************************************************************************************************

function Vector(id, x1, y1, x2, y2, vecX, vecY, color)
{
	this.id = id; 		// int id
	this.x1 = x1; 		// tail x coordinate
	this.y1 = y1; 		// tail y coordinate
	this.x2 = x2; 		// head x coordinate
	this.y2 = y2; 		// head y coordinate
	this.vecX = vecX; 	// vector x movement
	this.vecY = vecY; 	// vector y movement
	this.color = color; // vector color
}


//************************************************************************************************************************************************************************************************************************************
// DRAW STUFF
//************************************************************************************************************************************************************************************************************************************

$(document).ready(function(){
	
	// update colors with the colors entered in html (may be cached from previous versions)
	_lineColor = $("#lineColor").css('backgroundColor');
	_edgeColor = $("#edgeColor").css('backgroundColor');
	_backGroundColor = $("#bgColor").css('backgroundColor');
	_drawLineColor = $("#drawColor").css('backgroundColor');

	var margin = 50;

	vectorArray = [];

	var lines = 0;

	var click = false;
	var inCartesian = false;
	var startX = 0;
	var startY = 0;
	var endX = 0;
	var endY = 0;

	$("#cartesianPlaceholder").append("<div id='cartesian'></div>");
	$("#cartesianPlaceholder").append("<div id='vectors'></div>");

	drawCartesian();
	
	function drawCartesian()
	{
		lines = 0;
		vectorArray = [];
		while(_cartesianSize % (_cartesianRange * 2) != 0)
		{
			_cartesianSize--;
		}
		squareSize = _cartesianSize / (_cartesianRange * 2);
		$("#vectorInfoBox").empty();
		$("#vectors").empty();
		$("#cartesian").empty();

		$("#cartesian").css({
			"top": margin + "px",
			"left": margin + "px",
			"position": "absolute",
			"width": _cartesianSize + "px",
			"height": _cartesianSize + "px",
			"border": "1px solid black",
			"background-color": _backGroundColor
		})

		for(var i = 0; i <= _cartesianRange * 2; i++)
		{
			$("#cartesian").append("<div class='cartesian_line' style='width: "+_cartesianSize+"px; height: 1px; top: "+(squareSize * i)+"px; position: absolute; background-color: "+_lineColor+"' onmousedown='return false'></div>");
			$("#cartesian").append("<div class='cartesian_line' style='width: 1px; height: "+_cartesianSize+"px; left: "+(squareSize * i)+"px; position: absolute; background-color: "+_lineColor+"' onmousedown='return false'></div>");
			$("#cartesian").append("<div class='cartesian_number noselect' style='font-size: "+(squareSize/2+4)+"px; line-height: "+(squareSize/2+4)+"px; width: "+squareSize+"px; height: "+squareSize+"px; top: "+((squareSize * i)-(squareSize/2))+"px; left: -"+(squareSize+5)+"px; text-align: right; position: absolute; color: "+_edgeColor+"; line-height: "+squareSize+"px';' onmousedown='return false'>"+((i - _cartesianRange) * -1)+"</div>")
			$("#cartesian").append("<div class='cartesian_number noselect' style='font-size: "+(squareSize/2+4)+"px; line-height: "+(squareSize/2+4)+"px; width: "+squareSize+"px; height: "+squareSize+"px; left: "+((squareSize * i)-(squareSize/2))+"px; bottom: -"+(squareSize+4)+"px; text-align: center; position: absolute; color: "+_edgeColor+"'; onmousedown='return false'>"+(i - _cartesianRange)+"</div>")
		}

		$("#cartesian").append("<div class='cartesian_edge' style='width: "+_cartesianSize+"px; height: 1px; top: "+(_cartesianSize / 2)+"px; position: absolute; background-color: "+_edgeColor+"' onmousedown='return false'></div>");
		$("#cartesian").append("<div class='cartesian_edge' style='width: 1px; height: "+_cartesianSize+"px;; left: "+(_cartesianSize / 2)+"px; position: absolute; background-color: "+_edgeColor+"' onmousedown='return false'></div>");
		$("#cartesian").append("<div class='cartesian_edge' style='width: "+_cartesianSize+"px; height: 1px; top: "+(squareSize *  (_cartesianRange * 2))+"px; position: absolute; background-color: "+_edgeColor+"' onmousedown='return false'></div>");
		$("#cartesian").append("<div class='cartesian_edge' style='width: 1px; height: "+_cartesianSize+"px; left: "+(squareSize * (_cartesianRange * 2))+"px; position: absolute; background-color: "+_edgeColor+"' onmousedown='return false'></div>");
	}

	function startVectorDraw(mouseEvent)
	{
		if(inCartesian)
		{
			click = true;

			startX = (roundTo(mouseEvent.pageX-margin, squareSize)+margin);
			startY = roundTo(mouseEvent.pageY-margin, squareSize)+margin;

			vectorArray.push(new Vector(lines, startX, startY, 0, 0, 0, 0, _drawLineColor));
		}
	}

	function drawLine(x, y)
	{
		if(click)
		{
			endX = x;
			endY = y;

			$("#vectors").children('#vector'+lines).remove();
			$("#vectors").children('#arrowParent'+lines).remove();
			vectorArray.pop();

			var distance = Math.sqrt( ((startX-endX)*(startX-endX)) + ((startY-endY)*(startY-endY)) );
			var xMid = (startX+endX)/2;
			var yMid = (startY+endY)/2;
			var slope = (((Math.atan2(startY-endY, startX-endX)) * 180) / Math.PI);

			$("#vectors").append("<div class='vector' id='vector"+lines+"' style='background-color: "+_drawLineColor+"; position: absolute; height: 3px; width: "+distance+"px; top: "+(yMid)+"px; left: "+(xMid-(distance/2) + 1)+"px; transform: rotate("+slope+"deg);' onmousedown='return false'></div>");
			$("#vectors").append("<div class='arrowParent' id='arrowParent"+lines+"' style='position: absolute; display: inline-block; top: "+endY+"px; left: "+endX+"px; padding: 5px;' onmousedown='return false'><div class='arrowCW' id='arrowCW"+lines+"' style=' border: solid "+_drawLineColor+"; border-width: 0 0 3px 3px  ; display: inline-block; padding: 5px; transform: translate(-10px, -12px) rotate("+(slope+45)+"deg);' onmousedown='return false'></div></div>");

			var startCoordX = convertXToCoord(startX);
			var startCoordY = convertYToCoord(startY);
			var endCoordX = convertXToCoord(endX);
			var endCoordY = convertYToCoord(endY);

			vectorArray.push(new Vector(
				lines,
				startCoordX, 
				startCoordY, 
				endCoordX, 
				endCoordY, 
				(endCoordX - startCoordX),
				(endCoordY - startCoordY),
				_drawLineColor)
			);
		}
	}

	function endVectorDraw(mouseEvent)
	{
		// if left mouse click, mouse inside cartesian, and position isn't the same as start
		if(click && inCartesian && (startX != roundTo(mouseEvent.pageX-margin, squareSize)+margin | startY != roundTo(mouseEvent.pageY-margin, squareSize)+margin))
		{
			drawLine(roundTo(mouseEvent.pageX-margin, squareSize)+margin, roundTo(mouseEvent.pageY-margin, squareSize)+margin);
			createInfoEntry();
			
			click = false;
			lines++;
		}
		else if(click)
		{
			breakCurrentLineDraw();
		}
	}

	function breakCurrentLineDraw()
	{
		if(click)
		{
			$("#vectors").children('#vector'+lines).remove();
			$("#vectors").children('#arrowParent'+lines).remove();
			vectorArray.pop();
			click = false;
		}
	}

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
		$(".vectorInfo"+lines+" INPUT").on('change', function(){

        	updateExistingVector(this.value, $(this).attr('id').substr(6));
        });
		$(".vectorInfo"+lines).append("<div class='infoBoxDivider'/>" + deleteButton);
	}

	function checkHover(mouseEvent)
	{
		var acceptedOutOfRange = (_cartesianSize / (_cartesianRange * 4)) - 1;
		if (mouseEvent.pageX > margin - acceptedOutOfRange
			&& mouseEvent.pageX < margin + _cartesianSize + acceptedOutOfRange
			&& mouseEvent.pageY > margin - acceptedOutOfRange
			&& mouseEvent.pageY < margin + _cartesianSize + acceptedOutOfRange)
		{
			inCartesian = true;
		}
		else
		{
			inCartesian = false;
		}
	}

	function convertXToCoord(x)
	{
		return (x - margin - (_cartesianSize/2)) / squareSize;
	}

	function convertYToCoord(y)
	{
		return (y - margin - (_cartesianSize/2)) * -1 / squareSize;
	}


	//************************************************************************************************************************************************************************************************************************************
	// MOUSE / BUTTON STUFF
	//************************************************************************************************************************************************************************************************************************************

	$(document).mousedown(function( event ) 
	{
		if(event.which == 1)
		{
			if(!click)
			{
				checkHover(event);
				startVectorDraw(event);
			}
		}
		else
		{
			breakCurrentLineDraw();
		}
	});

	$(document).mousemove(function( event )
	{
		checkHover(event);
		drawLine(event.pageX, event.pageY);
	});

	$(document).mouseup(function( event )
	{
		checkHover(event);
		endVectorDraw(event);
	});

	$("#reset").on("click", function(){
		drawCartesian();
	});
});


//************************************************************************************************************************************************************************************************************************************
// MENU STUFF
//************************************************************************************************************************************************************************************************************************************

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


//************************************************************************************************************************************************************************************************************************************
// UTILITY STUFF
//************************************************************************************************************************************************************************************************************************************


function rgbToHex(red, green, blue) 
{
    var rgb = blue | (green << 8) | (red << 16);
    return (0x1000000 + rgb).toString(16).slice(1)
}

function hexToRgb(hex) 
{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getDistance(x1, y1, x2, y2)
{
	var difference = 0;
	if (x1 > x2)
	{
		difference += (x1 - x2);
	}
	else
	{
		difference += (x2 - x1);
	}
	if (y1 > y2)
	{
		difference += (y1 - y2);
	}
	else
	{
		difference += (y2 - y1);
	}
	return difference;
}

function getDifference(a, b)
{
	if (a >= b)
	{
		return (a - b);
	}
	else
	{
		return (b - a);
	}
}

function roundTo(input, round)
{
	var leftover = input % round;
	if(leftover > (round / 2))
	{
		return input + round - leftover;
	}
	else
	{
		return input - leftover;
	}
}