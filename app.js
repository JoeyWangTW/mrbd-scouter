(function () {
  'use strict';

  var SCRAMBLE_STEP = 55;     // ms between scramble frames
  var SCRAMBLE_DURATION = 8000;

  var scouter, powerEl, labelEl, hintEl, audioEl;
  var scanning = false;
  var scrambleTimer = null;

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /* "Over 9000" should feel rare — most targets are middling, some are
     pitiful, and only the occasional roll blows past the scouter's limit. */
  function rollPowerLevel() {
    var r = Math.random();
    if (r < 0.30) return randInt(5, 99);
    if (r < 0.90) return randInt(100, 8999);
    return randInt(9001, 999999);
  }

  function randomDigits(count) {
    var s = '';
    for (var i = 0; i < count; i++) s += randInt(0, 9);
    return s;
  }

  function playScanSound() {
    if (!audioEl) return;
    try {
      audioEl.currentTime = 0;
      var p = audioEl.play();
      if (p && typeof p.catch === 'function') p.catch(function () {});
    } catch (e) { /* autoplay restrictions — ignore */ }
  }

  function reveal(value) {
    scanning = false;
    scouter.classList.remove('is-scanning');
    powerEl.textContent = String(value);
    if (value > 9000) {
      scouter.classList.add('is-over');
      labelEl.textContent = "IT'S OVER 9000!";
    } else {
      labelEl.textContent = 'POWER LEVEL';
    }
    hintEl.textContent = 'PRESS TO SCAN AGAIN';
  }

  function scan() {
    if (scanning) return;
    scanning = true;

    scouter.classList.remove('is-over');
    scouter.classList.add('is-scanning');
    labelEl.textContent = 'ANALYZING';
    hintEl.textContent = 'SCANNING';
    playScanSound();

    var target = rollPowerLevel();
    var elapsed = 0;

    scrambleTimer = window.setInterval(function () {
      elapsed += SCRAMBLE_STEP;
      powerEl.textContent = randomDigits(4);
      if (elapsed >= SCRAMBLE_DURATION) {
        window.clearInterval(scrambleTimer);
        scrambleTimer = null;
        reveal(target);
      }
    }, SCRAMBLE_STEP);
  }

  function setupEvents() {
    document.addEventListener('click', function (e) {
      var actionEl = e.target.closest('[data-action]');
      if (actionEl && actionEl.dataset.action === 'scan') scan();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        scan();
        e.preventDefault();
      }
    });
  }

  function init() {
    scouter = document.getElementById('scouter');
    powerEl = document.getElementById('power');
    labelEl = document.getElementById('power-label');
    hintEl = document.getElementById('scan-hint');
    audioEl = document.getElementById('scan-audio');
    setupEvents();
    var reticle = document.getElementById('reticle');
    if (reticle) reticle.focus();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
