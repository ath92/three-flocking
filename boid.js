function spawnBoid(scene, initialPosition = randomPosition(_width, _height, _depth), numberOfCones = 5) {
	const cones = [];
	for (let i = 0; i < numberOfCones; i++) {
		const radius = 0.3 / Math.sqrt(i + 1);
		const height = 1 / Math.sqrt(i + 1);
		const geometry = new THREE.ConeGeometry( radius, height, 6 );
		const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0x00ff00, wireframe: true });
		const mesh = new THREE.Mesh( geometry, material );
		scene.add(mesh);
		cones.push(mesh);
	}

	const head = cones[0];

	const position = Object.assign(head.position, initialPosition);

	const speed = new THREE.Vector3( 
		Math.random() * speedLimit * 2 - speedLimit, 
		Math.random() * speedLimit * 2 - speedLimit, 
		Math.random() * speedLimit * 2 - speedLimit
	);

	function calculateSpeed(boids) {
		const neighbors = [];
		const repellors = [];
		boids.forEach(boid => {
			if (boid === this) {
				return;
			}
			const distance = position.distanceTo(boid.position);
			// find neighbors and repellors
			if (distance < neighborRadius) {
				if (distance < repelRadius) {
					repellors.push(boid);
				} else {
					neighbors.push(boid);
				}
			}
		});

		// cohesion
		if (neighbors.length) {
			const neighborsDiff = neighbors.reduce(
				(acc, neighbor) => acc.add(neighbor.position),
				new THREE.Vector3(0, 0, 0)
			).divideScalar(neighbors.length).sub(position);
			speed.add(neighborsDiff.multiplyScalar(cohesionFactor));
		}

		// alignment
		if (neighbors.length) {
			const neighborsDiff = neighbors.reduce(
				(acc, neighbor) => acc.add(neighbor.speed),
				new THREE.Vector3(0, 0, 0)
			).divideScalar(neighbors.length).sub(speed);
			speed.add(neighborsDiff.multiplyScalar(alignmentFactor));
		}

		// separation
		if (repellors.length) {
			const repellorsDiff = repellors.reduce(
				(acc, repellor) => acc.add(repellor.position),
				new THREE.Vector3(0, 0, 0)
			).divideScalar(repellors.length).sub(position);
			speed.sub(repellorsDiff.multiplyScalar(separationFactor * (repelRadius / repellorsDiff.length()) ));
		}

		// walls
		speed.add(new THREE.Vector3(
			Math.min(0, _width - position.x),
			Math.min(0, _height - position.y),
			Math.min(0, _depth - position.z),
		).multiplyScalar(wallFactor));

		speed.add(new THREE.Vector3(
			Math.max(0, -position.x),
			Math.max(0, -position.y),
			Math.max(0, -position.z),
		).multiplyScalar(wallFactor));
		
		speed.clamp(
			new THREE.Vector3(-speedLimit, -speedLimit, -speedLimit),
			new THREE.Vector3(speedLimit, speedLimit, speedLimit),
		);
	}

	function move() {
		moveTail();
		position.add(speed);
		rotate();
	}

	function moveTail() {
		for (let i = numberOfCones - 1; i > 0; i--) {
			cones[i].position.copy(cones[i - 1].position);
			cones[i].rotation.copy(cones[i - 1].rotation);
		}
	}

	function rotate() {
		const normalizedSpeed = speed.clone().normalize();
		const coneRotation = new THREE.Vector3(0, 1, 0);

		head.quaternion.setFromUnitVectors(coneRotation, normalizedSpeed)
	}

	return { position, speed, move, rotate, calculateSpeed };
};