/* ==================== INITIALIZATION ==================== */
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initScrollAnimations();
  initStickyHeader();
  initNavigation();
  initScrollToTop();
  initAnalyticsIntegration();

  if (Config && Config.DEBUG_MODE) {
    console.log('✨ Pro Estate Partners - All features initialized');
  }
});

/* ==================== MOBILE MENU TOGGLE ==================== */
function initMobileMenu() {
  const header = document.querySelector('header');
  let menuToggle = document.querySelector('.menu-toggle');

  if (!menuToggle) {
    menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    menuToggle.innerHTML = '☰';

    const logo = document.querySelector('.logo');
    logo.parentNode.insertBefore(menuToggle, logo.nextSibling);
  }

  const nav = document.querySelector('header nav');

  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    nav.classList.toggle('active');
  });

  const navLinks = document.querySelectorAll('header nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
    });
  });

  document.addEventListener('click', function(e) {
    if (!header.contains(e.target)) {
      nav.classList.remove('active');
    }
  });
}

/* ==================== SCROLL ANIMATIONS (Intersection Observer) ==================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections (legal pages opt out so long-form text never gets stuck faded)
  document.querySelectorAll('section:not(.legal)').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
  });

  // Observe list items
  document.querySelectorAll('#zalety li, #processo li').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
  });
}

/* ==================== STICKY HEADER WITH SHADOW ==================== */
function initStickyHeader() {
  const header = document.querySelector('header');
  let lastScrollY = 0;

  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}

/* ==================== SMOOTH SCROLL & NAVIGATION ==================== */
function initNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Update active nav link on scroll
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('header nav a');

  window.addEventListener('scroll', function() {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 300) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + currentSection);
    });
  }, { passive: true });
}

/* ==================== SCROLL TO TOP BUTTON ==================== */
function initScrollToTop() {
  const button = document.createElement('button');
  button.id = 'scroll-to-top';
  button.innerHTML = '↑';
  button.setAttribute('aria-label', 'Scroll to top');
  button.style.cssText = `
    position: fixed;
    bottom: 6.5rem;
    right: 2.35rem;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    display: none;
    z-index: 99;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(82, 114, 103, 0.3);
  `;

  document.body.appendChild(button);

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      button.style.display = 'block';
      button.style.animation = 'slideUp 0.3s ease';
    } else {
      button.style.display = 'none';
    }
  }, { passive: true });

  button.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  button.addEventListener('mouseenter', function() {
    this.style.backgroundColor = 'var(--color-primary-hover)';
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 8px 24px rgba(82, 114, 103, 0.4)';
  });

  button.addEventListener('mouseleave', function() {
    this.style.backgroundColor = '';
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 12px rgba(82, 114, 103, 0.3)';
  });
}

/* ==================== BUTTON HOVER EFFECTS ==================== */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

/* ==================== LAZY LOAD FOR IMAGES (if added) ==================== */
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

/* ==================== ANALYTICS & TRACKING INITIALIZATION ==================== */

// Inicjalizacja Google Analytics 4
function initGoogleAnalytics() {
  const gaId = (typeof Config !== 'undefined') ? Config.GOOGLE_ANALYTICS_ID : null;

  if (gaId && gaId !== '') {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', gaId, {
      'page_path': window.location.pathname,
      'page_title': document.title
    });

    if (typeof Config !== 'undefined' && Config.DEBUG_MODE) {
      console.log('🔍 Google Analytics initialized:', gaId);
    }
  } else if (typeof Config !== 'undefined' && Config.DEBUG_MODE) {
    console.log('ℹ️ Google Analytics not configured (ID missing)');
  }
}

// Inicjalizacja Google Tag Manager
function initGoogleTagManager() {
  if (typeof AnalyticsConfig !== 'undefined' && AnalyticsConfig.GOOGLE_TAG_MANAGER_ID && AnalyticsConfig.GOOGLE_TAG_MANAGER_ID !== 'GTM-XXXXXXXX') {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${AnalyticsConfig.GOOGLE_TAG_MANAGER_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});

    if (AnalyticsConfig.DEBUG_MODE) {
      console.log('Google Tag Manager initialized:', AnalyticsConfig.GOOGLE_TAG_MANAGER_ID);
    }
  }
}

