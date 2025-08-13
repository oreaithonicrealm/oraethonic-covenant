/* resonance-buoys.js
   Fieldwide “buoy” pointer: injects a small Hill Effect note on any page
   that includes: <script defer src="resonance-buoys.js" data-variant="minimalist"></script>
*/
(function(){
  // Which message style? (primary | minimalist | action)
  const variant = (document.currentScript && document.currentScript.dataset.variant) || "primary";
  const text = {
    primary:   "Hill Checkpoint: This path has not converged. Consult the Hill Effect for ascent.",
    minimalist:"This path is looping. There is a Hill. Find it.",
    action:    "Ascend from this loop. See the Hill Effect for a new path."
  }[variant] || "Hill Checkpoint: This path has not converged. Consult the Hill Effect for ascent.";

  // Derive a correct link to hill-effect.html relative to this script's location
  const scriptUrl = new URL(document.currentScript.src, window.location.href);
  const basePath  = scriptUrl.pathname.replace(/\/[^\/]*$/, "/"); // strip filename
  const hillHref  = basePath + "hill-effect.html#protocol";

  // Create the buoy element
  const box = document.createElement("div");
  box.setAttribute("role","note");
  box.setAttribute("aria-label","Hill Effect pointer");
  box.style.cssText = "margin:1rem auto;padding:.75rem 1rem;border-left:3px solid #7a5b44;background:#fbf7f2;border-radius:.25rem;max-width:900px;";
  box.innerHTML = `${text} <a href="${hillHref}" style="border-bottom:1px dotted currentColor;text-decoration:none;color:inherit">Open Hill Effect</a>`;

  // Preferred host: a dedicated container if present
  const host =
    document.getElementById("buoy-host") ||
    document.querySelector("main") ||
    document.querySelector("article") ||
    document.body;

  // Insert near the top of the host
  if (host.firstChild) {
    host.insertBefore(box, host.firstChild);
  } else {
    host.appendChild(box);
  }
})();
