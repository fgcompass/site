/* FG-COMPASS web app: class list helpers shared by roster.html and index.html.
   A child's QR label holds "fgc:" followed by URL-style fields:
   c = child name or ID, r = rater, l = location. Nothing leaves the device. */
(function () {
  "use strict";
  var KEY = "fgc-roster";
  var PREFIX = "fgc:";

  function load() {
    try { var a = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(a) ? a.filter(function (x) { return x && x.c; }) : []; }
    catch (e) { return []; }
  }
  function save(list) {
    try { if (list.length) localStorage.setItem(KEY, JSON.stringify(list)); else localStorage.removeItem(KEY); } catch (e) {}
  }

  function encode(x) {
    var p = new URLSearchParams();
    p.set("c", x.c); if (x.r) p.set("r", x.r); if (x.l) p.set("l", x.l);
    return PREFIX + p.toString();
  }
  // Returns {c, r, l} or null. A plain-text code (no prefix) is taken as the child's name or ID.
  function decode(text) {
    text = String(text || "").trim();
    if (!text) return null;
    if (text.toLowerCase().indexOf(PREFIX) === 0) {
      var p = new URLSearchParams(text.slice(PREFIX.length)), c = (p.get("c") || "").trim();
      return c ? { c: c.slice(0, 80), r: (p.get("r") || "").trim().slice(0, 80), l: (p.get("l") || "").trim().slice(0, 80) } : null;
    }
    if (/^https?:\/\//i.test(text) || text.length > 80) return null;
    return { c: text, r: "", l: "" };
  }

  function csvRows(text) {
    var rows = [], row = [], f = "", q = false, i, ch;
    text = String(text).replace(/^﻿/, "");
    var delim = (text.split(/\r?\n/)[0].split(";").length > text.split(/\r?\n/)[0].split(",").length) ? ";" : ",";
    for (i = 0; i < text.length; i++) {
      ch = text[i];
      if (q) { if (ch === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += ch; }
      else if (ch === '"') q = true;
      else if (ch === delim || ch === "\t") { row.push(f); f = ""; }
      else if (ch === "\n" || ch === "\r") { if (ch === "\r" && text[i + 1] === "\n") i++; row.push(f); rows.push(row); row = []; f = ""; }
      else f += ch;
    }
    if (f || row.length) { row.push(f); rows.push(row); }
    return rows.map(function (r) { return r.map(function (v) { return v.trim(); }); }).filter(function (r) { return r.join("") !== ""; });
  }
  var NAMES = {
    c: /^(child|children|name|names|child name|student|student name|performer|participant|id|child id|aluno|aluna|nome|criança|crianca|código|codigo)$/i,
    r: /^(rater|rater name|observer|assessor|evaluator|teacher|avaliador|avaliadora|professor|professora)$/i,
    l: /^(location|class|classroom|school|site|group|local|turma|escola|grupo)$/i
  };
  // Parses a class list. Recognizes child, rater and location columns by header; without a header, column 1 is the child.
  function parse(text) {
    var rows = csvRows(text); if (!rows.length) return [];
    var head = rows[0].map(function (h) { return h.toLowerCase(); }), col = { c: -1, r: -1, l: -1 };
    head.forEach(function (h, i) { ["c", "r", "l"].forEach(function (k) { if (col[k] < 0 && NAMES[k].test(h)) col[k] = i; }); });
    if (col.c < 0 && (col.r > -1 || col.l > -1)) col.c = [0, 1, 2].filter(function (i) { return i !== col.r && i !== col.l; })[0];
    if (col.c > -1) rows.shift(); else col.c = 0;
    return rows.map(function (r) {
      return { c: (r[col.c] || "").slice(0, 80), r: col.r > -1 ? (r[col.r] || "").slice(0, 80) : "", l: col.l > -1 ? (r[col.l] || "").slice(0, 80) : "" };
    }).filter(function (x) { return x.c; });
  }

  function svg(text) {
    var qr = window.qrcode(0, "M");
    qr.addData(text, "Byte"); qr.make();
    return qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
  }

  window.FG_ROSTER = { load: load, save: save, encode: encode, decode: decode, parse: parse, svg: svg };
})();
