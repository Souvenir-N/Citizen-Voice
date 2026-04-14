const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const realTime = document.getElementById('realTime');
const navTime = document.getElementById('navTime');
const heroSlides = document.querySelectorAll('.hero-slide');
let heroIndex = 0;
let heroTimer = null;

function updateThemeIcon(isDark) {
  if (!themeToggle) return;
  themeToggle.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

function setTheme(mode) {
  document.body.classList.toggle('dark-mode', mode === 'dark');
  localStorage.setItem('siteTheme', mode);
  updateThemeIcon(mode === 'dark');
}

function initTheme() {
  const savedTheme = localStorage.getItem('siteTheme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark-mode');
  setTheme(isDark ? 'light' : 'dark');
}

function toggleNav() {
  navMenu.classList.toggle('open');
  const icon = menuToggle.querySelector('i');
  if (icon) {
    icon.className = navMenu.classList.contains('open')
      ? 'fa-solid fa-xmark'
      : 'fa-solid fa-bars';
  }
}

function closeNavOnLinkClick() {
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleNav();
      }
    });
  });
}

function updateRealTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString();

  if (realTime) {
    realTime.textContent = `Local time: ${date} ${time}`;
  }
  if (navTime) {
    navTime.textContent = time;
  }
}

function showHeroSlide(index) {
  if (!heroSlides.length || index === heroIndex) return;

  const current = heroSlides[heroIndex];
  const next = heroSlides[index];

  current.classList.remove('active');
  current.classList.add('prev');

  next.classList.remove('prev');
  next.classList.add('active');

  heroIndex = index;
}

function advanceHeroSlider() {
  if (!heroSlides.length) return;
  const nextIndex = (heroIndex + 1) % heroSlides.length;
  showHeroSlide(nextIndex);
}

function initHeroSlider() {
  if (!heroSlides.length) return;

  heroSlides.forEach((slide, index) => {
    slide.classList.remove('active', 'prev');
    if (index === 0) {
      slide.classList.add('active');
    } else {
      slide.classList.add('prev');
    }
  });

  clearInterval(heroTimer);
  heroTimer = setInterval(advanceHeroSlider, 5500);
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', toggleNav);
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

initTheme();
updateRealTime();
setInterval(updateRealTime, 1000);
closeNavOnLinkClick();
initHeroSlider();

function validateForm(form) {
  let valid = true;
  let firstInvalid = null;
  const formMessage = form.querySelector('.form-message');
  const fields = form.querySelectorAll('input, textarea, select');

  if (formMessage) {
    formMessage.textContent = '';
    formMessage.classList.remove('error-message');
  }

  fields.forEach(field => {
    field.classList.remove('invalid');
    field.setCustomValidity('');

    if (!field.checkValidity()) {
      valid = false;
      if (!firstInvalid) firstInvalid = field;

      field.classList.add('invalid');

      if (field.validity.valueMissing) {
        field.setCustomValidity('This field is required.');
      } else if (field.validity.typeMismatch) {
        if (field.type === 'email') {
          field.setCustomValidity('Please enter a valid email address.');
        } else {
          field.setCustomValidity('Please enter a valid value.');
        }
      } else if (field.validity.tooShort) {
        field.setCustomValidity(`Please enter at least ${field.minLength} characters.`);
      } else if (field.validity.patternMismatch) {
        field.setCustomValidity('Please follow the required format.');
      }

      field.reportValidity();
    }
  });

  if (!valid && formMessage) {
    formMessage.textContent = 'Please fix the highlighted fields before submitting.';
    formMessage.classList.add('error-message');
  }

  if (firstInvalid) {
    firstInvalid.focus();
  }

  return valid;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form').forEach(form => {
    form.setAttribute('novalidate', '');

    form.addEventListener('submit', event => {
      if (!validateForm(form)) {
        event.preventDefault();
      }
    });

    form.addEventListener('invalid', event => {
      event.preventDefault();
      event.target.classList.add('invalid');
    }, true);

    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        if (field.validity.valid) {
          field.classList.remove('invalid');
          field.setCustomValidity('');
        }
      });
    });
  });
});

