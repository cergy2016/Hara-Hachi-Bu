export const generateStandaloneHtmlSnippet = (): string => {
  return `<!-- 
  ==============================================================
  THE HARA HACHI BU MEAL MINDFULNESS TIMER
  Editorial Aesthetic Edition for chungbooks.fr
  Japanese Principle of Eating until 80% Full (腹八分目)
  ==============================================================
-->
<div id="hara-hachi-bu-app" class="hhb-editorial-root">
  <div class="hhb-editorial-card">
    
    <!-- Top Editorial Header -->
    <header class="hhb-header">
      <div class="hhb-eyebrow">Principles of Longevity &bull; 腹八分目</div>
      <h1 class="hhb-title">Hara Hachi Bu</h1>
      <div class="hhb-phase-pill" id="hhb-nav-phase">Phase 01: Slow Dining</div>
    </header>

    <!-- STATE 1: SETUP SCREEN -->
    <div id="hhb-screen-setup" class="hhb-screen">
      <div class="hhb-intro-block">
        <div class="hhb-accent-line"></div>
        <h2 class="hhb-section-title">The 80% Full Rule</h2>
        <p class="hhb-intro-text">
          The stomach takes about 20 minutes to signal the brain that it is full. We pace your meal with an intentional halfway pause to let your senses catch up.
        </p>
      </div>

      <div class="hhb-presets-stack">
        <div class="hhb-preset-card active" data-duration="20" data-halfway="10">
          <div class="hhb-preset-num">01</div>
          <div class="hhb-preset-info">
            <div class="hhb-preset-name">20 Minutes <span class="hhb-tag">Classic</span></div>
            <div class="hhb-preset-desc">Standard Okinawan biological window</div>
          </div>
          <div class="hhb-preset-cue">Pause: 10m</div>
        </div>

        <div class="hhb-preset-card" data-duration="15" data-halfway="7.5">
          <div class="hhb-preset-num">02</div>
          <div class="hhb-preset-info">
            <div class="hhb-preset-name">15 Minutes</div>
            <div class="hhb-preset-desc">Brisk midday mindful meal</div>
          </div>
          <div class="hhb-preset-cue">Pause: 7.5m</div>
        </div>

        <div class="hhb-preset-card" data-duration="25" data-halfway="12.5">
          <div class="hhb-preset-num">03</div>
          <div class="hhb-preset-info">
            <div class="hhb-preset-name">25 Minutes</div>
            <div class="hhb-preset-desc">Slow dining & gathering</div>
          </div>
          <div class="hhb-preset-cue">Pause: 12.5m</div>
        </div>
      </div>

      <button id="hhb-btn-start" class="hhb-primary-btn">
        <span>Begin Mindful Meal</span>
        &rarr;
      </button>
    </div>

    <!-- STATE 2: ACTIVE TIMER SCREEN -->
    <div id="hhb-screen-timer" class="hhb-screen" style="display: none;">
      <div class="hhb-stage-tag">
        <span class="hhb-accent-dot"></span>
        <span id="hhb-phase-text">Phase 01: Slow Dining</span>
      </div>

      <!-- Large Editorial Digits -->
      <div class="hhb-timer-display-block">
        <div id="hhb-timer-display" class="hhb-digits">20:00</div>
        <div class="hhb-progress-bar-bg">
          <div id="hhb-progress-bar-fill" class="hhb-progress-bar-fill"></div>
        </div>
      </div>

      <!-- Editorial Mindful Prompt Card -->
      <div class="hhb-prompt-card">
        <div class="hhb-prompt-num">01</div>
        <div class="hhb-prompt-content">
          <div class="hhb-prompt-heading">Put down your utensils</div>
          <div id="hhb-prompt-text" class="hhb-prompt-desc">
            Rest your hands comfortably and look away from your plate between mouthfuls.
          </div>
        </div>
      </div>

      <!-- Controls Row -->
      <div class="hhb-controls-row">
        <button id="hhb-btn-pause" class="hhb-primary-btn hhb-sm-btn">
          <span id="hhb-pause-label">Pause</span>
        </button>
        <button id="hhb-btn-checkin-early" class="hhb-secondary-btn hhb-sm-btn">
          <span>Check In</span>
        </button>
        <button id="hhb-btn-reset" class="hhb-text-btn">
          <span>Reset</span>
        </button>
      </div>
    </div>

    <!-- STATE 3: HALFWAY CHECK-IN SCREEN -->
    <div id="hhb-screen-halfway" class="hhb-screen" style="display: none;">
      <div class="hhb-intro-block">
        <div class="hhb-accent-line"></div>
        <span class="hhb-eyebrow-accent">Halfway Pause Active</span>
        <h2 class="hhb-section-title">The 80% Full Rule</h2>
        <p class="hhb-intro-text">
          The stomach takes about 20 minutes to signal the brain that it's full. We pause here to let your senses catch up with your meal.
        </p>
      </div>

      <div class="hhb-prompts-stack">
        <div class="hhb-prompt-item">
          <span class="hhb-item-num">01</span>
          <div>
            <strong>Put down your utensils</strong>
            <p>Rest your hands and take a moment to look away from your plate.</p>
          </div>
        </div>

        <div class="hhb-prompt-item hhb-highlight-item">
          <span class="hhb-item-num">02</span>
          <div>
            <strong>Check your satiety level</strong>
            <p>Are you satisfied, or just eating out of habit? Honor your body's silence.</p>
          </div>
        </div>

        <div class="hhb-prompt-item">
          <span class="hhb-item-num">03</span>
          <div>
            <strong>Take a deep breath</strong>
            <p>Clearing your palate allows you to appreciate the remaining flavors more fully.</p>
          </div>
        </div>
      </div>

      <div class="hhb-halfway-actions">
        <button id="hhb-btn-resume" class="hhb-primary-btn">
          <span>Resume Second Half</span>
        </button>
        <button id="hhb-btn-finish-early" class="hhb-secondary-btn">
          <span>I'm Satisfied Now (Finish)</span>
        </button>
      </div>
    </div>

    <!-- STATE 4: COMPLETION SCREEN -->
    <div id="hhb-screen-complete" class="hhb-screen" style="display: none;">
      <div class="hhb-intro-block">
        <div class="hhb-accent-line"></div>
        <h2 class="hhb-section-title">Meal Complete</h2>
        <p class="hhb-intro-text">
          You paced your dining, honored the biological 20-minute satiety curve, and listened to your body's natural limits.
        </p>
      </div>

      <div class="hhb-stats-row">
        <div class="hhb-stat-box">
          <span class="hhb-stat-label">Mindful Time</span>
          <span class="hhb-stat-number" id="hhb-stat-time">20 min</span>
        </div>
        <div class="hhb-stat-box hhb-stat-highlight">
          <span class="hhb-stat-label">Fullness Score</span>
          <span class="hhb-stat-number" id="hhb-stat-rating">8 / 10</span>
        </div>
      </div>

      <button id="hhb-btn-restart" class="hhb-primary-btn">
        <span>Pace Next Meal</span>
      </button>
    </div>

    <!-- Editorial Footer -->
    <footer class="hhb-footer">
      <div>Designed for ChungBooks.fr &bull; 腹八分目</div>
    </footer>

  </div>
</div>

<style>
/* Editorial Aesthetic Styles */
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400;1,6..72,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.hhb-editorial-root {
  font-family: 'Newsreader', Georgia, serif;
  background-color: #FDFBF7;
  color: #333333;
  padding: 32px 16px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}

.hhb-editorial-root *, .hhb-editorial-root *::before, .hhb-editorial-root *::after {
  box-sizing: border-box;
}

.hhb-editorial-card {
  width: 100%;
  max-width: 520px;
  background: #FFFFFF;
  border: 1px solid rgba(51, 51, 51, 0.08);
  border-radius: 24px;
  padding: 36px 30px;
  box-shadow: 0 4px 30px rgba(51, 51, 51, 0.04);
}

.hhb-header {
  border-bottom: 1px solid rgba(51, 51, 51, 0.08);
  padding-bottom: 20px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hhb-eyebrow {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #777777;
  margin-bottom: 6px;
}

.hhb-title {
  font-size: 32px;
  font-style: italic;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #333333;
  letter-spacing: -0.02em;
}

.hhb-phase-pill {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #8A9A5B;
}

.hhb-intro-block {
  margin-bottom: 24px;
}

.hhb-accent-line {
  width: 36px;
  height: 1px;
  background-color: #8A9A5B;
  margin-bottom: 12px;
}

.hhb-eyebrow-accent {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #8A9A5B;
  display: block;
  margin-bottom: 6px;
}

.hhb-section-title {
  font-size: 28px;
  font-style: italic;
  margin: 0 0 8px 0;
  color: #333333;
}

.hhb-intro-text {
  font-size: 15px;
  line-height: 1.6;
  color: #555555;
  margin: 0;
}

.hhb-presets-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
}

.hhb-preset-card {
  background: #FFFFFF;
  border: 1px solid rgba(51, 51, 51, 0.1);
  border-radius: 16px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.hhb-preset-card:hover {
  border-color: #8A9A5B;
  transform: translateY(-1px);
}

.hhb-preset-card.active {
  background: #8A9A5B;
  color: #FFFFFF;
  border-color: transparent;
}

.hhb-preset-num {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #8A9A5B;
}

.hhb-preset-card.active .hhb-preset-num {
  color: rgba(255, 255, 255, 0.8);
}

.hhb-preset-info {
  flex: 1;
}

.hhb-preset-name {
  font-size: 18px;
  font-weight: 600;
}

.hhb-tag {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: rgba(255, 255, 255, 0.25);
  padding: 2px 6px;
  border-radius: 99px;
  margin-left: 6px;
}

.hhb-preset-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  color: #777777;
  margin-top: 2px;
}

.hhb-preset-card.active .hhb-preset-desc {
  color: rgba(255, 255, 255, 0.9);
}

.hhb-preset-cue {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #8A9A5B;
}

.hhb-preset-card.active .hhb-preset-cue {
  color: #FFFFFF;
}

.hhb-primary-btn {
  width: 100%;
  background: #333333;
  color: #FFFFFF;
  border: none;
  border-radius: 9999px;
  padding: 16px 24px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.hhb-primary-btn:hover {
  background: #444444;
}

.hhb-secondary-btn {
  width: 100%;
  background: #FFFFFF;
  color: #333333;
  border: 1px solid rgba(51, 51, 51, 0.2);
  border-radius: 9999px;
  padding: 14px 20px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.hhb-secondary-btn:hover {
  border-color: #8A9A5B;
  color: #8A9A5B;
}

.hhb-digits {
  font-size: 72px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.9;
  margin: 12px 0 16px 0;
  color: #333333;
}

.hhb-progress-bar-bg {
  width: 100%;
  height: 3px;
  background: #EAE5DC;
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 24px;
}

.hhb-progress-bar-fill {
  height: 100%;
  background: #8A9A5B;
  width: 0%;
  transition: width 0.5s ease;
}

.hhb-prompt-card {
  background: #F9F6F1;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.hhb-prompt-num {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #8A9A5B;
}

.hhb-prompt-heading {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.hhb-prompt-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  color: #666666;
  line-height: 1.5;
}

.hhb-controls-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.hhb-sm-btn {
  flex: 1;
  padding: 12px 16px;
}

.hhb-text-btn {
  background: none;
  border: none;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #777777;
  cursor: pointer;
  padding: 10px 14px;
}

.hhb-text-btn:hover {
  color: #333333;
}

.hhb-prompts-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.hhb-prompt-item {
  background: #FFFFFF;
  border: 1px solid rgba(51, 51, 51, 0.08);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  gap: 14px;
}

.hhb-prompt-item.hhb-highlight-item {
  background: #8A9A5B;
  color: #FFFFFF;
  border-color: transparent;
}

.hhb-prompt-item.hhb-highlight-item p {
  color: rgba(255, 255, 255, 0.9);
}

.hhb-item-num {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #8A9A5B;
}

.hhb-prompt-item.hhb-highlight-item .hhb-item-num {
  color: rgba(255, 255, 255, 0.8);
}

.hhb-prompt-item strong {
  display: block;
  font-size: 16px;
  margin-bottom: 2px;
}

.hhb-prompt-item p {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  color: #777777;
  margin: 0;
  line-height: 1.4;
}

.hhb-halfway-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hhb-stats-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.hhb-stat-box {
  background: #F9F6F1;
  border-radius: 14px;
  padding: 16px;
}

.hhb-stat-highlight {
  background: #8A9A5B;
  color: #FFFFFF;
}

.hhb-stat-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #777777;
  display: block;
  margin-bottom: 4px;
}

.hhb-stat-highlight .hhb-stat-label {
  color: rgba(255, 255, 255, 0.8);
}

.hhb-stat-number {
  font-size: 24px;
  font-weight: 700;
}

.hhb-footer {
  margin-top: 28px;
  padding-top: 16px;
  border-top: 1px solid rgba(51, 51, 51, 0.08);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #888888;
  text-align: center;
}
</style>

<script>
(function() {
  var totalSeconds = 20 * 60;
  var halfwaySeconds = 10 * 60;
  var remainingSeconds = 20 * 60;
  var timerInterval = null;
  var isPaused = false;
  var hasHitHalfway = false;

  var screenSetup = document.getElementById('hhb-screen-setup');
  var screenTimer = document.getElementById('hhb-screen-timer');
  var screenHalfway = document.getElementById('hhb-screen-halfway');
  var screenComplete = document.getElementById('hhb-screen-complete');

  var timerDisplay = document.getElementById('hhb-timer-display');
  var progressBar = document.getElementById('hhb-progress-bar-fill');
  var navPhase = document.getElementById('hhb-nav-phase');
  var pauseLabel = document.getElementById('hhb-pause-label');

  function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingSeconds);
    var percent = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
    progressBar.style.width = percent + '%';
  }

  function showScreen(screen) {
    screenSetup.style.display = 'none';
    screenTimer.style.display = 'none';
    screenHalfway.style.display = 'none';
    screenComplete.style.display = 'none';
    screen.style.display = 'block';
  }

  var presetCards = document.querySelectorAll('.hhb-preset-card');
  presetCards.forEach(function(card) {
    card.addEventListener('click', function() {
      presetCards.forEach(function(c) { c.classList.remove('active'); });
      card.classList.add('active');
      var mins = parseFloat(card.getAttribute('data-duration'));
      var half = parseFloat(card.getAttribute('data-halfway'));
      totalSeconds = mins * 60;
      halfwaySeconds = half * 60;
      remainingSeconds = totalSeconds;
    });
  });

  document.getElementById('hhb-btn-start').addEventListener('click', function() {
    remainingSeconds = totalSeconds;
    hasHitHalfway = false;
    isPaused = false;
    pauseLabel.textContent = 'Pause';
    navPhase.textContent = 'Phase 01: Slow Dining';
    updateDisplay();
    showScreen(screenTimer);
    startTimer();
  });

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
      if (isPaused) return;
      remainingSeconds--;
      updateDisplay();

      if (!hasHitHalfway && remainingSeconds <= (totalSeconds - halfwaySeconds)) {
        hasHitHalfway = true;
        clearInterval(timerInterval);
        navPhase.textContent = 'Phase 02: Halfway Check-In';
        showScreen(screenHalfway);
        return;
      }

      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        finishMeal();
      }
    }, 1000);
  }

  document.getElementById('hhb-btn-pause').addEventListener('click', function() {
    isPaused = !isPaused;
    pauseLabel.textContent = isPaused ? 'Resume' : 'Pause';
  });

  document.getElementById('hhb-btn-checkin-early').addEventListener('click', function() {
    clearInterval(timerInterval);
    navPhase.textContent = 'Phase 02: Halfway Check-In';
    showScreen(screenHalfway);
  });

  document.getElementById('hhb-btn-reset').addEventListener('click', function() {
    clearInterval(timerInterval);
    navPhase.textContent = 'Setup';
    showScreen(screenSetup);
  });

  document.getElementById('hhb-btn-resume').addEventListener('click', function() {
    navPhase.textContent = 'Phase 03: Intentional Eating';
    showScreen(screenTimer);
    startTimer();
  });

  document.getElementById('hhb-btn-finish-early').addEventListener('click', function() {
    finishMeal();
  });

  function finishMeal() {
    clearInterval(timerInterval);
    var spentSec = totalSeconds - remainingSeconds;
    var spentMin = Math.max(1, Math.round(spentSec / 60));
    document.getElementById('hhb-stat-time').textContent = spentMin + ' min';
    navPhase.textContent = 'Session Complete';
    showScreen(screenComplete);
  }

  document.getElementById('hhb-btn-restart').addEventListener('click', function() {
    navPhase.textContent = 'Setup';
    showScreen(screenSetup);
  });

})();
</script>
`;
};
