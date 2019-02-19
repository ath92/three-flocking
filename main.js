// setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// put camera in a nice position and point it in the right direction
camera.position.set(_width / 2, _height / 2, _depth * 1.7);

const controls = new THREE.OrbitControls( camera );
controls.target = middle;

// Add wireframe cube around scene to know what we're looking at
const boxGeometery = new THREE.BoxGeometry(_width, _height, _depth);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
const boxMesh = new THREE.Mesh(boxGeometery, boxMaterial);
boxMesh.position.set(_width / 2, _height / 2, _depth / 2);
scene.add(boxMesh);

// spawn boids
const boids = Array(numBoids).fill(null).map(() => spawnBoid(scene));

let pause = false;
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	controls.update();

	if (pause) return;

	boids.forEach(boid => {
		boid.calculateSpeed(boids);
		boid.move();
	});
}
animate();

window.addEventListener('keypress', e => {
	if (e.key === 'p') {
		pause = !pause;
	}
});
