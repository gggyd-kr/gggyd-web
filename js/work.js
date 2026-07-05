const works = [
  {
    id: "flower-side-table",
    title: "꽃 사이드 테이블",
    category: "designed-made",
    year: "2026",
    client: null,
    tags: ["Furniture"],
    thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
  },
  {
    id: "popup-booth",
    title: "백화점 팝업 부스",
    category: "fabrication",
    year: "2024",
    client: "OO건축사무소",
    tags: ["Space"],
    thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop",
  },
  {
    id: "wood-object",
    title: "우드 오브제 컬렉션",
    category: "designed-made",
    year: "2023",
    client: null,
    tags: ["Object"],
    thumbnail: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&h=400&fit=crop",
  },
  {
    id: "jogakbo-tray",
    title: "조각보 트레이",
    category: "designed-made",
    year: "2022",
    client: null,
    tags: ["Object", "조각보"],
    thumbnail: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&h=400&fit=crop",
  },
];

const LABELS = {
  "designed-made": "자체 제작",
  "designed":      "디자인",
  "fabrication":   "제작 협업",
};

function buildList(filter) {
  const list = document.getElementById("workList");
  const sorted = [...works].sort((a, b) => b.year - a.year);
  const filtered = filter === "all" ? sorted : sorted.filter(w => w.category === filter);

  list.innerHTML = "";

  filtered.forEach(work => {
    const a = document.createElement("a");
    a.className = "work-item";
    a.href = `project-detail-new.html?id=${work.id}`;
    a.dataset.thumbnail = work.thumbnail || "";

    const tagsStr = work.tags.join(" · ");
    const clientStr = work.client ? `<span class="work-client">${work.client}</span>` : "";

    a.innerHTML = `
      <span class="work-title">${work.title}</span>
      <span class="work-meta">
        <span class="work-tags">${tagsStr}</span>
        ${clientStr}
        <span class="work-year">${work.year}</span>
      </span>
    `;

    list.appendChild(a);
  });
}

function initHoverPreview() {
  const preview = document.getElementById("thumbPreview");
  const img = document.getElementById("thumbImg");
  const list = document.getElementById("workList");

  let currentThumb = null;
  let raf = null;
  let mouseX = 0, mouseY = 0;

  function movePreview() {
    const offsetX = 24;
    const offsetY = -80;
    let x = mouseX + offsetX;
    let y = mouseY + offsetY;

    const pw = preview.offsetWidth;
    const ph = preview.offsetHeight;
    if (x + pw > window.innerWidth - 16) x = mouseX - pw - offsetX;
    if (y + ph > window.innerHeight - 16) y = window.innerHeight - ph - 16;
    if (y < 0) y = 0;

    preview.style.transform = `translate(${x}px, ${y}px)`;
    raf = null;
  }

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (preview.classList.contains("visible") && !raf) {
      raf = requestAnimationFrame(movePreview);
    }
  });

  list.addEventListener("mouseover", e => {
    const item = e.target.closest(".work-item");
    if (!item) return;
    const thumb = item.dataset.thumbnail;
    if (!thumb || thumb === currentThumb) return;
    currentThumb = thumb;
    img.src = thumb;
    preview.classList.add("visible");
    if (!raf) raf = requestAnimationFrame(movePreview);
  });

  list.addEventListener("mouseout", e => {
    const item = e.target.closest(".work-item");
    if (!item) return;
    if (!list.contains(e.relatedTarget) || !e.relatedTarget?.closest(".work-item")) {
      preview.classList.remove("visible");
      currentThumb = null;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildList("all");
  initHoverPreview();

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      buildList(btn.dataset.filter);
    });
  });
});
