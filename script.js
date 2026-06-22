const card = document.querySelector(".liquid-card");
const indicator = document.querySelector(".svg-indicator");

if (card && indicator) {
  const limit = 6;

  window.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty("--tilt-x", `${(-y * limit).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(x * limit).toFixed(2)}deg`);
    indicator.style.setProperty("--drift-x", `${(x * 13).toFixed(1)}px`);
    indicator.style.setProperty("--drift-y", `${(y * 10).toFixed(1)}px`);
  });

  window.addEventListener("pointerleave", () => {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    indicator.style.setProperty("--drift-x", "0px");
    indicator.style.setProperty("--drift-y", "0px");
  });
}