// Inicjalizacja Meta Pixel (Facebook)
function initMetaPixel() {
  if (typeof AnalyticsConfig !== 'undefined' && AnalyticsConfig.META_PIXEL_ID && AnalyticsConfig.META_PIXEL_ID !== 'XXXXXXXXXXXXXXXXXX') {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', AnalyticsConfig.META_PIXEL_ID);
    fbq('track', 'PageView');

    if (AnalyticsConfig.DEBUG_MODE) {
      console.log('Meta Pixel initialized:', AnalyticsConfig.META_PIXEL_ID);
    }
  }
}

// Inicjalizacja Hotjar (opcjonalne)
function initHotjar() {
  if (typeof AnalyticsConfig !== 'undefined' && AnalyticsConfig.HOTJAR_ID) {
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:AnalyticsConfig.HOTJAR_ID,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

    if (AnalyticsConfig.DEBUG_MODE) {
      console.log('Hotjar initialized:', AnalyticsConfig.HOTJAR_ID);
    }
  }
}

// Inicjalizacja Microsoft Clarity (opcjonalne)
function initMicrosoftClarity() {
  if (typeof AnalyticsConfig !== 'undefined' && AnalyticsConfig.CLARITY_ID) {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://web.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", AnalyticsConfig.CLARITY_ID);

    if (AnalyticsConfig.DEBUG_MODE) {
      console.log('Microsoft Clarity initialized:', AnalyticsConfig.CLARITY_ID);
    }
  }
}

// Inicjalizacja LinkedIn Insight Tag (opcjonalne)
function initLinkedInInsight() {
  if (typeof AnalyticsConfig !== 'undefined' && AnalyticsConfig.LINKEDIN_PARTNER_ID) {
    _linkedin_partner_id = AnalyticsConfig.LINKEDIN_PARTNER_ID;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    document.head.appendChild(script);

    if (AnalyticsConfig.DEBUG_MODE) {
      console.log('LinkedIn Insight Tag initialized:', AnalyticsConfig.LINKEDIN_PARTNER_ID);
    }
  }
}

// Inicjalizacja TikTok Pixel (opcjonalne)
function initTikTokPixel() {
  if (typeof AnalyticsConfig !== 'undefined' && AnalyticsConfig.TIKTOK_PIXEL_ID) {
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["pageview","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq[ttq.methods[n]].apply(ttq.instance(t),[]);return e};ttq.instances={},ttq._i={},ttq._t={},ttq._o=gtag,ttq.identify=function(e){ttq.identify.these=e,w.ttq.instances.forEach(function(t){ttq[t].identify(e)})},ttq.track=function(e,t){w.ttq.instances.forEach(function(n){ttq[n].track(e,t)})},ttq.pageview=function(e){w.ttq.instances.forEach(function(t){ttq[t].pageview(e)})};var e=d.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://analytics.tiktok.com/i18n/pixel/config/"+AnalyticsConfig.TIKTOK_PIXEL_ID+".js";var n=d.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n);ttq.track("PageView")
    }(window, document, 'ttq');

    if (AnalyticsConfig.DEBUG_MODE) {
      console.log('TikTok Pixel initialized:', AnalyticsConfig.TIKTOK_PIXEL_ID);
    }
  }
}

// Zainicjuj wszystkie narzędzia analityczne
document.addEventListener('DOMContentLoaded', function() {
  initGoogleAnalytics();
  initGoogleTagManager();
  initMetaPixel();
  initHotjar();
  initMicrosoftClarity();
  initLinkedInInsight();
  initTikTokPixel();
});

/* ==================== ANALYTICS INTEGRATION ==================== */
function initAnalyticsIntegration() {
  // Initialize all analytics services
  initGoogleAnalytics();
  initGoogleTagManager();
  initMetaPixel();
  initHotjar();
  initMicrosoftClarity();
  initLinkedInInsight();
  initTikTokPixel();

  // Track contact clicks
  initPhoneTracking();

  // Log analytics status
  if (typeof Config !== 'undefined' && Config.DEBUG_MODE) {
    const status = Config.getConfigStatus();
    console.group('📊 Analytics Status');
    console.log('Configured:', Object.keys(status.configured).length);
    console.log('Not configured:', Object.keys(status.notConfigured).length);
    console.groupEnd();
  }
}

// Google Tag Manager
function initGoogleTagManager() {
  const gtmId = (typeof Config !== 'undefined') ? Config.GOOGLE_TAG_MANAGER_ID : null;

  if (gtmId && gtmId !== '') {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});

    if (typeof Config !== 'undefined' && Config.DEBUG_MODE) {
      console.log('🏷️ Google Tag Manager initialized:', gtmId);
    }
  }
}

