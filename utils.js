function randomPosition() {
	return new THREE.Vector3(
		Math.random() * _radius * 2 - _radius, 
		Math.random() * _radius * 2 - _radius, 
		Math.random() * _radius * 2 - _radius, 
	);
}