const p5 = require('p5');

const sketch = function(s) {
    s.setup = function() {
        s.createCanvas(500, 500);
    };

    s.draw = function() {
        s.line(0, 0, 500, 500);
    };
};

new p5(sketch);
