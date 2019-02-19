const _width = 100;
const _height = 50;
const _depth = 50;

const middle = new THREE.Vector3(_width / 2, _height / 2, _depth / 2);

const numBoids = 1500;

const neighborRadius = 4;
const repelRadius = 2;
const speedLimit = 0.4;

const cohesionFactor = 0.005;
const alignmentFactor = 0.10;
const separationFactor = 0.1;
const wallFactor = 0.1;