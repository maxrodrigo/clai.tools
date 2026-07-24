/* clai.tools */

// highlight.js grammar for shell commands
hljs.registerLanguage("bash", () => ({
  name: "cli",
  keywords: {
    $pattern: /[\w.+-]+/,
    built_in: "clai git gh curl jq sed cat grep awk lynx yt-dlp whisper pdftotext find xargs sh ollama go brew echo export mkdir mv for do done",
    keyword: "summarize draft code-review commit changelog linkedin tweet parse proofread to-csv to-json translate my-draft explain shell-cmd standup prompt strategy list show",
    literal: "self-refine cot cod tot"
  },
  contains: [
    { scope: "comment", begin: /#/, end: /$/ },
    { scope: "string", begin: /"/, end: /"/ },
    { scope: "string", begin: /'/, end: /'/ },
    { scope: "params", match: /\s--?[\w-]+/ },
    { scope: "variable", match: /\$[\w]+|\$\{[^}]*\}/ },
    { scope: "operator", match: /\|{1,2}|&{1,2}|;|>+|<+|!!/ },
    { scope: "title", match: /[\w.~/*@:-]*[./*][\w.~/*@:-]*/ }
  ]
}));

hljs.highlightAll();

// copy buttons for code blocks
document.querySelectorAll("pre code").forEach(code => {
  const pre = code.parentElement;
  if (pre.querySelector(".t-cmd")) return; // skip visualizer examples
  
  const btn = document.createElement("button");
  btn.className = "copy";
  btn.innerHTML = "⧉";
  btn.onclick = () => {
    navigator.clipboard.writeText(code.textContent);
    btn.innerHTML = "✓";
    setTimeout(() => btn.innerHTML = "⧉", 1500);
  };
  pre.appendChild(btn);
});

// visualizer hover: link tokens to explanations by index
document.querySelectorAll(".viz figure").forEach(fig => {
  const pre = fig.querySelector("pre");
  const ul = fig.querySelector("ul");
  if (!pre || !ul) return;

  pre.querySelectorAll("span[class^='t-']").forEach((el, i) => el.dataset.idx = i);
  ul.querySelectorAll("li[class^='t-']").forEach((el, i) => el.dataset.idx = i);

  pre.addEventListener("mouseover", e => {
    const span = e.target.closest("span[data-idx]");
    if (!span) return;
    ul.querySelectorAll("li").forEach(li => 
      li.classList.toggle("highlight", li.dataset.idx === span.dataset.idx)
    );
    ul.classList.add("has-highlight");
  });

  pre.addEventListener("mouseout", e => {
    if (!e.relatedTarget || !pre.contains(e.relatedTarget)) {
      ul.classList.remove("has-highlight");
      ul.querySelectorAll("li.highlight").forEach(li => li.classList.remove("highlight"));
    }
  });
});
