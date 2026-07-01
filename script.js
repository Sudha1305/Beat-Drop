(() => {
  'use strict';
  const SONGS = [
    { id: 1, title: "Harley Bird - Home", artist: "Jordan Schor", duration: "3.36", cover: "images/music-1.jpg", src: "songs/music-1.mp3" },
    { id: 2, title: "Ikson Anywhere - Ikson", artist: "Audio Library", duration: "3.05", cover: "images/music-2.jpg", src: "songs/music-2.mp3" },
    { id: 3, title: "Beauz & Jvna - Crazy", artist: "Beauz & Jvna", duration: "3.08", cover: "images/music-3.jpg", src: "songs/music-3.mp3" },
    { id: 4, title: "Hardwind - Want Me", artist: "Mike Archangelo", duration: "3.48", cover: "images/music-4.jpg", src: "songs/music-4.mp3" },
    { id: 5, title: "Jim - Sun Goes Down", artist: "Jim Yosef X Roy", duration: "2.48", cover: "images/music-5.jpg", src: "songs/music-5.mp3" },
    { id: 6, title: "Lost Sky - Vision NCS", artist: "NCS Release", duration: "3.54", cover: "images/music-6.jpg", src: "songs/music-6.mp3" },
    { id: 7, title: "Samjhawan", artist: "Arjit Singh", duration: "4.25", cover: "images/music-7.jpg", src: "songs/music-7.mp3" },
    { id: 8, title: "Leharaayi", artist: "Sid Sriram", duration: "4.09", cover: "images/music-8.jpg", src: "songs/music-8.mp3" },
    { id: 9, title: "Gulabi Kallu Rendu Mullu", artist: "Javeed Ali", duration: "4.24", cover: "images/music-9.jpg", src: "songs/music-9.mp3" },
    { id: 10, title: "Baguntundi", artist: "Sid Sriram", duration: "3.47", cover: "images/music-10.jpg", src: "songs/music-10.mp3" },
    { id: 11, title: "Rooba Rooba", artist: "Chinmayi", duration: "5.14", cover: "images/music-11.jpg", src: "songs/music-11.mp3" },
    { id: 12, title: "Kallumoosi", artist: "Suchith Suresan", duration: "3.37", cover: "images/music-12.jpg", src: "songs/music-12.mp3" },
    { id: 13, title: "Nuvvunte Chaley", artist: "Anirudh Ravichander", duration: "4.00", cover: "images/music-13.jpg", src: "songs/music-13.mp3" },
    { id: 14, title: "Pareshanura", artist: "Padmalatha", duration: "3.13", cover: "images/music-14.jpg", src: "songs/music-14.mp3" },
    { id: 15, title: "Pattuma", artist: "Anirudh Ravichander", duration: "3.29", cover: "images/music-15.jpg", src: "songs/music-15.mp3" },
    { id: 16, title: "Samayamaa", artist: "Anurag Kulkarni", duration: "3.24", cover: "images/music-16.jpg", src: "songs/music-16.mp3" },
    { id: 17, title: "Vinnane Vinnane", artist: "Arman Malik", duration: "4.05", cover: "images/music-17.jpg", src: "songs/music-17.mp3" },
    { id: 18, title: "Samayamaa", artist: "Harini", duration: "3.30", cover: "images/music-18.jpg", src: "songs/music-18.mp3" },
    { id: 19, title: "Nijame ne Chebuthuna", artist: "Sid Sriram", duration: "4.00", cover: "images/music-19.jpg", src: "songs/music-19.mp3" },
    { id: 20, title: "Putteney prema", artist: "Ram Miriyala", duration: "3.45", cover: "images/music-20.jpg", src: "songs/music-20.mp3" },
    { id: 21, title: "Love me Again", artist: "Kim Tae-hyung", duration: "3.17", cover: "images/music-21.jpg", src: "songs/music-21.mp3" }
  ];

  // Safe localStorage helpers
  const safeGetItem = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const safeSetItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  };

  const state = {
    currentId: SONGS[0].id,
    isPlaying: false,
    isShuffle: false,
    repeatMode: 'off',
    favorites: new Set(safeGetItem('wax-favorites', [])),
    recentlyPlayed: safeGetItem('recentlyPlayed', []),
    activeTab: 'all',
    query: '',
    shuffleHistory: []
  };

  // DOM Refs
  const $ = (sel) => document.querySelector(sel);
  const audio = $('#audio');
  const vinyl = $('#vinyl');
  const tonearm = $('#tonearm');
  const albumArt = $('#albumArt');
  const songTitle = $('#songTitle');
  const songArtist = $('#songArtist');
  const currentTimeEl = $('#currentTime');
  const durationTimeEl = $('#durationTime');
  const seekBar = $('#seekBar');
  const volumeBar = $('#volumeBar');
  const playBtn = $('#playBtn');
  const prevBtn = $('#prevBtn');
  const nextBtn = $('#nextBtn');
  const shuffleBtn = $('#shuffleBtn');
  const repeatBtn = $('#repeatBtn');
  const repeatOneDot = $('#repeatOneDot');
  const favBtn = $('#favBtn');
  const trackListEl = $('#trackList');
  const searchInput = $('#searchInput');
  const tabs = document.querySelectorAll('.tab');
  const themeToggle = $('#themeToggle');
  const toastEl = $('#toast');
  const canvas = $('#visualizer');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const speedBtn = $('#speedBtn');
  const speedValue = $('#speedValue');

  const iconPlay = playBtn ? playBtn.querySelector('.icon-play') : null;
  const iconPause = playBtn ? playBtn.querySelector('.icon-pause') : null;

  // New feature refs
  const eqBtn = $('#eqBtn');
  const eqModal = $('#eqModal');
  const closeEqBtn = $('#closeEqBtn');
  const eqSliders = document.querySelectorAll('.eq-slider');
  const presetBtns = document.querySelectorAll('.preset-btn');

  // Recently played
  const clearRecentBtn = $('#clearRecentBtn');

  const sleepBtn = $('#sleepBtn');
  const sleepModal = $('#sleepModal');
  const closeSleepBtn = $('#closeSleepBtn');
  const sleepOptions = document.querySelectorAll('.sleep-option');
  const sleepCountdown = $('#sleepCountdown');
  const countdownValue = $('#countdownValue');

  const miniBtn = $('#miniBtn');
  const miniPlayer = $('#miniPlayer');
  const miniThumb = $('#miniThumb');
  const miniTitle = $('#miniTitle');
  const miniArtist = $('#miniArtist');
  const miniPlayBtn = $('#miniPlayBtn');
  const miniCloseBtn = $('#miniCloseBtn');
  const miniIconPlay = miniPlayBtn ? miniPlayBtn.querySelector('.mini-icon-play') : null;
  const miniIconPause = miniPlayBtn ? miniPlayBtn.querySelector('.mini-icon-pause') : null;

  // Visualizer
  let audioContext, analyser, source, dataArray, animationId;

  // Equalizer
  let eqFilters = [];
  const EQ_PRESETS = {
    flat: [0, 0, 0, 0, 0],
    pop: [2, 4, -2, -1, 2],
    rock: [5, 3, -1, 2, 4],
    jazz: [3, 1, -2, 1, 3],
    classical: [-2, -1, 1, 2, 3],
    bass: [5, 4, -1, 0, 0],
    vocal: [-2, -1, 2, 4, 3],
    party: [4, 2, 0, 2, 4]
  };

  // Sleep timer
  let sleepTimer = null;
  let remainingTime = 0;

  const initVisualizer = () => {
    if (!audioContext && audio) {
      try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaElementSource(audio);

        // Create EQ filters
        const frequencies = [60, 230, 910, 4000, 14000];
        eqFilters = frequencies.map(freq => {
          const filter = audioContext.createBiquadFilter();
          filter.type = 'peaking';
          filter.frequency.value = freq;
          filter.Q.value = 1;
          filter.gain.value = 0;
          return filter;
        });

        // Connect chain: source -> filters -> analyser -> destination
        source.connect(eqFilters[0]);
        for (let i = 0; i < eqFilters.length - 1; i++) {
          eqFilters[i].connect(eqFilters[i + 1]);
        }
        eqFilters[eqFilters.length - 1].connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 256;
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        // Apply initial preset
        applyPreset('pop');
      } catch (e) {
        console.warn('Visualizer/EQ not supported:', e);
      }
    }
  };

  const resizeCanvas = () => {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = 120;
    }
  };
  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();

  const drawVisualizer = () => {
    if (!state.isPlaying || !analyser || !ctx || !canvas) {
      cancelAnimationFrame(animationId);
      return;
    }
    animationId = requestAnimationFrame(drawVisualizer);
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = dataArray[i] / 2;
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
      gradient.addColorStop(0, '#f97316');
      gradient.addColorStop(0.5, '#ec4899');
      gradient.addColorStop(1, '#f43f5e');
      ctx.fillStyle = gradient;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  };

  // Helpers
  const getSong = (id) => SONGS.find((s) => s.id === id);
  const currentSong = () => getSong(state.currentId);

  const formatTime = (sec) => {
    if (!isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  let toastTimer;
  const showToast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2000);
  };

  const visibleList = () => {
    const q = state.query.trim().toLowerCase();
    return SONGS.filter((s) => {
      const inTab = state.activeTab === 'all' || state.favorites.has(s.id);
      const matchesQuery = !q || s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q);
      return inTab && matchesQuery;
    });
  };

  const renderRecentSongs = () => {
    const recentList = document.getElementById('recentList');
    if (!recentList) return;
    recentList.innerHTML = '';
    const ids = Array.isArray(state.recentlyPlayed) ? state.recentlyPlayed : [];

    ids.forEach((id) => {
      const song = getSong(id);
      if (!song) return;
      const li = document.createElement('li');
      li.className = 'recent-item';
      li.innerHTML = `
        <img src="${song.cover}" alt="${song.title}" class="recent-thumb" loading="lazy">
        <span>${song.title}</span>
        <small>${song.artist}</small>
      `;
      li.addEventListener('click', () => loadSong(song.id, true), { passive: true });
      recentList.appendChild(li);
    });
  };

  const clearRecentlyPlayed = () => {
    state.recentlyPlayed = [];
    safeSetItem('recentlyPlayed', state.recentlyPlayed);
    renderRecentSongs();
    showToast('Recently played cleared');
  };

  // Rendering
  const renderList = () => {
    if (!trackListEl) return;
    const list = visibleList();
    trackListEl.innerHTML = '';

    if (!list.length) {
      const empty = document.createElement('li');
      empty.className = 'list-empty';
      empty.textContent = state.activeTab === 'favorites' ? 'No favorites yet — tap the heart on a song to save it here.' : 'No songs match your search.';
      trackListEl.appendChild(empty);
      return;
    }

    list.forEach((song) => {
      const li = document.createElement('li');
      li.className = 'track-item' + (song.id === state.currentId ? ' playing' : '');
      li.dataset.id = song.id;
      const isFav = state.favorites.has(song.id);
      li.innerHTML = `
        <img class="track-thumb" src="${song.cover}" alt="${song.title} cover" loading="lazy">
        <div class="track-info-row">
          <h4>${song.title}</h4>
          <p>${song.artist}</p>
        </div>
        ${song.id === state.currentId && state.isPlaying
          ? '<div class="playing-bars"><span></span><span></span><span></span></div>'
          : `<span class="track-duration">${song.duration}</span>`}
        <button class="track-fav ${isFav ? 'active' : ''}" type="button" aria-label="Toggle favorite" title="Favorite">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.9-10.2-9.3C.2 8.6 1.6 5 5.1 5c2 0 3.4 1.1 4.1 2.2C9.9 6.1 11.3 5 13.3 5c3.5 0 4.9 3.6 3.3 6.7C19 16.1 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path></svg>
        </button>
      `;

      li.addEventListener('click', (e) => {
        if (e.target.closest('.track-fav')) return;
        loadSong(song.id, true);
      }, { passive: true });

      const favButton = li.querySelector('.track-fav');
      favButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(song.id, e.currentTarget);
      }, { passive: true });

      trackListEl.appendChild(li);
    });
  };

  const toggleFavorite = (id, btn) => {
    const wasFav = state.favorites.has(id);
    wasFav ? state.favorites.delete(id) : state.favorites.add(id);
    safeSetItem('wax-favorites', [...state.favorites]);

    if (btn) {
      btn.classList.toggle('active', !wasFav);
      btn.classList.add('bump');
      setTimeout(() => btn.classList.remove('bump'), 350);
    }

    if (id === state.currentId) syncFavButton();
    showToast(wasFav ? 'Removed from favorites' : 'Added to favorites');

    if (state.activeTab === 'favorites') renderList();
  };

  const syncFavButton = () => {
    if (favBtn) favBtn.classList.toggle('active', state.favorites.has(state.currentId));
  };

  // Playback
  const loadSong = (id, autoplay = false) => {
    const song = getSong(id);
    if (!song) return;
    state.currentId = id;

    state.recentlyPlayed = [
      id,
      ...(Array.isArray(state.recentlyPlayed) ? state.recentlyPlayed : []).filter((songId) => songId !== id)
    ].slice(0, 5);
    safeSetItem('recentlyPlayed', state.recentlyPlayed);
    renderRecentSongs();

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = song.src;
      try { audio.load(); } catch (e) { console.warn('Audio load failed:', e); }
    }

    if (albumArt) {
      albumArt.src = song.cover;
      albumArt.alt = `${song.title} cover`;
    }
    if (songTitle) songTitle.textContent = song.title;
    if (songArtist) songArtist.textContent = song.artist;

    // Update mini player
    if (miniThumb) miniThumb.src = song.cover;
    if (miniTitle) miniTitle.textContent = song.title;
    if (miniArtist) miniArtist.textContent = song.artist;

    if (seekBar) {
      seekBar.value = 0;
      seekBar.style.setProperty('--p', '0%');
    }
    if (currentTimeEl) currentTimeEl.textContent = '0:00';
    if (durationTimeEl) durationTimeEl.textContent = song.duration;

    syncFavButton();
    renderList();

    if (autoplay) play();
    if (!state.shuffleHistory.includes(id)) state.shuffleHistory.push(id);
  };

  const play = () => {
    if (!audio) return;
    audio.play().then(() => {
      state.isPlaying = true;
      updatePlayUI();
      initVisualizer();
      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
      }
      drawVisualizer();
    }).catch(() => showToast('Tap play again — audio needs a user click to start'));
  };

  const pause = () => {
    if (!audio) return;
    audio.pause();
    state.isPlaying = false;
    updatePlayUI();
    if (animationId) cancelAnimationFrame(animationId);
  };

  const updatePlayUI = () => {
    if (iconPlay) iconPlay.hidden = state.isPlaying;
    if (iconPause) iconPause.hidden = !state.isPlaying;
    if (miniIconPlay) miniIconPlay.hidden = state.isPlaying;
    if (miniIconPause) miniIconPause.hidden = !state.isPlaying;
    if (playBtn) playBtn.setAttribute('aria-label', state.isPlaying ? 'Pause' : 'Play');
    if (vinyl) vinyl.classList.toggle('spinning', state.isPlaying);
    if (tonearm) tonearm.classList.toggle('playing', state.isPlaying);
    renderList();
    renderRecentSongs();
  };

  if (playBtn) playBtn.addEventListener('click', () => (state.isPlaying ? pause() : play()), { passive: true });
  if (miniPlayBtn) miniPlayBtn.addEventListener('click', () => (state.isPlaying ? pause() : play()), { passive: true });

  const getQueue = () => visibleList().length ? visibleList() : SONGS;

  const nextSong = () => {
    const queue = getQueue();
    if (!queue.length) return;

    if (state.isShuffle) {
      if (queue.length === 1) { loadSong(queue[0].id, true); return; }
      let pick;
      do { pick = queue[Math.floor(Math.random() * queue.length)]; } while (pick.id === state.currentId);
      loadSong(pick.id, true);
      return;
    }

    const idx = queue.findIndex((s) => s.id === state.currentId);
    const nextIdx = (idx + 1) % queue.length;
    if (idx === queue.length - 1 && state.repeatMode === 'off') {
      pause();
      return;
    }
    loadSong(queue[nextIdx].id, true);
  };

  const prevSong = () => {
    if (audio && audio.currentTime > 3) { audio.currentTime = 0; return; }
    const queue = getQueue();
    if (!queue.length) return;
    const idx = queue.findIndex((s) => s.id === state.currentId);
    const prevIdx = (idx - 1 + queue.length) % queue.length;
    loadSong(queue[prevIdx].id, true);
  };

  if (nextBtn) nextBtn.addEventListener('click', nextSong, { passive: true });
  if (prevBtn) prevBtn.addEventListener('click', prevSong, { passive: true });

  if (audio) {
    audio.addEventListener('ended', () => {
      if (state.repeatMode === 'one') {
        audio.currentTime = 0;
        play();
      } else {
        nextSong();
      }
    }, { passive: true });

    audio.addEventListener('loadedmetadata', () => {
      if (durationTimeEl) durationTimeEl.textContent = formatTime(audio.duration);
      const song = currentSong();
      if (song && isFinite(audio.duration)) song.duration = formatTime(audio.duration);
      renderList();
    }, { passive: true });

    audio.addEventListener('timeupdate', () => {
      if (!audio.duration) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      if (seekBar) {
        seekBar.value = pct;
        seekBar.style.setProperty('--p', `${pct}%`);
      }
      if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    }, { passive: true });

    audio.addEventListener('waiting', () => { if (playBtn) playBtn.style.opacity = '.6' }, { passive: true });
    audio.addEventListener('canplay', () => { if (playBtn) playBtn.style.opacity = '1' }, { passive: true });
    audio.addEventListener('error', () => {
      const song = currentSong();
      if (song) showToast(`⚠️ Could not load "${song.title}" — check the audio file`);
      state.isPlaying = false;
      updatePlayUI();
    }, { passive: true });
  }

  if (seekBar) {
    seekBar.addEventListener('input', () => {
      if (!audio || !audio.duration) return;
      audio.currentTime = (seekBar.value / 100) * audio.duration;
      seekBar.style.setProperty('--p', `${seekBar.value}%`);
    });
  }

  // Volume
  const setVolume = (v) => {
    if (!audio || !volumeBar) return;
    audio.volume = Math.min(Math.max(v, 0), 100) / 100;
    volumeBar.value = v;
    volumeBar.style.setProperty('--p', `${v}%`);
    safeSetItem('wax-volume', String(v));
  };
  if (volumeBar) volumeBar.addEventListener('input', () => setVolume(Number(volumeBar.value)));

  let mutedVolume = 80;
  const volIcon = $('.vol-icon');
  if (volIcon) {
    volIcon.addEventListener('click', () => {
      if (audio && audio.volume > 0) {
        mutedVolume = Number(volumeBar?.value || 80);
        setVolume(0);
        showToast('Muted');
      } else {
        setVolume(mutedVolume || 80);
        showToast('Unmuted');
      }
    }, { passive: true });
  }

  // Speed control
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  let currentSpeedIndex = 2;

  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
      const newSpeed = speeds[currentSpeedIndex];
      if (audio) audio.playbackRate = newSpeed;
      if (speedValue) speedValue.textContent = `${newSpeed}x`;
      showToast(`Playback speed: ${newSpeed}x`);
    }, { passive: true });
  }

  // Shuffle/Repeat
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      state.isShuffle = !state.isShuffle;
      shuffleBtn.classList.toggle('active', state.isShuffle);
      showToast(state.isShuffle ? 'Shuffle on' : 'Shuffle off');
    }, { passive: true });
  }

  if (repeatBtn) {
    repeatBtn.addEventListener('click', () => {
      const order = ['off', 'all', 'one'];
      state.repeatMode = order[(order.indexOf(state.repeatMode) + 1) % order.length];
      repeatBtn.classList.toggle('active', state.repeatMode !== 'off');
      if (repeatOneDot) repeatOneDot.hidden = state.repeatMode !== 'one';
      showToast(`Repeat: ${state.repeatMode === 'off' ? 'off' : state.repeatMode === 'all' ? 'all tracks' : 'one track'}`);
    }, { passive: true });
  }

  // Favorite
  if (favBtn) favBtn.addEventListener('click', () => toggleFavorite(state.currentId, favBtn), { passive: true });

  // Search/Tabs
  let searchDebounce;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        state.query = e.target.value;
        renderList();
      }, 150);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeTab = tab.dataset.tab;
      renderList();
    }, { passive: true });
  });

  // Theme
  const initTheme = () => {
    const saved = localStorage.getItem('wax-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    document.body.dataset.theme = saved || (prefersLight ? 'light' : 'dark');
  };
  initTheme();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
      document.body.dataset.theme = next;
      localStorage.setItem('wax-theme', next);
    }, { passive: true });
  }

  // Recently played clear
  if (clearRecentBtn) {
    clearRecentBtn.addEventListener('click', () => {
      clearRecentlyPlayed();
    }, { passive: true });
  }

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    switch (e.key) {
      case ' ': e.preventDefault(); state.isPlaying ? pause() : play(); break;
      case 'ArrowRight': nextSong(); break;
      case 'ArrowLeft': prevSong(); break;
      case 'ArrowUp': e.preventDefault(); setVolume(Math.min(100, Number(volumeBar?.value || 80) + 5)); break;
      case 'ArrowDown': e.preventDefault(); setVolume(Math.max(0, Number(volumeBar?.value || 80) - 5)); break;
      case 's': case 'S': shuffleBtn?.click(); break;
      case 'r': case 'R': repeatBtn?.click(); break;
      case 'l': case 'L': favBtn?.click(); break;
      case 'm': case 'M': volIcon?.click(); break;
      case 'e': case 'E': eqBtn?.click(); break;
      case 't': case 'T': sleepBtn?.click(); break;
      case 'Escape':
        if (eqModal && !eqModal.hidden) closeEqBtn?.click();
        if (sleepModal && !sleepModal.hidden) closeSleepBtn?.click();
        break;
    }
  });

  // EQ Functions
  const applyPreset = (presetName) => {
    const gains = EQ_PRESETS[presetName];
    presetBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.preset === presetName));
    eqSliders.forEach((slider, i) => {
      slider.value = gains[i];
      if (eqFilters[i]) eqFilters[i].gain.value = gains[i];
    });
  };

  if (eqBtn) eqBtn.addEventListener('click', () => eqModal?.classList.add('show'));
  if (closeEqBtn) closeEqBtn.addEventListener('click', () => eqModal?.classList.remove('show'));
  if (eqModal) eqModal.addEventListener('click', (e) => { if (e.target === eqModal) eqModal.classList.remove('show') });

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
  });

  eqSliders.forEach((slider, i) => {
    slider.addEventListener('input', () => {
      if (eqFilters[i]) eqFilters[i].gain.value = Number(slider.value);
      presetBtns.forEach(btn => btn.classList.remove('active'));
    });
  });

  // Sleep Timer Functions
  const updateCountdownDisplay = () => {
    if (countdownValue) countdownValue.textContent = formatTime(remainingTime);
  };

  const startSleepTimer = (minutes) => {
    if (sleepTimer) {
      clearInterval(sleepTimer);
      sleepTimer = null;
    }

    if (minutes === 0) {
      remainingTime = 0;
      if (sleepCountdown) sleepCountdown.hidden = true;
      showToast('Sleep timer cancelled');
      return;
    }

    remainingTime = minutes * 60;
    if (sleepCountdown) sleepCountdown.hidden = false;
    updateCountdownDisplay();
    showToast(`Sleep timer set for ${minutes} minutes`);
    sleepModal?.classList.remove('show');

    sleepTimer = setInterval(() => {
      remainingTime--;
      updateCountdownDisplay();
      if (remainingTime <= 0) {
        clearInterval(sleepTimer);
        sleepTimer = null;
        pause();
        if (sleepCountdown) sleepCountdown.hidden = true;
        showToast('Sleep timer finished');
      }
    }, 1000);
  };

  if (sleepBtn) sleepBtn.addEventListener('click', () => sleepModal?.classList.add('show'));
  if (closeSleepBtn) closeSleepBtn.addEventListener('click', () => sleepModal?.classList.remove('show'));
  if (sleepModal) sleepModal.addEventListener('click', (e) => { if (e.target === sleepModal) sleepModal.classList.remove('show') });

  sleepOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      const minutes = Number(btn.dataset.min);
      startSleepTimer(minutes);
    });
  });

  // Mini Player
  const toggleMiniPlayer = () => {
    document.body.classList.toggle('mini-mode');
    showToast(document.body.classList.contains('mini-mode') ? 'Mini player mode' : 'Expanded player');
  };

  if (miniBtn) miniBtn.addEventListener('click', toggleMiniPlayer);
  if (miniCloseBtn) miniCloseBtn.addEventListener('click', toggleMiniPlayer);

  // Initialize
  const savedVolume = Number(safeGetItem('wax-volume', '80'));
  setVolume(savedVolume);
  loadSong(state.currentId, false);
  renderList();
  renderRecentSongs();
})();
