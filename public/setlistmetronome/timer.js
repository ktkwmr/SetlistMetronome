// Ticks every 25 ms for the metronome's scheduler in index.html.
// A worker keeps ticking when the tab is in the background, where timers on the page are slowed down.
let timer = null;
onmessage = (e) => {
  clearInterval(timer);
  if (e.data === "start") timer = setInterval(() => postMessage(0), 25);
};
