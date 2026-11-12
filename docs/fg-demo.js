/* FG-COMPASS landing-page demo: a clickable overhand-throw decision tree.
   Text comes from window.FG_DEMO (set on each language's index page). */
(function () {
  var T = window.FG_DEMO;
  var root = document.getElementById("fg-demo");
  if (!T || !root) return;
  var $ = function (id) { return document.getElementById(id); };
  var node = "q1";
  var track = function (l) {
    root.querySelectorAll(".fg-demo-track span").forEach(function (s) {
      s.classList.toggle("on", Number(s.dataset.l) === l);
    });
  };
  function render() {
    $("fg-demo-step").textContent = T[node].step;
    $("fg-demo-q").textContent = T[node].q;
  }
  function finish(l) {
    $("fg-demo-btns").hidden = true;
    $("fg-demo-q").hidden = true;
    $("fg-demo-step").textContent = T.result;
    $("fg-demo-level").textContent = l;
    $("fg-demo-level-name").textContent = T.level + " " + l + " · " + T.levels[l][0];
    $("fg-demo-level-desc").textContent = T.levels[l][1];
    $("fg-demo-result").hidden = false;
    $("fg-demo-reset").hidden = false;
    track(l);
    $("fg-demo-reset").focus();
  }
  root.querySelectorAll("#fg-demo-btns button").forEach(function (b) {
    b.addEventListener("click", function () {
      var next = T[node][b.dataset.a];
      if (typeof next === "number") finish(next); else { node = next; render(); }
    });
  });
  $("fg-demo-reset").addEventListener("click", function () {
    node = "q1";
    $("fg-demo-btns").hidden = false;
    $("fg-demo-q").hidden = false;
    $("fg-demo-result").hidden = true;
    $("fg-demo-reset").hidden = true;
    track(0);
    render();
    root.querySelector(".fg-yes").focus();
  });
  render();
})();
