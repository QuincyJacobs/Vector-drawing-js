$(document).ready(function(){
	setCartesianInteractionEnabled(false);
	setCartesianRange(20);
	drawCartesian();

	$( "#addButton" ).click(function() 
	{
		$("#error").css("display", "none");
		$("#resultX").empty();
		$("#resultY").empty();

		for(;vectorArray.length > 0;)
		{
			lines--;
			click = true;
			removeInfoEntry(lines);
			breakCurrentLineDraw();
		}
		

		//(id, x1, y1, x2, y2, vecX, vecY, color)
		var vecX1 = parseInt($("#1x").val());
		var vecY1 = parseInt($("#1y").val());
		var vecX2 = parseInt($("#2x").val());
		var vecY2 = parseInt($("#2y").val());

		if(	(vecX1 >= (_cartesianRange *-1)) && (vecX1 <= _cartesianRange) &&
			(vecY1 >= (_cartesianRange *-1)) && (vecY1 <= _cartesianRange) &&
			(vecX2 >= (_cartesianRange *-1)) && (vecX2 <= _cartesianRange) &&
			(vecY2 >= (_cartesianRange *-1)) && (vecY2 <= _cartesianRange) && 
			(vecX1 != "" || vecX1 == 0) && (vecY1 != "" || vecY1 == 0) && 
			(vecX2 != "" || vecX2 == 0) && (vecY2 != "" || vecY2 == 0))
		{
			_drawLineColor = $("#drawColor1").css('backgroundColor');
			var vector1 = new Vector(lines, 0, 0, vecX1, vecY1, vecX1, vecY1, _drawLineColor);
			drawVector(vector1);
			lines++;

			_drawLineColor = $("#drawColor2").css('backgroundColor');
			var vector2 = new Vector(lines, vecX1, vecY1, (vecX1 + vecX2), (vecY1 + vecY2), vecX2, vecY2, _drawLineColor);
			drawVector(vector2);
			lines++;

			_drawLineColor = $("#drawColor3").css('backgroundColor');
			var vector3 = AddVectors(vector1, vector2, lines, _drawLineColor);
			drawVector(vector3);
			lines++;

			$("#resultX").html(vector3.vecX);
			$("#resultY").html(vector3.vecY);
		}
		else 
		{
			$("#error").css("display", "inline-block"); 
		}
	});
});
