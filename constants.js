const _radius = 50;

const middle = new THREE.Vector3(0, 0, 0);

const numBoids = 1000;

const neighborRadius = 4;
const repelRadius = 2;
const speedLimit = 0.4;

const cohesionFactor = 0.005;
const alignmentFactor = 0.10;
const separationFactor = 0.1;
const wallFactor = 0.01;
const centerPull = 0.0003;
