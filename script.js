/* ═══════════════════════════════════════════
   ENGLILAB — script.js — Version complète
   ═══════════════════════════════════════════ */

/* ══ NAVBAR SCROLL ══ */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

/* ══ BURGER MENU ══ */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ══ SCROLL REVEAL ══ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ══ SMOOTH SCROLL ══ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ══════════════════════════════════════════════
   QUIZ — 15 QUESTIONS (QCM + VRAI/FAUX)
   Niveaux : A1(3), A2(3), B1(3), B2(3), C1+(3)
══════════════════════════════════════════════ */

const QUESTIONS = [
  /* ── A1 ── */
  {
    level: 'A1',
    type: 'qcm',
    text: 'What is the correct greeting for the morning?',
    options: ['Good night', 'Good morning', 'Good evening', 'Goodbye'],
    answer: 1,
    feedback: '✅ "Good morning" est le salut du matin. "Good evening" pour le soir, "Good night" pour se coucher.'
  },
  {
    level: 'A1',
    type: 'vf',
    text: '"She are a student" is a correct sentence.',
    options: ['Vrai', 'Faux'],
    answer: 1,
    feedback: '✅ Faux ! La forme correcte est "She IS a student" — le verbe "to be" s\'accorde avec le sujet.'
  },
  {
    level: 'A1',
    type: 'qcm',
    text: 'Choose the correct sentence:',
    options: ['I has a book', 'I have a book', 'I is have book', 'I am have book'],
    answer: 1,
    feedback: '✅ "I have a book" — avec "I", on utilise toujours "have", jamais "has".'
  },

  /* ── A2 ── */
  {
    level: 'A2',
    type: 'qcm',
    text: 'Yesterday, she _____ to the market.',
    options: ['go', 'goes', 'went', 'going'],
    answer: 2,
    feedback: '✅ "Went" est le passé irrégulier de "go". Pour parler du passé, on utilise le prétérit.'
  },
  {
    level: 'A2',
    type: 'vf',
    text: '"They don\'t likes football" is grammatically correct.',
    options: ['Vrai', 'Faux'],
    answer: 1,
    feedback: '✅ Faux ! Avec "don\'t", le verbe reste à sa forme de base : "They don\'t LIKE football".'
  },
  {
    level: 'A2',
    type: 'qcm',
    text: 'How do you say "J\'ai faim" in English?',
    options: ['I am hungry', 'I have hungry', 'I am hunger', 'I feel hunger'],
    answer: 0,
    feedback: '✅ En anglais on dit "I AM hungry" (verbe être + adjectif), contrairement au français "avoir faim".'
  },

  /* ── B1 ── */
  {
    level: 'B1',
    type: 'qcm',
    text: 'She said she _____ come to the party.',
    options: ['will', 'would', 'can', 'shall'],
    answer: 1,
    feedback: '✅ Dans le discours indirect au passé, "will" devient "would". C\'est le futur dans le passé.'
  },
  {
    level: 'B1',
    type: 'vf',
    text: '"I have been living here for 3 years" means I started 3 years ago and still live here now.',
    options: ['Vrai', 'Faux'],
    answer: 0,
    feedback: '✅ Vrai ! Le present perfect continu (have been + -ing) exprime une action commencée dans le passé et toujours en cours.'
  },
  {
    level: 'B1',
    type: 'qcm',
    text: 'Choose the best word: The news was so bad that she was _____ to speak.',
    options: ['too shocked', 'very shocked', 'so shocked', 'much shocked'],
    answer: 0,
    feedback: '✅ "Too + adjectif" indique un excès qui empêche une action. "Too shocked to speak" = tellement choquée qu\'elle ne pouvait pas parler.'
  },

  /* ── B2 ── */
  {
    level: 'B2',
    type: 'qcm',
    text: 'Had they arrived earlier, they _____ the beginning of the show.',
    options: ['would see', 'would have seen', 'will have seen', 'had seen'],
    answer: 1,
    feedback: '✅ La 3ème conditionnelle (if + past perfect → would have + past participle) exprime un regret sur le passé.'
  },
  {
    level: 'B2',
    type: 'vf',
    text: '"Despite of the rain, they went out" is correct English.',
    options: ['Vrai', 'Faux'],
    answer: 1,
    feedback: '✅ Faux ! On dit "Despite the rain" (sans "of") ou "In spite of the rain". "Despite of" est une erreur très commune.'
  },
  {
    level: 'B2',
    type: 'qcm',
    text: 'Which sentence uses the passive voice correctly?',
    options: [
      'The book was wrote by him',
      'The book was written by him',
      'The book is write by him',
      'The book had write by him'
    ],
    answer: 1,
    feedback: '✅ La voix passive se forme avec "to be + participe passé". "Written" est le participe passé irrégulier de "write".'
  },

  /* ── C1+ ── */
  {
    level: 'C1',
    type: 'qcm',
    text: 'The politician\'s speech was deliberately _____, designed to mislead voters.',
    options: ['ambiguous', 'verbose', 'concise', 'eloquent'],
    answer: 0,
    feedback: '✅ "Ambiguous" = ambigu, à double sens. C\'est le mot précis pour décrire un discours volontairement trompeur par son manque de clarté.'
  },
  {
    level: 'C1',
    type: 'vf',
    text: '"Scarcely had she left when the phone rang" is grammatically correct and means the phone rang very soon after she left.',
    options: ['Vrai', 'Faux'],
    answer: 0,
    feedback: '✅ Vrai ! C\'est une inversion avec "scarcely/hardly/no sooner". Structure formelle avancée qui signifie "À peine était-elle partie que le téléphone sonna".'
  },
  {
    level: 'C1',
    type: 'qcm',
    text: 'Which word CANNOT be used as a synonym of "ubiquitous"?',
    options: ['omnipresent', 'pervasive', 'prevalent', 'transient'],
    answer: 3,
    feedback: '✅ "Transient" signifie passager/éphémère — le contraire d\'ubiquitous. Ubiquitous = omniprésent (omnipresent, pervasive, prevalent sont des synonymes).'
  }
];

