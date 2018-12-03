$(document).ready(function(){
	setCartesianInteractionEnabled(false);
	setCartesianRange(20);
	drawCartesian();

	$( "#negateButton" ).click(function() 
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
		
		var vecX1 = parseInt($("#1x").val());
		var vecY1 = parseInt($("#1y").val());

		if(	(vecX1 >= (_cartesianRange *-1)) && (vecX1 <= _cartesianRange) &&
			(vecY1 >= (_cartesianRange *-1)) && (vecY1 <= _cartesianRange) &&
			(vecX1 != "" || vecX1 == 0) && (vecY1 != "" || vecY1 == 0))
		{
			_drawLineColor = $("#drawColor1").css('backgroundColor');
			var vector1 = new Vector(lines, 0, 0, vecX1, vecY1, vecX1, vecY1, _drawLineColor);
			drawVector(vector1);
			lines++;

			_drawLineColor = $("#drawColor2").css('backgroundColor');
			var vector2 = NegateVector(vector1, lines, _drawLineColor);
			drawVector(vector2);
			lines++;

			$("#resultX").html(vector2.vecX);
			$("#resultY").html(vector2.vecY);
		}
		else 
		{
			$("#error").css("display", "inline-block"); 
		}
	});
});
