// Clock
function updateClock() {
  const now = new Date();
  document.getElementById("clock").innerText =
    now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Matches (demo data – FREE)
const matches = [
  {
    home: "Real Madrid",
    away: "Barcelona",
    score: "2 - 1",
    time: "75'"
  },
  {
    home: "Man City",
    away: "Arsenal",
    score: "1 - 1",
    time: "HT"
  },
  {
    home: "Juventus",
    away: "Inter",
    score: "0 - 0",
    time: "20'"
  }
];

const container = document.getElementById("matches");

matches.forEach(match => {
  const div = document.createElement("div");
  div.className = "match";

  div.innerHTML = `
    <div class="teams">${match.home} vs ${match.away}</div>
    <div class="score">${match.score}</div>
    <div class="time">${match.time}</div>
  `;

  container.appendChild(div);
});
