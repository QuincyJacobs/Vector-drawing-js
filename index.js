var _cartesianRange = 10;
var _cartesianSize = 500;

var _lineColor = 'grey';
var _edgeColor = 'black';
var _drawLineColor = 'red';
var _backGroundColor = 'white';

$(document).ready(function(){
	
	// update colors with the colors entered in html (may be cached from previous versions)
	_lineColor = $("#lineColor").css('backgroundColor');
	_edgeColor = $("#edgeColor").css('backgroundColor');
	_backGroundColor = $("#bgColor").css('backgroundColor');
	_drawLineColor = $("#drawColor").css('backgroundColor');

	var margin = 50;

	var vectorDivArray = [];
	var arrowHeadArray = [];

	var lines = 0;

	var click = false;
	var inCartesian = false;
	var startX = 0;
	var startY = 0;
	var endX = 0;
	var endY = 0;

	$("body").append("<div id='cartesian'></div>");
	$("body").append("<div id='vectors'></div>");
	$("body").append("<div id='arrows'></div>");

	//************************************************************************************************************************************************************************************************************************************
	// DRAW STUFF
	//************************************************************************************************************************************************************************************************************************************
	
	drawCartesian();
	
	function drawCartesian()
	{
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

		for(var i = 1; i < _cartesianRange * 2; i++)
		{
			$("#cartesian").append("<div class='cartesian_line' style='width: "+_cartesianSize+"px; height: 1px; top: "+((_cartesianSize / (_cartesianRange * 2)) * i)+"px; position: absolute; background-color: "+_lineColor+"'></div>");
			$("#cartesian").append("<div class='cartesian_line' style='width: 1px; height: "+_cartesianSize+"px; left: "+((_cartesianSize / (_cartesianRange * 2)) * i)+"px; position: absolute; background-color: "+_lineColor+"'></div>");
		}

		$("#cartesian").append("<div class='cartesian_edge' style='width: "+_cartesianSize+"px; height: 1px; top: "+(_cartesianSize / 2)+"px; position: absolute; background-color: "+_edgeColor+"'></div>");
		$("#cartesian").append("<div class='cartesian_edge' style='width: 1px; height: "+_cartesianSize+"px;; left: "+(_cartesianSize / 2)+"px; position: absolute; background-color: "+_edgeColor+"'></div>");
	}

	function startVectorDraw(mouseEvent)
	{
		if(inCartesian)
		{
			click = true;

			startX = roundTo(mouseEvent.pageX, (_cartesianSize / (_cartesianRange * 2)));
			startY = roundTo(mouseEvent.pageY, (_cartesianSize / (_cartesianRange * 2)));
			vectorDivArray.push("<div class='vector'  style='background-color: "+_drawLineColor+"; position: absolute; height: 2px;'></div>");
			arrowHeadArray.push("<div class='arrow'  style='background-color: "+_drawLineColor+"; position: absolute; height: 2px;'></div>");
		}
	}

	function drawLine(x, y)
	{
		if(click)
		{
			console.log(_drawLineColor);
			endX = x;
			endY = y;

			$("#vectors").children('#vector'+lines+'').remove();
			$("#vectors").children('#arrowParent'+lines+'').remove();

			var distance = Math.sqrt( ((startX-endX)*(startX-endX)) + ((startY-endY)*(startY-endY)) );
			var xMid = (startX+endX)/2;
			var yMid = (startY+endY)/2;
			var slope = (((Math.atan2(startY-endY, startX-endX)) * 180) / Math.PI);

			vectorDivArray.pop();
			vectorDivArray.push("<div class='vector' id='vector"+lines+"' style='background-color: "+_drawLineColor+"; position: absolute; height: 3px; width: "+distance+"px; top: "+(yMid)+"px; left: "+(xMid-(distance/2) + 1)+"px; transform: rotate("+slope+"deg);'></div>");
			arrowHeadArray.pop();
			arrowHeadArray.push("<div class='arrowParent' id='arrowParent"+lines+"' style='position: absolute; display: inline-block; top: "+endY+"px; left: "+endX+"px; padding: 5px;'><div class='arrowCW' id='arrowCW"+lines+"' style=' border: solid "+_drawLineColor+"; border-width: 0 0 3px 3px  ; display: inline-block; padding: 5px; transform: translate(-10px, -12px) rotate("+(slope+45)+"deg);'></div></div>");

			$("#vectors").append(vectorDivArray[lines]);
			$("#vectors").append(arrowHeadArray[lines]);
		}
	}

	function endVectorDraw(mouseEvent)
	{
		if(click && inCartesian && (startX != roundTo(mouseEvent.pageX, (_cartesianSize / (_cartesianRange * 2))) | startY != roundTo(mouseEvent.pageY, (_cartesianSize / (_cartesianRange * 2)))))
		{
			drawLine(roundTo(mouseEvent.pageX, (_cartesianSize / (_cartesianRange * 2))), roundTo(mouseEvent.pageY, (_cartesianSize / (_cartesianRange * 2))));
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
			$("#vectors").children('#vector'+lines+'').remove();
			$("#vectors").children('#arrowParent'+lines+'').remove();
			vectorDivArray.pop();
			arrowHeadArray.pop();
			click = false;
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


	//************************************************************************************************************************************************************************************************************************************
	// UX STUFF
	//************************************************************************************************************************************************************************************************************************************

	$( document ).mousedown(function( event ) 
	{
		if(event.which == 1){
			if(!click){
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


	//************************************************************************************************************************************************************************************************************************************
	// MENU STUFF
	//************************************************************************************************************************************************************************************************************************************
	
	
});

function updateEdgeColor(jscolor)
{
	_edgeColor = '#' + jscolor;
	elements = document.getElementsByClassName("cartesian_edge");
	console.log(elements);
	for (var i = 0; i < elements.length; i++) {
    	elements[i].style.backgroundColor = _edgeColor;
	}
	$("#cartesian").css({"border-color": _edgeColor});
}
function updateLineColor(jscolor)
{
	_lineColor = '#' + jscolor;
	elements = document.getElementsByClassName("cartesian_line");
	console.log(elements);
	for (var i = 0; i < elements.length; i++) {
    	elements[i].style.backgroundColor = _lineColor;
	}
}
function updateBackgroundColor(jscolor)
{
	console.log("r")
	_backGroundColor = '#' + jscolor;
	$("#cartesian").css({"background-color": _backGroundColor});
}
function updateDrawColor(jscolor)
{
	_drawLineColor = '#' + jscolor;
}