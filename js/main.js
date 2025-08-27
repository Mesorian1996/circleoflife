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
  
    /* ===== Story/Galerie vorbereiten ===== */
    const imgEl   = document.getElementById('story-slide');
    const capEl   = document.getElementById('story-caption');
    const prevBtn = document.querySelector('.story-nav.prev');
    const nextBtn = document.querySelector('.story-nav.next');
    const dotsWrap= document.getElementById('story-dots');
  
    /* ===== Gemeinsamer Index + Renderfunktionen ===== */
    let idx = 0;
  
    function renderHero(i){
      if (!heroSlideEls.length) return;
      heroSlideEls.forEach(el => el.classList.remove('active'));
      const el = heroSlideEls[i];
      if (el) el.classList.add('active');
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
      }, 5500);
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
  