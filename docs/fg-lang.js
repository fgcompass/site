/* Language switch: point the EN/PT navbar link at the same page in the other language.
   English pages live at the site root, Portuguese pages under /pt/. */
(function () {
  var link = document.querySelector('a.nav-link[href$="pt/index.html"], a.nav-link[href$="../index.html"]');
  if (!link) return;
  var page = location.pathname.split("/").pop() || "index.html";
  var base = link.getAttribute("href").replace(/index\.html$/, "");
  link.setAttribute("href", base + page + location.hash);
  link.setAttribute("hreflang", base.indexOf("pt/") > -1 ? "pt-BR" : "en");
})();