// Translation functionality
const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.report": "Report Issue",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "title.home": "Citizen Voice | Home",
    "title.about": "Citizen Voice | About",
    "title.services": "Citizen Voice | Services",
    "title.report": "Citizen Voice | Report Issue",
    "title.gallery": "Citizen Voice | Gallery",
    "title.contact": "Citizen Voice | Contact",
    "hero.title": "Welcome to Citizen Voice",
    "hero.subtitle": "Your voice matters in building a better community.",
    "hero.description": "A trusted platform where citizens report community problems to help government respond faster and improve daily life.",
    "hero.reportBtn": "Report an Issue",
    "hero.servicesBtn": "Explore Services",
    "concerns.title": "Community Concerns We Handle",
    "concerns.subtitle": "Simple reporting for everyday problems affecting people and neighborhoods.",
    "card.health.title": "Health",
    "card.health.desc": "Hospitals, diseases, sanitation issues, and health-related emergencies.",
    "card.security.title": "Security",
    "card.security.desc": "Crime, theft, violence, suspicious activity, and unsafe areas.",
    "card.trade.title": "Trade",
    "card.trade.desc": "Market problems, unfair prices, seller disputes, and business concerns.",
    "card.education.title": "Education",
    "card.education.desc": "School facilities, teachers, learning environment, and student welfare.",
    "card.water.title": "Water",
    "card.water.desc": "Water shortages, broken taps, and sanitation concerns.",
    "card.infrastructure.title": "Roads & Electricity",
    "card.infrastructure.desc": "Damaged roads, power outages, and other community infrastructure issues.",
    "feature.title": "Fast, Clean, and Easy Reporting",
    "feature.desc": "Citizens can submit issues through a simple form, and authorities can review complaints in one place. The platform is designed to be mobile-friendly, accessible, and easy to use.",
    "feature.list1": "Responsive on mobile, tablet, and desktop",
    "feature.list2": "Secure and organized issue submission",
    "feature.list3": "Clear categories for faster response",
    "how.title": "How It Works",
    "how.subtitle": "Three simple steps to report a community problem.",
    "step1.title": "Choose a Category",
    "step1.desc": "Select health, security, trade, education, or other community issue.",
    "step2.title": "Describe the Problem",
    "step2.desc": "Explain what happened, where it happened, and what support is needed.",
    "step3.title": "Submit the Report",
    "step3.desc": "Your issue is sent for review so the right action can be taken.",
    "footer.brand": "Citizen Voice",
    "footer.desc": "Giving communities a simple way to report issues and improve public service delivery.",
    "footer.links.title": "Quick Links",
    "footer.links.home": "Home",
    "footer.links.about": "About",
    "footer.links.services": "Services",
    "footer.links.report": "Report Issue",
    "footer.contact.title": "Contact",
    "footer.contact.email": "Email: info@citizenvoice.gov",
    "footer.contact.phone": "Phone: +250 700 000 000",
    "footer.copyright": "&copy; 2026 Citizen Voice. All rights reserved.",
    "about.title": "About Citizen Voice",
    "about.subtitle": "Building a bridge between citizens and government through transparent reporting.",
    "about.mission.title": "Our Mission",
    "about.mission.p1": "Citizen Voice is designed to help citizens communicate local problems quickly and clearly. The platform supports better public awareness, faster reporting, and improved responsiveness.",
    "about.mission.p2": "It focuses on important everyday issues such as health, security, trade, education, roads, electricity, and water.",
    "about.useful.title": "What Makes It Useful?",
    "about.useful.list1": "Easy to use for all citizens",
    "about.useful.list2": "Clear categories for faster processing",
    "about.useful.list3": "Works on any device",
    "about.useful.list4": "Clean, professional interface",
    "about.why.title": "Why This Platform Matters",
    "about.why.subtitle": "Local issues affect families, schools, markets, and communities every day.",
    "about.why.transparency.title": "Transparency",
    "about.why.transparency.desc": "People can report issues openly and consistently.",
    "about.why.accountability.title": "Accountability",
    "about.why.accountability.desc": "Authorities can track concerns and take action.",
    "about.why.growth.title": "Community Growth",
    "about.why.growth.desc": "Better services lead to safer and healthier communities.",
    "services.title": "Our Services",
    "services.subtitle": "Citizen Voice supports different reporting categories for community development.",
    "services.explore.title": "Our Services",
    "services.explore.desc": "Explore how we support community needs.",
    "services.card.health.title": "Health Reports",
    "services.card.health.desc": "Report health emergencies, unsanitary environments, missing supplies, or hospital concerns.",
    "services.card.security.title": "Security Reports",
    "services.card.security.desc": "Send complaints about theft, violence, suspicious activity, and unsafe conditions.",
    "services.card.trade.title": "Trade Reports",
    "services.card.trade.desc": "Report unfair prices, market problems, and trade-related issues affecting buyers or sellers.",
    "services.card.education.title": "Education Reports",
    "services.card.education.desc": "Highlight school facility problems, teacher shortages, and learning environment issues.",
    "services.card.infrastructure.title": "Infrastructure Reports",
    "services.card.infrastructure.desc": "Report damaged roads, broken water systems, or electricity interruptions.",
    "services.card.community.title": "Community Support",
    "services.card.community.desc": "General daily life problems and neighborhood concerns can also be reported here.",
    "services.benefits.title": "What Users Gain",
    "services.benefits.comm.title": "Better Communication",
    "services.benefits.comm.desc": "Citizens can send concerns in a structured way, helping authorities understand the problem faster.",
    "services.benefits.response.title": "Better Response",
    "services.benefits.response.desc": "Clear issue categories make it easier to assign reports to the right department.",
    "services.benefits.community.title": "Better Communities",
    "services.benefits.community.desc": "When issues are reported quickly, solutions can be planned more effectively.",
    "report.title": "Report an Issue",
    "report.subtitle": "Please fill in the form below to send your complaint or community concern.",
    "report.section.title": "Report an Issue",
    "report.section.desc": "Submit your concerns easily.",
    "report.name.label": "Name",
    "report.name.placeholder": "Enter your full name",
    "report.email.label": "Email",
    "report.email.placeholder": "Enter your email address",
    "report.category.label": "Category",
    "report.category.option.choose": "Choose category",
    "report.category.option.health": "Health",
    "report.category.option.security": "Security",
    "report.category.option.trade": "Trade",
    "report.category.option.education": "Education",
    "report.category.option.other": "Other",
    "report.description.label": "Description",
    "report.description.placeholder": "Describe the issue in detail",
    "report.submitBtn": "Submit Report",
    "report.before.title": "Before Submitting",
    "report.before.desc": "Make sure you include enough detail so the issue can be understood quickly.",
    "report.before.list1": "Mention the location",
    "report.before.list2": "Explain what happened",
    "report.before.list3": "Choose the correct category",
    "report.modal.title": "Report Submitted Successfully",
    "report.modal.desc": "Thank you for helping improve your community. Your issue has been received.",
    "report.modal.close": "Close",
    "gallery.title": "Gallery",
    "gallery.subtitle": "Sample community images and public service moments.",
    "contact.title": "Contact Us",
    "contact.subtitle": "Reach out for support, questions, or more information.",
    "contact.info.title": "Get in Touch",
    "contact.info.address": "<i class=\"fa-solid fa-location-dot\"></i> Address: Kigali, Rwanda",
    "contact.info.phone": "<i class=\"fa-solid fa-phone\"></i> Phone: +250 700 000 000",
    "contact.info.email": "<i class=\"fa-solid fa-envelope\"></i> Email: info@citizenvoice.gov",
    "contact.info.desc": "We are available for questions about reporting, services, and platform use.",
    "contact.name.label": "Name",
    "contact.name.placeholder": "Your name",
    "contact.email.label": "Email",
    "contact.email.placeholder": "Your email",
    "contact.message.label": "Message",
    "contact.message.placeholder": "Write your message",
    "contact.sendBtn": "Send Message"
  },
  rw: {
    "nav.home": "Ahabanza",
    "nav.about": "Ibyerekeye",
    "nav.services": "Serivisi",
    "nav.report": "Tanga Ikibazo",
    "nav.gallery": "Ishusho",
    "nav.contact": "Twandikire",
    "hero.title": "Murakaza neza kuri Citizen Voice",
    "hero.subtitle": "Ijwi ryawe rifite akamaro mu kubaka umuryango mwiza.",
    "hero.description": "Urubuga rwizerwa aho abaturage batanga ibibazo by'umuryango kugirango guverinoma isubize vuba kandi igire imibereho myiza.",
    "hero.reportBtn": "Tanga Ikibazo",
    "hero.servicesBtn": "Reba Serivisi",
    "concerns.title": "Ibibazo by'Umuryango Tubifata",
    "concerns.subtitle": "Gutanga raporo yoroshye ku bibazo by'umunsi ku munsi bibangamira abantu n'imijyi.",
    "card.health.title": "Ubuzima",
    "card.health.desc": "Ivuriro, indwara, ibibazo by'isuku, n'ibindi bibazo bijyanye n'ubuzima.",
    "card.security.title": "Umutekano",
    "card.security.desc": "Ibyaha, ubujura, urugomo, ibikorwa by'urujijo, n'ahantu hatari umutekano.",
    "card.trade.title": "Ubucuruzi",
    "card.trade.desc": "Ibibazo by'isoko, ibiciro bidahwitse, amakimbirane y'abacuruzi, n'ibibazo bijyanye n'ubucuruzi.",
    "card.education.title": "Uburezi",
    "card.education.desc": "Ibikorwa by'amashuri, abarimu, ahantu ho kwiga, n'umutekano w'abanyeshuri.",
    "card.water.title": "Amazi",
    "card.water.desc": "Ubushobozi buke bw'amazi, amazi atavuye, n'ibibazo bijyanye n'isuku.",
    "card.infrastructure.title": "Imihanda n'Amashanyarazi",
    "card.infrastructure.desc": "Imihanda yononekaye, amashanyarazi atagenda, n'ibindi bibazo bijyanye n'imihanda.",
    "feature.title": "Gutanga Raporo Byihuse, Bisukuye kandi Byoroshye",
    "feature.desc": "Abaturage bashobora gutanga ibibazo binyuze mu ifishi yoroshye, kandi abategetsi bashobora gusuzuma ibibazo ahantu hamwe. Urubuga rwakozwe kugirango rube rworoshye ku telefone, rukoreshwa neza, kandi rukoreshwa neza.",
    "feature.list1": "Rukora ku telefone, tablet, na desktop",
    "feature.list2": "Gutanga ibibazo mu buryo bw'umutekano kandi butunganye",
    "feature.list3": "Ibyiciro bisobanutse kugirango haboneke igisubizo cyihuse",
    "how.title": "Uko Bikora",
    "how.subtitle": "Intambwe eshatu yoroshye yo gutanga ikibazo cy'umuryango.",
    "step1.title": "Hitamo Icyiciro",
    "step1.desc": "Hitamo ubuzima, umutekano, ubucuruzi, uburezi, cyangwa ikibazo cy'umuryango.",
    "step2.title": "Sobanura Ikibazo",
    "step2.desc": "Sobanura icyabaye, aho cyabaye, n'ubufasha bukeneye.",
    "step3.title": "Tanga Raporo",
    "step3.desc": "Ikibazo cyawe cyoherezwa kugirango gisuzumwe kandi igisubizo gikurikire.",
    "footer.brand": "Citizen Voice",
    "footer.desc": "Gutanga uburyo bworoshye ku miryango yo gutanga ibibazo no kongera serivisi za leta.",
    "footer.links.title": "Amahuru Yihuse",
    "footer.links.home": "Ahabanza",
    "footer.links.about": "Ibyerekeye",
    "footer.links.services": "Serivisi",
    "footer.links.report": "Tanga Ikibazo",
    "footer.contact.title": "Twandikire",
    "footer.contact.email": "Imeri: info@citizenvoice.gov",
    "footer.contact.phone": "Telefoni: +250 700 000 000",
    "footer.copyright": "&copy; 2026 Citizen Voice. Uburenganzira bwose burabitswe.",
    "about.title": "Ibyerekeye Citizen Voice",
    "about.subtitle": "Kubaka umuryango hagati y'abaturage na guverinoma binyuze mu gutanga raporo rusange.",
    "about.mission.title": "Inshingano Zacu",
    "about.mission.p1": "Citizen Voice yakozwe kugirango ifashe abaturage gutanga ibibazo byaho byihuse kandi neza. Urubuga rufasha kumenyekanisha neza, gutanga raporo yihuse, no gusubiza neza.",
    "about.mission.p2": "Rugamije ibibazo by'umunsi ku munsi nk'ubuzima, umutekano, ubucuruzi, uburezi, imihanda, amashanyarazi, n'amazi.",
    "about.useful.title": "Iki Kigira Akamaro?",
    "about.useful.list1": "Byoroshye gukoreshwa na bose",
    "about.useful.list2": "Ibyiciro bisobanutse kugirango bigerweho vuba",
    "about.useful.list3": "Bikora kuri buri gikoresho",
    "about.useful.list4": "Ahantu hisukuye, hizewe",
    "about.why.title": "Kuki Urubuga Rukenewe",
    "about.why.subtitle": "Ibibazo byaho bibangamira imiryango, amashuri, isoko, n'imijyi buri munsi.",
    "about.why.transparency.title": "Kugaragara",
    "about.why.transparency.desc": "Abantu bashobora gutanga ibibazo mu ruhame kandi mu buryo butandukanye.",
    "about.why.accountability.title": "Kubazwa",
    "about.why.accountability.desc": "Abategetsi bashobora gukurikirana ibibazo no gufata ingamba.",
    "about.why.growth.title": "Gukura kw'Umuryango",
    "about.why.growth.desc": "Serivisi nziza zitera umutekano n'ubuzima bwiza mu miryango.",
    "services.title": "Serivisi Zacu",
    "services.subtitle": "Citizen Voice ishyigikira ibyiciro bitandukanye byo gutanga raporo ku iterambere ry'umuryango.",
    "services.explore.title": "Serivisi Zacu",
    "services.explore.desc": "Reba uko dushyigikira ibyifuzo by'umuryango.",
    "services.card.health.title": "Raporo z'Ubuzima",
    "services.card.health.desc": "Tanga raporo ku byihutirwa by'ubuzima, ibidafite isuku, kubura ibikoresho, cyangwa ibibazo by'amavuriro.",
    "services.card.security.title": "Raporo z'Umutekano",
    "services.card.security.desc": "Ohereza amakuru ku bujura, urugomo, ibikorwa by'urujijo, n'ahantu hatari umutekano.",
    "services.card.trade.title": "Raporo z'Ubucuruzi",
    "services.card.trade.desc": "Tanga raporo ku biciro bidahwitse, ibibazo by'isoko, n'ibindi bibazo by'ubucuruzi bibangamira abaguzi cyangwa abacuruzi.",
    "services.card.education.title": "Raporo z'Uburezi",
    "services.card.education.desc": "Garagaza ibibazo by'ibikorwa by'amashuri, kubura abarimu, n'ibibazo by'ibidukikije byo kwiga.",
    "services.card.infrastructure.title": "Raporo z'Iyubakwa",
    "services.card.infrastructure.desc": "Tanga raporo ku mihanda yangiritse, imiyoboro y'amazi yangiritse, cyangwa kuzimya amashanyarazi.",
    "services.card.community.title": "Inkunga y'Umuryango",
    "services.card.community.desc": "Ibibazo by'ubuzima bwa buri munsi n'ibyabo by'umudugudu nabyo birashobora gutangazwa hano.",
    "services.benefits.title": "Ibyo Abakoresha Bahabwa",
    "services.benefits.comm.title": "Itumanaho Ryiza",
    "services.benefits.comm.desc": "Abaturage bashobora kohereza ibibazo mu buryo bufite gahunda, bifasha abategetsi gusobanukirwa ikibazo vuba.",
    "services.benefits.response.title": "Igisubizo Cyiza",
    "services.benefits.response.desc": "Ibyiciro by'ibibazo bisobanutse bituma korohereza kohereza raporo mu ishami rikwiye.",
    "services.benefits.community.title": "Imiryango Myiza",
    "services.benefits.community.desc": "Iyo ibibazo bitanzwe vuba, ibisubizo birashobora gutegurwa neza.",
    "report.title": "Tanga Ikibazo",
    "report.subtitle": "Nyuzamo ifishi hasi kugirango wohereze ikirego cyangwa ikibazo cy'umuryango.",
    "report.section.title": "Tanga Ikibazo",
    "report.section.desc": "Ohereza ibitekerezo byawe byoroshye.",
    "report.name.label": "Izina",
    "report.name.placeholder": "Andika izina ryawe ryuzuye",
    "report.email.label": "Imeli",
    "report.email.placeholder": "Andika aderesi ya imeli yawe",
    "report.category.label": "Icyiciro",
    "report.category.option.choose": "Hitamo icyiciro",
    "report.category.option.health": "Ubuzima",
    "report.category.option.security": "Umutekano",
    "report.category.option.trade": "Ubucuruzi",
    "report.category.option.education": "Uburezi",
    "report.category.option.other": "Icyindi",
    "report.description.label": "Ibisobanuro",
    "report.description.placeholder": "Sobanura ikibazo neza",
    "report.submitBtn": "Ohereza Raporo",
    "report.before.title": "Mbere yo Kohereza",
    "report.before.desc": "Wemeze ko winjije ibisobanuro bihagije kugirango ikibazo gisobanuke vuba.",
    "report.before.list1": "Vuga aho byabereye",
    "report.before.list2": "Sobanura ibyabaye",
    "report.before.list3": "Hitamo icyiciro gikwiye",
    "report.modal.title": "Raporo yoherejwe neza",
    "report.modal.desc": "Murakoze gufasha kunoza umuryango wawe. Ikibazo cyawe cyakiriwe.",
    "report.modal.close": "Funga",
    "gallery.title": "Ishusho",
    "gallery.subtitle": "Amafoto y'umuryango n'ibikorwa bya serivisi za rubanda.",
    "contact.title": "Twandikire",
    "contact.subtitle": "Twandikire kubibazo, ibibazo, cyangwa amakuru yisumbuye.",
    "contact.info.title": "Tugane",
    "contact.info.address": "<i class=\"fa-solid fa-location-dot\"></i> Aderesi: Kigali, Rwanda",
    "contact.info.phone": "<i class=\"fa-solid fa-phone\"></i> Telefoni: +250 798617972",
    "contact.info.email": "<i class=\"fa-solid fa-envelope\"></i> Imeri: info@citizenvoice.gov",
    "contact.info.desc": "Turi ku murongo kubibazo bijyanye no gutanga raporo, serivisi, n'ikoreshwa ry'urubuga.",
    "contact.name.label": "Izina",
    "contact.name.placeholder": "Izina ryawe",
    "contact.email.label": "Imeli",
    "contact.email.placeholder": "Imeli yawe",
    "contact.message.label": "Ubutumwa",
    "contact.message.placeholder": "Andika ubutumwa bwawe",
    "contact.sendBtn": "Ohereza Ubutumwa"
  },
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.report": "Signaler un problème",
    "nav.gallery": "Galerie",
    "nav.contact": "Contact",
    "hero.title": "Bienvenue sur Citizen Voice",
    "hero.subtitle": "Votre voix compte pour construire une meilleure communauté.",
    "hero.description": "Une plateforme de confiance où les citoyens signalent les problèmes communautaires pour aider le gouvernement à répondre plus rapidement et à améliorer la vie quotidienne.",
    "hero.reportBtn": "Signaler un problème",
    "hero.servicesBtn": "Explorer les services",
    "concerns.title": "Préoccupations communautaires que nous traitons",
    "concerns.subtitle": "Signalement simple pour les problèmes quotidiens affectant les gens et les quartiers.",
    "card.health.title": "Santé",
    "card.health.desc": "Hôpitaux, maladies, problèmes de salubrité et urgences liées à la santé.",
    "card.security.title": "Sécurité",
    "card.security.desc": "Crime, vol, violence, activité suspecte et zones dangereuses.",
    "card.trade.title": "Commerce",
    "card.trade.desc": "Problèmes de marché, prix injustes, disputes de vendeurs et préoccupations commerciales.",
    "card.education.title": "Éducation",
    "card.education.desc": "Installations scolaires, enseignants, environnement d'apprentissage et bien-être des étudiants.",
    "card.water.title": "Eau",
    "card.water.desc": "Pénuries d'eau, robinets cassés et préoccupations de salubrité.",
    "card.infrastructure.title": "Routes et Électricité",
    "card.infrastructure.desc": "Routes endommagées, pannes de courant et autres problèmes d'infrastructure communautaire.",
    "feature.title": "Signalement rapide, propre et facile",
    "feature.desc": "Les citoyens peuvent soumettre des problèmes via un formulaire simple, et les autorités peuvent examiner les plaintes en un seul endroit. La plateforme est conçue pour être conviviale sur mobile, accessible et facile à utiliser.",
    "feature.list1": "Responsive sur mobile, tablette et desktop",
    "feature.list2": "Soumission d'incidents sécurisée et organisée",
    "feature.list3": "Catégories claires pour une réponse plus rapide",
    "how.title": "Comment ça marche",
    "how.subtitle": "Trois étapes simples pour signaler un problème communautaire.",
    "step1.title": "Choisir une catégorie",
    "step1.desc": "Sélectionnez santé, sécurité, commerce, éducation ou autre problème communautaire.",
    "step2.title": "Décrire le problème",
    "step2.desc": "Expliquez ce qui s'est passé, où cela s'est passé et quel soutien est nécessaire.",
    "step3.title": "Soumettre le rapport",
    "step3.desc": "Votre problème est envoyé pour examen afin que l'action appropriée soit prise.",
    "footer.brand": "Citizen Voice",
    "footer.desc": "Donner aux communautés un moyen simple de signaler les problèmes et d'améliorer la prestation de services publics.",
    "footer.links.title": "Liens rapides",
    "footer.links.home": "Accueil",
    "footer.links.about": "À propos",
    "footer.links.services": "Services",
    "footer.links.report": "Signaler un problème",
    "footer.contact.title": "Contact",
    "footer.contact.email": "Email: info@citizenvoice.gov",
    "footer.contact.phone": "Téléphone: +250 700 000 000",
    "footer.copyright": "&copy; 2026 Citizen Voice. Tous droits réservés.",
    "about.title": "À propos de Citizen Voice",
    "about.subtitle": "Construire un pont entre les citoyens et le gouvernement grâce à un signalement transparent.",
    "about.mission.title": "Notre mission",
    "about.mission.p1": "Citizen Voice est conçu pour aider les citoyens à communiquer les problèmes locaux rapidement et clairement. La plateforme soutient une meilleure sensibilisation publique, un signalement plus rapide et une réactivité améliorée.",
    "about.mission.p2": "Elle se concentre sur des problèmes quotidiens importants tels que la santé, la sécurité, le commerce, l'éducation, les routes, l'électricité et l'eau.",
    "about.useful.title": "Qu'est-ce qui le rend utile ?",
    "about.useful.list1": "Facile à utiliser pour tous les citoyens",
    "about.useful.list2": "Catégories claires pour un traitement plus rapide",
    "about.useful.list3": "Fonctionne sur n'importe quel appareil",
    "about.useful.list4": "Interface propre et professionnelle",
    "about.why.title": "Pourquoi cette plateforme compte",
    "about.why.subtitle": "Les problèmes locaux affectent les familles, les écoles, les marchés et les communautés tous les jours.",
    "about.why.transparency.title": "Transparence",
    "about.why.transparency.desc": "Les gens peuvent signaler les problèmes ouvertement et de manière cohérente.",
    "about.why.accountability.title": "Responsabilité",
    "about.why.accountability.desc": "Les autorités peuvent suivre les préoccupations et prendre des mesures.",
    "about.why.growth.title": "Croissance communautaire",
    "about.why.growth.desc": "De meilleurs services mènent à des communautés plus sûres et plus saines.",
    "services.title": "Nos Services",
    "services.subtitle": "Citizen Voice prend en charge différentes catégories de signalement pour le développement communautaire.",
    "services.explore.title": "Nos Services",
    "services.explore.desc": "Découvrez comment nous soutenons les besoins de la communauté.",
    "services.card.health.title": "Rapports Santé",
    "services.card.health.desc": "Signalez les urgences sanitaires, les environnements insalubres, les pénuries de fournitures ou les problèmes hospitaliers.",
    "services.card.security.title": "Rapports Sécurité",
    "services.card.security.desc": "Envoyez des plaintes concernant le vol, la violence, les activités suspectes et les conditions dangereuses.",
    "services.card.trade.title": "Rapports Commerce",
    "services.card.trade.desc": "Signalez les prix injustes, les problèmes de marché et les questions commerciales affectant acheteurs ou vendeurs.",
    "services.card.education.title": "Rapports Éducation",
    "services.card.education.desc": "Signalez les problèmes d'infrastructures scolaires, les pénuries d'enseignants et les problèmes d'environnement d'apprentissage.",
    "services.card.infrastructure.title": "Rapports Infrastructure",
    "services.card.infrastructure.desc": "Signalez les routes endommagées, les systèmes d'eau cassés ou les coupures d'électricité.",
    "services.card.community.title": "Soutien Communautaire",
    "services.card.community.desc": "Les problèmes quotidiens et les préoccupations de quartier peuvent également être signalés ici.",
    "services.benefits.title": "Ce que gagnent les utilisateurs",
    "services.benefits.comm.title": "Meilleure communication",
    "services.benefits.comm.desc": "Les citoyens peuvent envoyer des préoccupations de manière structurée, aidant les autorités à comprendre le problème plus rapidement.",
    "services.benefits.response.title": "Meilleure réponse",
    "services.benefits.response.desc": "Des catégories d'incidents claires facilitent l'attribution des signalements au bon service.",
    "services.benefits.community.title": "Meilleures communautés",
    "services.benefits.community.desc": "Lorsque les problèmes sont signalés rapidement, les solutions peuvent être planifiées plus efficacement.",
    "report.title": "Signaler un problème",
    "report.subtitle": "Veuillez remplir le formulaire ci-dessous pour envoyer votre plainte ou préoccupation communautaire.",
    "report.section.title": "Signaler un problème",
    "report.section.desc": "Soumettez vos préoccupations facilement.",
    "report.name.label": "Nom",
    "report.name.placeholder": "Entrez votre nom complet",
    "report.email.label": "Email",
    "report.email.placeholder": "Entrez votre adresse email",
    "report.category.label": "Catégorie",
    "report.category.option.choose": "Choisir une catégorie",
    "report.category.option.health": "Santé",
    "report.category.option.security": "Sécurité",
    "report.category.option.trade": "Commerce",
    "report.category.option.education": "Éducation",
    "report.category.option.other": "Autre",
    "report.description.label": "Description",
    "report.description.placeholder": "Décrivez le problème en détail",
    "report.submitBtn": "Soumettre le rapport",
    "report.before.title": "Avant de soumettre",
    "report.before.desc": "Assurez-vous d'inclure suffisamment de détails pour que le problème puisse être compris rapidement.",
    "report.before.list1": "Indiquez l'emplacement",
    "report.before.list2": "Expliquez ce qui s'est passé",
    "report.before.list3": "Choisissez la bonne catégorie",
    "report.modal.title": "Rapport soumis avec succès",
    "report.modal.desc": "Merci d'aider à améliorer votre communauté. Votre problème a été reçu.",
    "report.modal.close": "Fermer",
    "gallery.title": "Galerie",
    "gallery.subtitle": "Images communautaires et moments de service public.",
    "contact.title": "Contactez-nous",
    "contact.subtitle": "Contactez-nous pour du soutien, des questions ou plus d'informations.",
    "contact.info.title": "Contactez-nous",
    "contact.info.address": "<i class=\"fa-solid fa-location-dot\"></i> Adresse : Kigali, Rwanda",
    "contact.info.phone": "<i class=\"fa-solid fa-phone\"></i> Téléphone : +250 700 000 000",
    "contact.info.email": "<i class=\"fa-solid fa-envelope\"></i> Email : info@citizenvoice.gov",
    "contact.info.desc": "Nous sommes disponibles pour des questions sur le signalement, les services et l'utilisation de la plateforme.",
    "contact.name.label": "Nom",
    "contact.name.placeholder": "Votre nom",
    "contact.email.label": "Email",
    "contact.email.placeholder": "Votre email",
    "contact.message.label": "Message",
    "contact.message.placeholder": "Écrivez votre message",
    "contact.sendBtn": "Envoyer le message"
  }
};

function setLanguage(lang) {
  localStorage.setItem('selectedLanguage', lang);
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    if (translations[lang] && translations[lang][key]) {
      element.setAttribute('placeholder', translations[lang][key]);
    }
  });

  // Update select value
  const select = document.getElementById('languageSelect');
  if (select) select.value = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('selectedLanguage') || 'en';
  setLanguage(savedLang);

  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }
});
