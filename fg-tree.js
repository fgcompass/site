/* FG-COMPASS animated decision tree: walks through the four possible paths in turn.
   Captions come from data-cap1..4 attributes so each language page supplies its own text. */
(function () {
  var root = document.getElementById("fg-tree");
  if (!root) return;
  var svg = root.querySelector("svg");
  var cap = document.getElementById("fg-tree-cap");
  var btn = document.getElementById("fg-tree-toggle");
  var paths = {
    4: ["n-q1", "e-q1-r", "n-r", "e-r-4", "n-4"],
    1: ["n-q1", "e-q1-l", "n-l", "e-l-1", "n-1"],
    3: ["n-q1", "e-q1-r", "n-r", "e-r-3", "n-3"],
    2: ["n-q1", "e-q1-l", "n-l", "e-l-2", "n-2"]
  };
  var order = [4, 1, 3, 2];
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var playing = !reduce, visible = false, i = 0, step = 0, timer = null;

  function clear() { svg.querySelectorAll(".on").forEach(function (el) { el.classList.remove("on"); }); }
  function show(level, upto) {
    clear();
    paths[level].slice(0, upto).forEach(function (id) { document.getElementById(id).classList.add("on"); });
    if (upto >= paths[level].length) cap.innerHTML = root.dataset["cap" + level];
  }
  function tick() {
    var level = order[i];
    step += 1;
    if (step === 1) cap.innerHTML = "&nbsp;";
    show(level, step);
    var done = step >= paths[level].length;
    if (done) { step = 0; i = (i + 1) % order.length; }
    timer = setTimeout(loop, done ? 2600 : 650);
  }
  function loop() { timer = null; if (playing && visible) tick(); }
  function setPlaying(p) {
    playing = p;
    btn.querySelector("i").className = "bi " + (p ? "bi-pause-fill" : "bi-play-fill");
    btn.querySelector("span").textContent = p ? root.dataset.pause : root.dataset.play;
    btn.setAttribute("aria-pressed", String(!p));
    if (p && !timer) loop();
  }
  btn.addEventListener("click", function () { setPlaying(!playing); });

  // Start with a complete path so the tree is never empty (also the reduced-motion view).
  show(4, 5);
  step = 0; i = 1;
  setPlaying(playing);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && playing && !timer) timer = setTimeout(loop, 1200);
    }, { threshold: 0.3 }).observe(root);
  } else { visible = true; loop(); }
})();
