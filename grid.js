function buildGrid(
	boids,
	min = -50,
	max = 50,
	cubeSize = 10,
) {
	const limit = (max - min) / cubeSize;
	const grid = [];
	for (let x = 0; x <= limit; x++) {
		grid[x] = [];
		for (let y = 0; y <= limit; y++) {
			grid[x][y] = [];
			for (let z = 0; z <= limit; z++) {
				grid[x][y][z] = [];
			}
		}
	}

	boids.forEach(boid => {
		const { x, y, z } = boid.position;
		grid[Math.round((x - min) / cubeSize)]
		[Math.round((y - min) / cubeSize)]
		[Math.round((z - min) / cubeSize)].push(boid);
	});

	function getBoids({ x, y, z }, searchDistance = 1) {
		const _x = Math.round((x - min) / cubeSize);
		const _y = Math.round((y - min) / cubeSize);
		const _z = Math.round((z - min) / cubeSize);

		let found = [];

		let xStart = Math.max(_x - searchDistance, 0);
		let yStart = Math.max(_y - searchDistance, 0);
		let zStart = Math.max(_z - searchDistance, 0);

		for(let i = xStart; i <= _x + searchDistance && i <= limit; i++) { 
			for(let j = yStart; j <= _y + searchDistance && j <= limit; j++) {
				for(let k = zStart; k <= _z + searchDistance && k <= limit; k++) {	
					grid[i][j][k].forEach(boid => found.push(boid));
				}
			}		
		}

		return found;
	}

	return { getBoids };
}