/* ══════════════════════════════════════════════
   DONNÉES DE RÉSULTATS PAR NIVEAU
══════════════════════════════════════════════ */

const LEVEL_DATA = {
  A1: {
    badge: '🌱',
    title: 'Niveau A1 — Débutant',
    color: '#1D9E75',
    desc: 'Tu es au début de ton voyage en anglais ! C\'est parfait — tout le monde commence quelque part. Avec de la régularité, tu progresseras rapidement.',
    roadmap: [
      { week: 'S1', title: 'Les bases essentielles', text: 'Apprends l\'alphabet anglais et les 100 mots les plus utilisés. Pratique 15 min/jour avec l\'app Duolingo.' },
      { week: 'S2', title: 'Se présenter en anglais', text: 'Entraîne-toi à dire ton nom, ta ville, ton âge et ce que tu fais. Répète à voix haute devant un miroir chaque soir.' },
      { week: 'S3', title: 'Les phrases du quotidien', text: 'Apprends 20 phrases essentielles : saluer, remercier, demander le prix, s\'excuser. Écoute des dialogues simples sur YouTube Kids.' },
      { week: 'S4', title: 'Écoute et imite', text: 'Regarde 10 min de dessins animés en anglais sous-titré (en anglais). Ne traduis pas — imite les sons et la prosodie.' },
      { week: 'S5', title: 'Rejoins le Discord EngliLab', text: 'Présente-toi dans le canal #bienvenue en 3 phrases en anglais. La communauté t\'accueillera et te corrigera avec bienveillance.' },
      { week: 'S6', title: 'Défi final A1', text: 'Enregistre une vidéo de 1 minute où tu te présentes entièrement en anglais. Partage-la sur le Discord pour recevoir des feedbacks.' }
    ],
    resources: [
      { icon: '📺', cat: 'YouTube', title: 'English with Lucy', desc: 'Leçons claires pour débutants absolus, expliquées simplement.', link: 'https://youtube.com/@EnglishWithLucy' },
      { icon: '📱', cat: 'Application', title: 'Duolingo', desc: 'Parfait pour les bases : vocabulaire et structures simples, 15 min/jour.', link: 'https://duolingo.com' },
      { icon: '📚', cat: 'Lecture', title: 'Oxford Bookworms Starter', desc: 'Livres adaptés niveau débutant. Commence par "The Elephant Man".', link: 'https://elt.oup.com/catalogue/items/global/graded_readers/oxford_bookworms_library' },
      { icon: '🎙️', cat: 'Podcast', title: 'Very Short Stories', desc: 'Histoires très courtes racontées lentement, parfait pour l\'oreille débutante.', link: 'https://open.spotify.com' }
    ]
  },
  A2: {
    badge: '📗',
    title: 'Niveau A2 — Débutant avancé',
    color: '#4FCCA0',
    desc: 'Tu connais les bases ! Tu peux avoir des conversations simples. L\'objectif maintenant est de fluidifier ton expression et enrichir ton vocabulaire.',
    roadmap: [
      { week: 'S1', title: 'Consolider la grammaire', text: 'Revois les temps essentiels : présent simple, présent continu, prétérit. Fais 10 exercices de grammaire en ligne (British Council).' },
      { week: 'S2', title: 'Vocabulaire thématique', text: 'Apprends 10 nouveaux mots par jour par thème : famille, travail, nourriture, voyage. Utilise Anki pour mémoriser avec la répétition espacée.' },
      { week: 'S3', title: 'Regarder des séries simples', text: 'Commence "Friends" avec sous-titres anglais. Écoute 1 épisode/jour. Note les expressions idiomatiques que tu ne comprends pas.' },
      { week: 'S4', title: 'Parler sans peur', text: 'Rejoins les sessions vocales du Discord EngliLab. Parle même si tu fais des erreurs — c\'est ainsi qu\'on progresse.' },
      { week: 'S5', title: 'Écrire en anglais', text: 'Tiens un journal en anglais : écris 5 phrases/jour sur ta journée. Poste-les dans le canal #corrections du Discord pour des retours.' },
      { week: 'S6', title: 'Défi A2', text: 'Participe à un débat de 3 minutes sur le Discord sur un sujet simple : "What is your favorite season and why?"' }
    ],
    resources: [
      { icon: '📺', cat: 'YouTube', title: 'BBC Learning English', desc: 'Émissions BBC adaptées aux niveaux intermédiaires, très bien structurées.', link: 'https://youtube.com/@bbclearningenglish' },
      { icon: '📱', cat: 'Application', title: 'Anki', desc: 'Mémorise le vocabulaire avec la répétition espacée — la méthode la plus efficace scientifiquement.', link: 'https://apps.ankiweb.net' },
      { icon: '📚', cat: 'Lecture', title: 'Oxford Bookworms Niveau 2', desc: '"Alice in Wonderland" ou "The Secret Garden" adaptés niveau A2.', link: 'https://elt.oup.com' },
      { icon: '🎙️', cat: 'Podcast', title: 'ESL Pod', desc: 'Dialogues quotidiens expliqués lentement. Idéal pour l\'écoute active.', link: 'https://eslpod.com' }
    ]
  },
  B1: {
    badge: '⭐',
    title: 'Niveau B1 — Intermédiaire',
    color: '#7F77DD',
    desc: 'Excellent ! Tu peux communiquer sur des sujets familiers. L\'objectif maintenant est la fluidité et la compréhension de contenus authentiques.',
    roadmap: [
      { week: 'S1', title: 'Immersion authentique', text: 'Regarde une série américaine ou britannique SANS sous-titres français. Commence par 10 min/jour. "The Office" ou "Brooklyn Nine-Nine" sont idéaux.' },
      { week: 'S2', title: 'Enrichir le vocabulaire avancé', text: 'Lis des articles de BBC News en anglais. Surligne les mots inconnus, recherche-les. Objectif : 5 articles/semaine.' },
      { week: 'S3', title: 'Grammaire avancée', text: 'Travaille le present perfect, les conditionnelles et le discours indirect. Site recommandé : Perfect English Grammar.' },
      { week: 'S4', title: 'Parler couramment', text: 'Anime une discussion de 10 min sur le Discord EngliLab sur un sujet de ton choix. Prépare 5 questions pour lancer le débat.' },
      { week: 'S5', title: 'Écriture formelle', text: 'Rédige un email de candidature à une bourse fictive. Fais-le corriger sur le Discord. Objectif : 200 mots impeccables.' },
      { week: 'S6', title: 'Défi B1', text: 'Enregistre un débat de 5 minutes avec un autre membre du Discord sur un sujet d\'actualité africaine en anglais.' }
    ],
    resources: [
      { icon: '📺', cat: 'YouTube', title: 'TED-Ed', desc: 'Vidéos éducatives courtes sur tous les sujets — vocabulaire riche et prononciation claire.', link: 'https://youtube.com/@TedEd' },
      { icon: '🎙️', cat: 'Podcast', title: '6 Minute English (BBC)', desc: 'Discussions de 6 min sur des sujets variés. Parfait pour le niveau intermédiaire.', link: 'https://bbc.co.uk/learningenglish' },
      { icon: '📚', cat: 'Lecture', title: '"Animal Farm" — Orwell', desc: 'Roman court et puissant, vocabulaire accessible, parfait niveau B1.', link: 'https://gutenberg.org' },
      { icon: '📱', cat: 'Application', title: 'Speechling', desc: 'Pratique la prononciation avec feedback d\'enseignants natifs.', link: 'https://speechling.com' }
    ]
  },
  B2: {
    badge: '🔥',
    title: 'Niveau B2 — Intermédiaire avancé',
    color: '#D85A30',
    desc: 'Impressionnant ! Tu maîtrises l\'anglais courant. Il ne te manque plus que la précision et l\'aisance dans les contextes formels et professionnels.',
    roadmap: [
      { week: 'S1', title: 'Préparation aux certifications', text: 'Commence les exercices IELTS ou TOEFL en ligne. Fais un test blanc complet pour identifier tes points faibles.' },
      { week: 'S2', title: 'Anglais professionnel', text: 'Lis des articles du Harvard Business Review ou The Economist. Analyse le vocabulaire économique et académique utilisé.' },
      { week: 'S3', title: 'Public speaking', text: 'Regarde des TED Talks et analyse la structure des discours. Prépare un discours de 7 min sur un sujet qui te passionne.' },
      { week: 'S4', title: 'Rédaction académique', text: 'Écris un essai argumentatif de 400 mots sur un sujet d\'actualité. Structure : introduction, 2 arguments, contre-argument, conclusion.' },
      { week: 'S5', title: 'Devenir mentor', text: 'Aide un membre débutant sur le Discord EngliLab. Enseigner consolide la maîtrise de la langue et développe ta pédagogie.' },
      { week: 'S6', title: 'Défi B2', text: 'Présente un exposé de 10 minutes devant la communauté Discord sur un sujet africain d\'actualité, entièrement en anglais.' }
    ],
    resources: [
      { icon: '📺', cat: 'YouTube', title: 'TED Talks', desc: 'Discours inspirants de haut niveau — écoute active et prise de notes recommandées.', link: 'https://youtube.com/@TED' },
      { icon: '📚', cat: 'Lecture', title: 'The Economist', desc: 'Hebdomadaire de référence mondiale. Vocabulaire dense, idéal pour le B2/C1.', link: 'https://economist.com' },
      { icon: '🎙️', cat: 'Podcast', title: 'All Ears English', desc: 'Conversations authentiques sur la culture américaine et les nuances de la langue.', link: 'https://allearsenglish.com' },
      { icon: '📝', cat: 'Certification', title: 'IELTS / TOEFL Prep', desc: 'Magoosh propose des cours de préparation accessibles et complets.', link: 'https://magoosh.com' }
    ]
  },
  C1: {
    badge: '👑',
    title: 'Niveau C1 — Expert',
    color: '#EF9F27',
    desc: 'Félicitations ! Tu maîtrises l\'anglais à un niveau quasi-professionnel. Tu peux désormais aider les autres et viser des opportunités internationales.',
    roadmap: [
      { week: 'S1', title: 'Maîtrise des nuances', text: 'Lis des œuvres littéraires classiques en anglais : Shakespeare modernisé, Chimamanda Ngozi Adichie, Chinua Achebe. Analyse le style.' },
      { week: 'S2', title: 'Devenir ambassadeur EngliLab', text: 'Anime une session vocale hebdomadaire sur le Discord. Prépare un thème, des questions et guide la discussion pendant 30 min.' },
      { week: 'S3', title: 'Anglais académique de haut niveau', text: 'Écris un article de recherche de 800 mots sur un sujet qui te passionne. Soumets-le à la révision de la communauté.' },
      { week: 'S4', title: 'Opportunités internationales', text: 'Identifie 3 bourses internationales (Fulbright, Commonwealth, Campus France). Rédige ta lettre de motivation en anglais.' },
      { week: 'S5', title: 'Créer du contenu en anglais', text: 'Lance une série de posts LinkedIn ou YouTube en anglais sur un sujet africain. Construis ta présence digitale internationale.' },
      { week: 'S6', title: 'Défi C1', text: 'Donne une conférence de 15 minutes devant la communauté EngliLab sur comment tu as appris l\'anglais — inspire les débutants !' }
    ],
    resources: [
      { icon: '📚', cat: 'Lecture', title: '"Things Fall Apart" — Achebe', desc: 'Chef-d\'œuvre littéraire africain en anglais. Vocabulaire riche et récit puissant.', link: 'https://gutenberg.org' },
      { icon: '📺', cat: 'YouTube', title: 'Noam Chomsky / Oxford Union', desc: 'Débats et conférences de haut niveau pour affiner l\'oreille au langage académique.', link: 'https://youtube.com/@OxfordUnion' },
      { icon: '🎙️', cat: 'Podcast', title: 'Radiolab / This American Life', desc: 'Podcasts de référence américains — storytelling de haute qualité, langue authentique.', link: 'https://thisamericanlife.org' },
      { icon: '🌐', cat: 'Opportunités', title: 'Opportunity Desk Africa', desc: 'Bourses, fellowships et programmes internationaux pour jeunes Africains.', link: 'https://opportunitydesk.org' }
    ]
  }
};

