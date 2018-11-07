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

function AddVectors(vector1, vector2, id, color)
{
	return new Vector(
		id,
		vector1.x1,
		vector1.y1,
		vector2.x2,
		vector2.y2,
		vector1.vecX + vector2.vecX,
		vector1.vecY + vector2.vecY,
		color
	);
}