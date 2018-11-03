var _cartesianRange = 10;
var _cartesianSize = 500;
var squareSize = _cartesianSize / (_cartesianRange * 2);

var _lineColor = 'grey';
var _edgeColor = 'black';
var _drawLineColor = 'red';
var _backGroundColor = 'white';

var vectorArray = [];

var margin = 50;
var lines = 0;

var click = false;
var inCartesian = false;
var cartesianInteractionEnabled = true;

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

function drawCartesian(){}

$(document).ready(function(){
	// update colors with the colors entered in html (may be cached from previous versions)
	_lineColor = $("#lineColor").css('backgroundColor');
	_edgeColor = $("#edgeColor").css('backgroundColor');
	_backGroundColor = $("#bgColor").css('backgroundColor');
	_drawLineColor = $("#drawColor").css('backgroundColor');

	vectorArray = [];

	$("#cartesianPlaceholder").append("<div id='cartesian'></div>");
	$("#cartesianPlaceholder").append("<div id='vectors'></div>");

	drawCartesian = function()
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

	function drawVector(vector)
	{
		var startPositionX = convertXToPosition(vector.x1);
		var startPositionY = convertXToPosition(vector.y1);
		var endPositionX = convertXToPosition(vector.x2);
		var endPositionY = convertXToPosition(vector.y2);

		var distance = Math.sqrt( ((startPositionX-endPositionX)*(startPositionX-endPositionX)) + ((startPositionY-endPositionY)*(startPositionY-endPositionY)) );
		var xMid = (startPositionX+endPositionX)/2;
		var yMid = (startPositionY+endPositionY)/2;
		var slope = (((Math.atan2(startPositionY-endPositionY, startPositionX-endPositionX)) * 180) / Math.PI);

		$("#vectors").append("<div class='vector' id='vector"+vector.id+"' style='background-color: "+vector.color+"; position: absolute; height: 3px; width: "+distance+"px; top: "+(yMid)+"px; left: "+(xMid-(distance/2) + 1)+"px; transform: rotate("+slope+"deg);' onmousedown='return false'></div>");
		$("#vectors").append("<div class='arrowParent' id='arrowParent"+vector.id+"' style='position: absolute; display: inline-block; top: "+endPositionY+"px; left: "+endPositionX+"px; padding: 5px;' onmousedown='return false'><div class='arrowCW' id='arrowCW"+vector.id+"' style=' border: solid "+vector.color+"; border-width: 0 0 3px 3px  ; display: inline-block; padding: 5px; transform: translate(-10px, -12px) rotate("+(slope+45)+"deg);' onmousedown='return false'></div></div>");
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

	function convertXToPosition(x)
	{
		return (margin + (_cartesianSize/2)) + (x * squareSize);
	}

	function convertYToPosition(y)
	{
		return (margin + (_cartesianSize/2)) * -1 + (x * squareSize);
	}


	//************************************************************************************************************************************************************************************************************************************
	// MOUSE / BUTTON STUFF
	//************************************************************************************************************************************************************************************************************************************

	$(document).mousedown(function( event ) 
	{
		if(cartesianInteractionEnabled)
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
		}
		
	});

	$(document).mousemove(function( event )
	{
		if(cartesianInteractionEnabled)
		{
			checkHover(event);
			drawLine(event.pageX, event.pageY);
		}
	});

	$(document).mouseup(function( event )
	{
		if(cartesianInteractionEnabled)
		{
			checkHover(event);
			endVectorDraw(event);
		}
	});
});
