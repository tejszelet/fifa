const NO_DATA = "Nincs adat";
export function valueOrFallback(value) {
  return value && String(value).trim() !== "" ? value : NO_DATA;
}
function createCard(match) {
  return `
    <article class="card">
      <h3>${match.year} év győztese: <span>${valueOrFallback(match.winner)}</span></h3>
      <p>Az eredmény: <b>${valueOrFallback(match.score)}</b></p>
      <p>A második helyezett: <b>${valueOrFallback(match.runner_up)}</b></p>
      <button type="button" class="btn btn-dark" data-id="${match.id}">Részletek...</button>
    </article>
  `;
}
export function renderMatches(list) {
  document.querySelector(".matches").innerHTML = list.map(createCard).join("");
}