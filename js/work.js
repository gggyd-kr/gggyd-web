const works = [
  {
    id: "flower-side-table",
    title: "Flower Side Table",
    category: "designed-made",
    year: "2026",
    client: null,
    tags: ["Furniture"],
    thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=740&fit=crop",
  },
  {
    id: "popup-booth",
    title: "Department Store Pop-up Booth",
    category: "fabrication",
    year: "2024",
    client: "OO Architecture Studio",
    tags: ["Space"],
    thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=740&fit=crop",
  },
  {
    id: "wood-object",
    title: "Wood Object Collection",
    category: "designed-made",
    year: "2023",
    client: null,
    tags: ["Object"],
    thumbnail: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&h=740&fit=crop",
  },
  {
    id: "jogakbo-tray",
    title: "Jogakbo Tray",
    category: "designed-made",
    year: "2022",
    client: null,
    tags: ["Object"],
    thumbnail: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&h=740&fit=crop",
  },
];

function buildGrid(filter) {
  const grid = document.getElementById("workGrid");
  const sorted = [...works].sort((a, b) => b.year - a.year);
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

document.addEventListener("DOMContentLoaded", () => {
  buildGrid("all");

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      buildGrid(btn.dataset.filter);
    });
  });
});