/* ══════════════════════════════════════════════
   MOTEUR DU QUIZ
══════════════════════════════════════════════ */

let currentQ = 0;
let score = 0;
let answered = false;
let userLevel = 'A1';

const startBtn   = document.getElementById('startQuizBtn');
const quizCont   = document.getElementById('quizContainer');
const resultCont = document.getElementById('resultContainer');
const quizIntro  = document.querySelector('.quiz-intro');

function startQuiz() {
  currentQ = 0; score = 0; answered = false;
  quizIntro.style.display = 'none';
  quizCont.style.display  = 'block';
  resultCont.style.display = 'none';
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[currentQ];
  answered = false;

  // Progress
  document.getElementById('qpCurrent').textContent = `Question ${currentQ + 1}`;
  document.getElementById('qpFill').style.width = `${((currentQ) / QUESTIONS.length) * 100}%`;

  // Level tag
  const tagColors = { A1:'#1D9E75', A2:'#4FCCA0', B1:'#7F77DD', B2:'#D85A30', 'C1':'#EF9F27' };
  const tag = document.getElementById('qLevelTag');
  tag.textContent = q.level;
  tag.style.color = tagColors[q.level];
  tag.style.background = tagColors[q.level] + '18';
  tag.style.borderColor = tagColors[q.level] + '40';

  document.getElementById('qText').textContent = q.text;
  document.getElementById('qFeedback').style.display = 'none';
  document.getElementById('btnNext').style.display = 'none';

  const optsCont = document.getElementById('qOptions');
  optsCont.innerHTML = '';
  const letters = ['A','B','C','D'];
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'q-option';
    btn.innerHTML = `<span class="opt-letter">${q.type === 'vf' ? (i===0?'V':'F') : letters[i]}</span> ${opt}`;
    btn.addEventListener('click', () => selectAnswer(i, btn));
    optsCont.appendChild(btn);
  });

  // Animate card
  const card = document.getElementById('questionCard');
  card.style.opacity = '0'; card.style.transform = 'translateY(16px)';
  setTimeout(() => { card.style.transition = 'all 0.4s ease'; card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 20);
}

