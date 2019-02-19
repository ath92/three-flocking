function randomPosition(width, height, depth) {
	return new THREE.Vector3(
		Math.random() * width, 
		Math.random() * height, 
		Math.random() * depth
	);
}