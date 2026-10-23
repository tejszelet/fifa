import { worldCupList } from "./data";
import { renderMatches, valueOrFallback } from "./render";
import "./style.css";

const form = document.getElementById("search-form");
const input = document.getElementById("cim");
const clearBtn = document.getElementById("clear-btn");
const matchesEl = document.querySelector(".matches");
const msgEl = document.querySelector(".msg");

const defaultMsg = msgEl.textContent;
function showDetail(id) {
  const match = worldCupList.find((item) => item.id === id);
  alert(
    `Részletek: ${valueOrFallback(match.winner)} - ${valueOrFallback(match.runner_up)} (${match.year})\n\n` +
      `Stadion: ${valueOrFallback(match.venue)}\n` +
      `Helyszín: ${valueOrFallback(match.location)}\n` +
      `Nézők száma: ${valueOrFallback(match.attendance)}`
  );
}
function handleSearch(event) {
  event.preventDefault();
  const query = input.value.trim().toLowerCase();

  if (query === "") {
    handleClear();
    return;
  }

  const filtered = worldCupList.filter(
    (item) =>
      item.winner.toLowerCase().includes(query) ||
      item.runner_up.toLowerCase().includes(query)
  );

  msgEl.textContent =
    filtered.length === 0
      ? `Nincs találat! A keresett kifejezés: ${input.value.trim().toUpperCase()}`
      : `${input.value.trim().toUpperCase()} az alábbi döntőkben vett részt:`;

  renderMatches(filtered);
}
function handleClear() {
  input.value = "";
  msgEl.textContent = defaultMsg;
  renderMatches(worldCupList);
  input.focus();
}

form.addEventListener("submit", handleSearch);
clearBtn.addEventListener("click", handleClear);
matchesEl.addEventListener("click", (event) => {
  const btn = event.target.closest("button[data-id]");
  if (btn) showDetail(Number(btn.dataset.id));
});

renderMatches(worldCupList);