function selectAnswer(idx, btnEl) {
  if (answered) return;
  answered = true;

  const q = QUESTIONS[currentQ];
  const allBtns = document.querySelectorAll('.q-option');
  allBtns.forEach(b => b.classList.add('disabled'));

  if (idx === q.answer) {
    score++;
    btnEl.classList.add('correct');
    btnEl.querySelector('.opt-letter').style.background = 'var(--green)';
    btnEl.querySelector('.opt-letter').style.color = '#fff';
  } else {
    btnEl.classList.add('wrong');
    btnEl.querySelector('.opt-letter').style.background = 'var(--coral)';
    btnEl.querySelector('.opt-letter').style.color = '#fff';
    allBtns[q.answer].classList.add('correct');
    allBtns[q.answer].querySelector('.opt-letter').style.background = 'var(--green)';
    allBtns[q.answer].querySelector('.opt-letter').style.color = '#fff';
  }

  const fb = document.getElementById('qFeedback');
  fb.textContent = q.feedback;
  fb.className = `q-feedback ${idx === q.answer ? 'correct' : 'wrong'}`;
  fb.style.display = 'block';
  document.getElementById('btnNext').style.display = 'block';
}

document.getElementById('btnNext').addEventListener('click', () => {
  currentQ++;
  if (currentQ < QUESTIONS.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizCont.style.display  = 'none';
  resultCont.style.display = 'block';

  // Determine level
  if      (score <= 3)  userLevel = 'A1';
  else if (score <= 6)  userLevel = 'A2';
  else if (score <= 9)  userLevel = 'B1';
  else if (score <= 12) userLevel = 'B2';
  else                  userLevel = 'C1';

  const data = LEVEL_DATA[userLevel];

  document.getElementById('resultBadge').textContent = data.badge;
  document.getElementById('resultTitle').textContent = data.title;
  document.getElementById('resultTitle').style.color = data.color;
  document.getElementById('resultDesc').textContent = data.desc;

  // Score ring animation
  document.getElementById('scoreNum').textContent = score;
  const pct = score / QUESTIONS.length;
  const circle = document.getElementById('scoreCircle');
  circle.style.stroke = data.color;
  setTimeout(() => {
    circle.style.transition = 'stroke-dashoffset 1.2s ease';
    circle.style.strokeDashoffset = 314 - (314 * pct);
  }, 200);

  // Roadmap
  const rwWrap = document.getElementById('roadmapWeeks');
  rwWrap.innerHTML = '';
  data.roadmap.forEach((w, i) => {
    const el = document.createElement('div');
    el.className = 'rw-card';
    el.style.animationDelay = `${i * 0.1}s`;
    el.innerHTML = `
      <div class="rw-week" style="border-color:${data.color}40;color:${data.color}">${w.week}</div>
      <div class="rw-content"><h4>${w.title}</h4><p>${w.text}</p></div>
    `;
    rwWrap.appendChild(el);
  });

  // Resources
  const rg = document.getElementById('resGrid');
  rg.innerHTML = '';
  data.resources.forEach(r => {
    const el = document.createElement('div');
    el.className = 'res-card';
    el.innerHTML = `
      <div class="res-card-top">
        <span class="res-icon">${r.icon}</span>
        <span class="res-cat">${r.cat}</span>
      </div>
      <h4>${r.title}</h4>
      <p>${r.desc}</p>
      <a href="${r.link}" target="_blank" rel="noopener" class="res-link">Accéder →</a>
    `;
    rg.appendChild(el);
  });

  resultCont.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('btnRetry').addEventListener('click', () => {
  resultCont.style.display = 'none';
  quizIntro.style.display  = 'block';
  document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
});

startBtn.addEventListener('click', () => {
  startQuiz();
  document.getElementById('quizContainer').scrollIntoView({ behavior: 'smooth' });
});

/* ══ NAVBAR QUIZ BUTTON SCROLL ══ */
document.querySelectorAll('.nav-quiz, .btn-quiz-hero, .mob-quiz').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
  });
});