let x = 1;
let y = 1;
let easing = 0.05;
let a, g, h, i, j, k, c, d, e, b, l, m, o, p, q, r, s;
let table;

function preload() {
  table = loadTable("gooey.csv", "csv", "header");
}

const PARAMS = {
  Color_One: "#f20092",
  Color_Two: "#FFE2F3",
  Cursor_Speed: 0.05,
  Portfolio: "",
};

const pane = new Tweakpane.Pane({
  title: "Controls",
  expanded: true,
});

pane.addInput(PARAMS, "Portfolio", {
  options: {
    Motion_Objects: "one",
    UXUI_Data: "two",
    Teaching_Research: "three",
  },
});

pane.addInput(PARAMS, "Color_One");
pane.addInput(PARAMS, "Color_Two");
pane.addInput(PARAMS, "Cursor_Speed", {
  min: 0.01,
  max: 0.3,
  step: 0.01,
});


function setup() {
  

  a = select(".cursor");
  g = select(".motion");
  h = select(".objects");
  j = select(".motion-link");
  k = select(".objects-link");
  l = select("#icon");
  m = select(".tp-dfwv");
  o = select(".tp-dfwv");
  p = select(".leftText");
  q = select(".rightText");

  c = color(PARAMS.Color_One);
  d = color(PARAMS.Color_Two);
  
}

function draw() {
  cursorStuff();
  stateChanges();
  portfolioChange();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function cursorStuff() {
  let targetX = windowWidth - abs(mouseX);
  let dx = targetX - x;
  x += dx * PARAMS.Cursor_Speed;

  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * PARAMS.Cursor_Speed;

  if (mouseX != 0) {
    a.style("transform", "translate(-50%,-50%)");
    a.position(x, y);
  }
}

function stateChanges() {
  m.mouseOver(paneOver);
  o.mouseOver(paneOver);

  h.mouseOver(objectsOver);
  h.mouseOut(objectsOut);

  g.mouseOver(motionOver);
  g.mouseOut(motionOut);

  k.mouseOver(objectsLinkOver);
  k.mouseOut(objectsLinkOut);

  j.mouseOver(motionLinkOver);
  j.mouseOut(motionLinkOut);
}

function objectsOver() {
  k.style("background-color", c);
  k.style("color", d);
  h.style("background-color", d);
  l.class(table.getString(0, 2));
  a.style("background-color", c);
  a.style("color", d);
  a.style("border", "none");
  j.style("background-color", d);
  j.style("color", c);
  j.style("border", "none");
  k.style("border", "none");
}

function objectsOut() {
  h.style("background-color", c);
  k.style("background-color", d);
  k.style("color", c);
}

function motionOver() {
  j.style("background-color", c);
  j.style("color", d);
  g.style("background-color", d);
  l.class(table.getString(0, 2));
  a.style("background-color", c);
  a.style("color", d);
  a.style("border", "none");
  k.style("background-color", d);
  k.style("color", c);
  j.style("border", "none");
  k.style("border", "none");
}

function motionOut() {
  g.style("background-color", c);
  j.style("background-color", d);
  j.style("color", c);
}

function motionLinkOver() {
  g.mouseOver(false);
  g.style("background-color", d);
  l.class(table.getString(1, 2));
  j.style("border", ".5vw solid", c);
  j.style("background-color", d);
  j.style("color", c);
  a.style("border", ".5vw solid", c);

  a.style("background-color", "transparent");
  a.style("color", c);
}

function motionLinkOut() {
  j.style("background-color", c);
  j.style("color", d);
}

function objectsLinkOver() {
  h.mouseOver(false);
  l.class(table.getString(1, 2));

  h.style("background-color", d);
  k.style("border", ".5vw solid", c);
  k.style("background-color", d);
  k.style("color", c);
  a.style("border", ".5vw solid", c);

  a.style("background-color", "transparent");
  a.style("color", c);
}

function objectsLinkOut() {
  k.style("background-color", c);
  k.style("color", d);
}

function portfolioChange() {
  if (PARAMS.Portfolio == "two") {
    p.html(table.getString(2, 0));
    j.attribute("href", table.getString(2, 1));
    k.attribute("href", table.getString(3, 1));
    q.html(table.getString(3, 0));
  } else if (PARAMS.Portfolio == "one") {
    p.html(table.getString(0, 0));
    j.attribute("href", table.getString(0, 1));
    k.attribute("href", table.getString(1, 1));
    q.html(table.getString(1, 0));
  } else if (PARAMS.Portfolio == "three") {
    p.html(table.getString(4, 0));
    j.attribute("href", table.getString(4, 1));
    k.attribute("href", table.getString(5, 1));
    q.html(table.getString(5, 0));
  }
}

function paneOver() {
  h.style("background-color", d);
  g.style("background-color", c);

  k.style("background-color", c);
  j.style("background-color", d);
  k.style("color", d);

  j.style("color", c);
}

$(document).mouseleave(function () {
  l.class(table.getString(2, 2));
});

pane.on("change", (ev) => {
  c = color(PARAMS.Color_One);
  d = color(PARAMS.Color_Two);
  
  
  


  //redraw();

  console.log("changed: " + JSON.stringify(ev.value));
});
