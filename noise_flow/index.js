const p5 = require('p5');
const {Vector} = require('p5');
const Simplex = require('simplex-noise');

const w = 500;
const h = 500;

const simplex = new Simplex("init");

// Found vector field function here: https://www.intmath.com/blog/mathematics/vector-fields-a-simple-and-painless-introduction-3345
function createVectorField(step, t) {
    const cols = Math.floor(w/step) + 1;
    const rows = Math.floor(h/step) + 1;
    const field = initField(cols, rows);

    for (var x = 0; x < field.length; x++) {
        for (var y = 0; y < field[0].length; y++) {
            // let angle = simplex.noise3D(x / 30, y / 30, t) * 2 * Math.PI;
            // let magnitude = simplex.noise3D(x / 20  + 300, y / 20 + 400, n
            // field[x][y] = p5.Vector.fromAngle(angle, magnitude * 0.1);
            field[x][y] = new p5.Vector(0.1, Math.sin(x*x*w*w + y*y*h*h)*0.1);
        }
    }

    return field;
}

class Particle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y);
        this.velocity = new p5.Vector(Math.random() - 0.5, Math.random() - 0.5);
        this.acc = new p5.Vector(0, 0);
        this.size = 5;

        this.lifeTime = 200;
    }

    move(newAcc) {
        this.acc.add(newAcc);   
        this.velocity.add(this.acc);
        this.pos.add(this.velocity);

        if (this.velocity.mag() > 2) {
            this.velocity.setMag(2);
        }
        this.acc.setMag(0);

        this.lifeTime -= 1;
    }
}

function initParticles() {
    const particles = [];
    let numberOfParticles = w * h / 1000;
    for (var i = 0; i < numberOfParticles; i++) {
        let particle = new Particle(Math.random() * w, Math.random() * h);
        particles.push(particle);
    }

    return particles;
}



const sketch = function(s) {
    const step = 3;
    let vectorField = createVectorField(step, 0);
    let particles = initParticles();
    let t = 0;
    
    s.setup = function() {
        s.createCanvas(w, h);
        s.background(0);
        s.colorMode(s.HSB, 100, 100, 100, 100);
        s.angleMode(s.RADIANS);
    };

    
    s.draw = function() {
        // drawField(vectorField, 10);


        if (t % 400 === 0) {
            particles = initParticles();
        }
        
        drawParticles(particles, vectorField, 10);
        vectorField = createVectorField(step, t/10);
        t += 1;

        if (t % 2000 === 0) {
            s.noLoop();
            console.log("Done");
        }
    };

    function drawField(vectorField, stepSize) {
        for (var x = 0; x < vectorField.length; x++) {
            for (var y = 0; y < vectorField[0].length; y++) {
                let v = vectorField[x][y];
                s.line(x*stepSize, y*stepSize,
                       x*stepSize + v.x, y*stepSize + v.y);
            }
        }
    }
    
    function drawParticles(particles, field, step) {
        particles.forEach(p => {
            const [x, y] = [p.pos.x, p.pos.y];
            s.noStroke();
            s.fill(Math.sin(s.noise(t/10))*20+60, 70, 100, p.lifeTime/8+20);
            s.ellipse(x, y, 2, 2);

            // Move along field
            const pos = p.pos;
            let vel;
            if(pos.x >= 0 && pos.x < w && pos.y >= 0 && pos.y < h) {
                vel = field[Math.floor(pos.x/step)][Math.floor(pos.y/step)];
            }
            p.move(vel);
        });
    }
};

function initField(cols, rows) {
    let field = Array(cols);
    for (var i = 0; i < field.length; i++) {
        field[i] = Array(rows);
    }
    return field;
}

new p5(sketch);
