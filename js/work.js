let allWorks = [];
let activeFilter = "all";

function buildGrid(filter) {
  activeFilter = filter;
  const grid = document.getElementById("workGrid");
  if (!grid) return;

  const sorted = [...allWorks].sort((a, b) => b.year - a.year);
  const filtered = filter === "all" ? sorted : sorted.filter(w => w.category === filter);

  grid.innerHTML = "";

  filtered.forEach(work => {
    const a = document.createElement("a");
    a.className = "work-card";
    a.href = `project-detail-new.html?id=${work.id}`;

    const tagsStr = work.tags.join(", ");
    const clientLine = work.client
      ? `<span class="sub-client">${work.client}</span>`
      : "";

    a.innerHTML = `
      <div class="work-card-image">
        <img src="${work.thumbnail}" alt="${work.title}" loading="lazy">
      </div>
      <p class="work-card-title">${work.title}</p>
      <div class="work-card-subtitles">
        <span>${tagsStr}</span>
        ${clientLine}
        <span>${work.year}</span>
      </div>
    `;

    grid.appendChild(a);
  });
}

function getStoredWorks() {
  const stored = localStorage.getItem("gggyd_works");
  return stored ? JSON.parse(stored) : null;
}

document.addEventListener("DOMContentLoaded", async () => {
  // prefer localStorage edits over the JSON file
  const stored = getStoredWorks();
  if (stored) {
    allWorks = stored;
    buildGrid(activeFilter);
  } else {
    const res = await fetch("data/works.json");
    allWorks = await res.json();
    buildGrid(activeFilter);
  }

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      buildGrid(btn.dataset.filter);
    });
  });
});
