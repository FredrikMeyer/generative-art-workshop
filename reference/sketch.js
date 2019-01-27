/*
See http://p5js.org/reference/ for more.
*/

function setup() {
    createCanvas(500, 500);
}

function lineDemo() {
    // Lines:
    // line(x1,y1, x2,y2);

    g = createGraphics(100, 100);
    g.line(0, 0, 100, 100);

    return g;
}

function bezierDemo() {
    g = createGraphics(100, 100);

    // The first two arguments are the start point of the curve.
    // The two last are the end point.
    // The two last are control points.
    for (var i = 0; i <= 100; i = i + 10 ) {
        g.bezier(0, 1, 80, i, 10, 100-i, 100, 100);
    }

    return g;
}

function translationDemo() {
    g = createGraphics(100, 100);

    const N = 20;
    for (var i = 0; i < N; i++) {
        g.push();
        g.translate(50, 50);
        g.rotate(i * PI / N);
        g.translate(- 50, -50);
        g.line(0, 50, 100, 50);
        g.pop();
    }

    return g;
}


function colorDemo() {
    g = createGraphics(200, 200);

    // From color-hex.com
    const colors = [[18, 48, 48], [37, 89, 81],
                    [245, 225, 121], [247, 202, 76], [136, 13, 65]];

    let r = 100;
    while (r > 10) {
        g.fill(random(colors));
        g.ellipse(100, 100, r, r);
        console.log(r);
        r -= random(10, 20);
    }

    return g;
}



function randomNumbers() {
    // Random
    console.log("Between 0 og 1: " + random());
    console.log("In an interval: " + random(-5, 5));
    console.log("From a collection: " + random([1,2,3]));    
}

function draw() {
    image(lineDemo(), 0, 0);
    image(bezierDemo(), 120, 0);
    image(translationDemo(), 0, 120);
    image(colorDemo(), 120, 120);
    
    noLoop();
}
