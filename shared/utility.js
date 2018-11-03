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
