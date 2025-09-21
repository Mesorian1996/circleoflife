/* ========================= js/main.js ========================= */
(function(){
    /* Jahr im Footer */
    const yearEl = document.getElementById('y');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    /* Client-side Form Validity */
    const form = document.getElementById('trial-form');
    if(form){
      form.addEventListener('submit', (e) => {
        if(!form.checkValidity()){
          e.preventDefault();
          e.stopPropagation();
        }
        form.classList.add('was-validated');
      });
    }
  
    /* PDF Export (Kursplan) */
    const dl = document.getElementById('download-pdf');
    if (dl){
      dl.addEventListener('click', (e) => {
        e.preventDefault();
        const tableWrap = document.querySelector('#zeiten .table-responsive');
        const opt = {
          margin: 10,
          filename: 'kursplan-circle-of-life.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        };
        if (tableWrap && window.html2pdf) html2pdf().from(tableWrap).set(opt).save();
      });
    }
  
    /* ============================================================
       Gemeinsame Slides für Hero + Story/Galerie (synchron)
       ============================================================ */
    const SLIDES = [
      { src:'/assets/images/Marvin_JJL.jpeg', pos:'78% 70%',
        cap:'Fundamentals: Position vor Submission – die Basis für alles.' },
      { src:'/assets/images/JJPro_League.jpeg', pos:'60% 70%',
        cap:'No-Gi Grappling: Kontrolle, Scrambles und moderne Entries.' },
      // weitere Bilder hier hinzufügen:
      // { src:'/assets/images/gallery/slide3.jpg', pos:'70% 70%', cap:'Open Mat: Fragen klären, Rollen, Technik verfestigen.' },
      // { src:'/assets/images/gallery/slide4.jpg', pos:'70% 70%', cap:'Competition Class: Strategie, Score-Awareness und Drill-Sets.' },
    ];
  
    /* ===== Hero vorbereiten ===== */
    const heroWrap = document.querySelector('.hero-bg');
    const firstSlide = document.querySelector('.hero-slide');
    if (heroWrap){
      if (firstSlide){
        firstSlide.style.objectPosition = SLIDES[0].pos;
        firstSlide.src = SLIDES[0].src;
      }
      for (let i=1; i<SLIDES.length; i++){
        const im = document.createElement('img');
        im.className = 'hero-slide';
        im.src = SLIDES[i].src;
        im.alt = '';
        im.style.objectPosition = SLIDES[i].pos;
        heroWrap.appendChild(im);
      }
    }
    const heroSlideEls = Array.from(document.querySelectorAll('.hero-slide'));

    // Neues Bild-Element im Split-Hero (rechte Spalte)
    const heroVisualImg = document.getElementById('hero-visual-img');
    const coinImg = document.querySelector('.logo-coin img');

    function fadeSwap(imgEl, nextSrc, nextPos){
      if(!imgEl) return;
      imgEl.classList.add('is-fading');         // fade out
      setTimeout(()=>{
        // Quelle wechseln
        const onLoaded = () => {
          imgEl.removeEventListener('load', onLoaded);
          if(nextPos) imgEl.style.objectPosition = nextPos;
          imgEl.classList.remove('is-fading');  // fade in
          imgEl.classList.add('zoom');          // kleiner Zoom-Punch
          setTimeout(()=> imgEl.classList.remove('zoom'), 900);
        };
        imgEl.addEventListener('load', onLoaded, { once: true });
        imgEl.src = nextSrc;
      }, 120); // kleines Delay für sauberen Übergang
    }
    

    /* ===== Story/Galerie vorbereiten ===== */
    const imgEl   = document.getElementById('story-slide');
    const capEl   = document.getElementById('story-caption');
    const prevBtn = document.querySelector('.story-nav.prev');
    const nextBtn = document.querySelector('.story-nav.next');
    const dotsWrap= document.getElementById('story-dots');
  
    /* ===== Gemeinsamer Index + Renderfunktionen ===== */
    let idx = 0;
  
    function fadeSwap(imgEl, nextSrc, nextPos){
      if(!imgEl) return;
      imgEl.style.opacity = '0';
      setTimeout(()=>{
        const onLoaded = () => {
          imgEl.removeEventListener('load', onLoaded);
          if(nextPos) imgEl.style.objectPosition = nextPos;
          imgEl.style.opacity = '1';
          imgEl.style.transform = 'scale(1.035)';
          setTimeout(()=> imgEl.style.transform = 'scale(1)', 900);
        };
        imgEl.addEventListener('load', onLoaded, { once: true });
        imgEl.src = nextSrc;
      }, 120);
    }
    
    function renderHero(i){
      // optional: alte BG-Slides ansteuern
      if (heroSlideEls.length){
        heroSlideEls.forEach(el => el.classList.remove('active'));
        const el = heroSlideEls[i];
        if (el) el.classList.add('active');
      }
      // Visual rechts (Offset-Hero) weich wechseln
      if (heroVisualImg && SLIDES[i]){
        fadeSwap(heroVisualImg, SLIDES[i].src, SLIDES[i].pos || '60% 70%');
      }
      // Coin-Pulse synchron zum Slide-Wechsel
      if (coinImg){
        coinImg.classList.remove('pulse'); // reset
        // Reflow, damit die Animation neu triggert
        void coinImg.offsetWidth;
        coinImg.classList.add('pulse');
        // Klasse wieder entfernen, falls du es sauber halten möchtest:
        setTimeout(()=> coinImg.classList.remove('pulse'), 700);
      }
    }
    
    

  
    function renderStory(i){
      if (!imgEl || !capEl) return;
      const s = SLIDES[i];
      imgEl.src = s.src;
      imgEl.alt = s.cap || '';
      capEl.textContent = s.cap || '';
  
      if (dotsWrap){
        dotsWrap.innerHTML = '';
        SLIDES.forEach((_,k)=>{
          const b = document.createElement('button');
          b.className = 'dot'+(k===i?' active':'');
          b.setAttribute('aria-label','Bild '+(k+1));
          b.addEventListener('click',()=>{ idx=k; syncRender(); });
          dotsWrap.appendChild(b);
        });
      }
    }
  
    function syncRender(){
      renderHero(idx);
      renderStory(idx);
    }
  
    /* ===== Autoplay (ein Timer für beide) ===== */
    let timer;
    function start(){
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      stop();
      timer = setInterval(()=>{
        idx = (idx + 1) % SLIDES.length;
        syncRender();
      }, 8000);
    }
    function stop(){ if (timer) clearInterval(timer); }
  
    /* Init */
    syncRender();
    start();
  
    /* Interaktion */
    const hero = document.getElementById('hero');
    if (hero){
      hero.addEventListener('mouseenter', stop);
      hero.addEventListener('mouseleave', start);
    }
    nextBtn && nextBtn.addEventListener('click', ()=>{ idx=(idx+1)%SLIDES.length; syncRender(); });
    prevBtn && prevBtn.addEventListener('click', ()=>{ idx=(idx-1+SLIDES.length)%SLIDES.length; syncRender(); });
    imgEl   && imgEl.addEventListener('click', ()=>{ idx=(idx+1)%SLIDES.length; syncRender(); });
  
    /* (Optional) Legacy Lightbox für .gallery-img */
    const lightboxImg = document.getElementById('lightbox-img');
    document.querySelectorAll('.gallery-img').forEach(img => {
      img.addEventListener('click', () => { if(lightboxImg) lightboxImg.src = img.src; });
    });
  })();

  // Markiere automatisch den heutigen Tag im Kursplan (Spalte)
(function(){
  const weekday = (new Date()).getDay(); // 0 = Sonntag, 1 = Montag, ...
  // Mapping: So = 7. Spalte, Mo = 1. Spalte
  let col = weekday === 0 ? 7 : weekday;
  // ths
  const table = document.querySelector('.timetable-modern .schedule-table');
  if(!table) return;
  const ths = table.querySelectorAll('thead th');
  if(ths[col]) ths[col].classList.add('active');
  // Jede Zelle der passenden Spalte hervorheben
  const trs = table.querySelectorAll('tbody tr');
  trs.forEach(tr => {
    const tds = tr.querySelectorAll('td');
    if(tds[col]) tds[col].classList.add('active');
  });
  // PDF-Button Puls nach 3s entfernen
  const pdfBtn = document.querySelector('.timetable-pdf-btn');
  if(pdfBtn) setTimeout(()=>pdfBtn.style.animation='none', 2800);
})();


  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // Anzeigen, wenn 200px gescrolled
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollTopBtn.style.display = "flex";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  // Scroll nach oben bei Klick
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


/* === EMAIL VERSAND === */
document.addEventListener('DOMContentLoaded', function () {
  const API_BASE = "https://circleoflife-emailversandt.onrender.com";
  const form = document.getElementById('trial-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

     // Bootstrap-Styling aktivieren
  form.classList.add('was-validated');

    // Browser-Validation respektieren
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Felder EINZELN schicken – passt zur server.js-Route
    const payload = {
      anrede:   form.anrede?.value?.trim()   || "",
      vorname:  form.vorname?.value?.trim()  || "",
      nachname: form.nachname?.value?.trim() || "",
      email:    form.email?.value?.trim()    || "",
      phone:    form.phone?.value?.trim()    || "",
      kurs:     form.kurs?.value?.trim()     || "",
      message:  form.message?.value?.trim()  || ""
    };

    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Wird gesendet...'; }

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json().catch(() => ({}));

      if (res.ok) {
        form.reset();
          // Bootstrap-Validierung zurücksetzen
          form.classList.remove('was-validated');
          form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
          });
        
          alert(result.message || 'Danke! Wir melden uns schnellstmöglich bei dir.');

      } else {
        alert(result.message || 'Fehler beim Senden.');
      }
    } catch (err) {
      alert('Es gab einen Netzwerkfehler beim Senden.');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Probestunde anfragen'; }
    }
  });
});