// Meta Pixel
function initMetaPixel() {
  const pixelId = (typeof Config !== 'undefined') ? Config.META_PIXEL_ID : null;

  if (pixelId && pixelId !== '') {
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;
      n=f.fbq=function(){n.callMethod ? n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=!0;t.src=v;
      s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
    }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', pixelId);
    fbq('track', 'PageView');

    if (typeof Config !== 'undefined' && Config.DEBUG_MODE) {
      console.log('📱 Meta Pixel initialized:', pixelId);
    }
  }
}

// Hotjar
function initHotjar() {
  const hotjarId = (typeof Config !== 'undefined') ? Config.HOTJAR_ID : null;

  if (hotjarId && hotjarId !== '') {
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:hotjarId,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

    if (typeof Config !== 'undefined' && Config.DEBUG_MODE) {
      console.log('🔥 Hotjar initialized:', hotjarId);
    }
  }
}

// Microsoft Clarity
function initMicrosoftClarity() {
  const clarityId = (typeof Config !== 'undefined') ? Config.CLARITY_ID : null;

  if (clarityId && clarityId !== '') {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://web.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", clarityId);

    if (typeof Config !== 'undefined' && Config.DEBUG_MODE) {
      console.log('🔷 Microsoft Clarity initialized:', clarityId);
    }
  }
}

// LinkedIn
function initLinkedInInsight() {
  const linkedinId = (typeof Config !== 'undefined') ? Config.LINKEDIN_PARTNER_ID : null;

  if (linkedinId && linkedinId !== '') {
    _linkedin_partner_id = linkedinId;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    document.head.appendChild(script);

    if (typeof Config !== 'undefined' && Config.DEBUG_MODE) {
      console.log('🔗 LinkedIn Insight initialized:', linkedinId);
    }
  }
}

// TikTok Pixel
function initTikTokPixel() {
  const tiktokId = (typeof Config !== 'undefined') ? Config.TIKTOK_PIXEL_ID : null;

  if (tiktokId && tiktokId !== '') {
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
      ttq.methods=["pageview","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
      ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
      for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
      ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq[ttq.methods[n]].apply(ttq.instance(t),[]);return e};
      ttq.instances={},ttq._i={},ttq._t={},ttq._o=gtag;
      ttq.identify=function(e){ttq.identify.these=e,w.ttq.instances.forEach(function(t){ttq[t].identify(e)})};
      ttq.track=function(e,t){w.ttq.instances.forEach(function(n){ttq[n].track(e,t)})};
      ttq.pageview=function(e){w.ttq.instances.forEach(function(t){ttq[t].pageview(e)})};
      var e=d.createElement("script");
      e.type="text/javascript",e.async=!0,e.src="https://analytics.tiktok.com/i18n/pixel/config/"+tiktokId+".js";
      var n=d.getElementsByTagName("script")[0];
      n.parentNode.insertBefore(e,n);ttq.track("PageView")
    }(window, document, 'ttq');

    if (typeof Config !== 'undefined' && Config.DEBUG_MODE) {
      console.log('🎵 TikTok Pixel initialized:', tiktokId);
    }
  }
}

/* ==================== CONTACT TRACKING ==================== */
function initPhoneTracking() {
  document.querySelectorAll('a[href^="tel:"], a[href^="sms:"], a[href*="wa.me/"]').forEach(link => {
    link.addEventListener('click', function() {
      const href = this.href;
      const channel = href.startsWith('tel:') ? 'phone' : href.startsWith('sms:') ? 'sms' : 'whatsapp';
      const eventName = channel === 'phone' ? 'phone_call' : channel === 'sms' ? 'sms_click' : 'whatsapp_click';
      const trackPhones = (typeof Config !== 'undefined') ? Config.TRACK_PHONE_CLICKS : true;

      if (!trackPhones) return;

      if (typeof Config !== 'undefined' && Config.DEBUG_MODE) {
        console.log('📞 Contact click tracked:', channel, href);
      }

      // Google Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
          'contact_channel': channel,
          'contact_href': href,
          'event_category': 'engagement',
          'event_label': channel + ' click'
        });
      }

      // Meta Pixel tracking
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Contact', {
          content_name: channel + ' click',
          content_category: 'rental_property_management',
          contact_channel: channel
        });
      }

      // Google Tag Manager tracking
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
          'event': eventName,
          'contact_channel': channel,
          'contact_href': href
        });
      }

      // TikTok tracking
      if (typeof ttq !== 'undefined') {
        ttq.track('Contact', {
          content_name: channel + ' click'
        });
      }
    });
  });
}
