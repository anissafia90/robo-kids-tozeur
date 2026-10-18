/* =========================================================
   Robo Kids Tozeur - comportement du site
   À MODIFIER PAR LE CLUB : sections CONFIG et PROJECTS ci-dessous.
   ========================================================= */
"use strict";

/* ---------- 1. COORDONNÉES DU CLUB (à remplir quand elles sont vérifiées) ----------
   Laissez une valeur vide ('') tant que l'information n'est pas confirmée :
   le site affichera "Bientôt disponible" et désactivera le bouton correspondant.
   - email     : adresse e-mail officielle, ex. 'contact@mon-domaine.tn'
   - whatsapp  : numéro au format international, chiffres seulement, sans + ni espaces
   - facebook / instagram : adresse complète de la page, commençant par https://
*/
const CONFIG = {
  email: "safiaibtihel86@gmail.com",
  whatsapp: "",
  facebook: "",
  instagram: "",
};

/* ---------- 2. PROJETS ----------
   done  : vrais projets terminés par les élèves (liste vide = message d'attente affiché)
   ideas : exemples et projets en préparation
   Chaque projet :
   { title, status ('example' | 'prep' | 'done'), summary, skills: [...], parts: [...],
     image: { src: 'assets/images/mon-projet.jpg', alt: 'Description de la photo' }  (optionnel),
     link:  { href: 'https://...', label: 'Voir la vidéo' }                          (optionnel) }
   Pour publier un vrai projet : copiez un bloc, mettez status: 'done' et placez-le dans "done".
*/
const PROJECTS = {
  done: [],
  ideas: [
    {
      title: "Feu tricolore Arduino",
      status: "example",
      summary:
        "Trois LED (rouge, orange, verte) qui s’allument dans le bon ordre, comme un vrai feu. Variante possible : un bouton pour les piétons.",
      skills: [
        "Câbler des LED avec leurs résistances",
        "Écrire une séquence dans un programme",
        "Ajouter un bouton qui change le comportement",
      ],
      parts: [
        "Carte Arduino",
        "3 LED",
        "3 résistances",
        "Platine d’essai",
        "Un bouton (variante)",
      ],
    },
    {
      title: "Lampe sensible à la lumière",
      status: "example",
      summary:
        "Une lampe qui s’allume toute seule quand la pièce devient sombre.",
      skills: [
        "Lire un capteur de lumière",
        "Comparer une mesure à un seuil",
        "Allumer une LED selon une condition",
      ],
      parts: [
        "Carte Arduino",
        "Capteur de lumière",
        "LED et résistance",
        "Platine d’essai",
      ],
    },
    {
      title: "Barrière de parking intelligente",
      status: "prep",
      summary:
        "Un capteur de distance repère une petite voiture : la barrière s’ouvre et le feu passe au vert. Projet de fin de cycle envisagé, selon le matériel disponible.",
      skills: [
        "Mesurer une distance avec un capteur",
        "Commander un petit moteur (servomoteur)",
        "Combiner capteur, lumières et mouvement",
      ],
      parts: [
        "Capteur de distance à ultrasons",
        "Servomoteur",
        "3 LED et résistances",
        "Carton pour la barrière",
      ],
    },
  ],
};

const STATUS_LABELS = {
  example: "Exemple de projet",
  prep: "En préparation",
  done: "Terminé",
};

/* ---------- Outils ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const phoneDigits = (v) => v.replace(/[\s.\-()]/g, "").replace(/^\+/, "");
const isPhone = (v) =>
  /^\d{8,15}$/.test(phoneDigits(v)) && /^[+\d\s.\-()]+$/.test(v);
const configEmailOk = () => isEmail(CONFIG.email);
const configWhatsappOk = () => /^\d{8,15}$/.test(CONFIG.whatsapp);
const configUrlOk = (v) => /^https:\/\/\S+$/.test(v);

/* ---------- Année du pied de page ---------- */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Menu mobile ---------- */
(function initMenu() {
  const btn = $(".menu-toggle");
  const nav = $("#menu");
  if (!btn || !nav) return;
  const setOpen = (open, returnFocus) => {
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    if (!open && returnFocus) btn.focus();
  };
  btn.addEventListener("click", () =>
    setOpen(btn.getAttribute("aria-expanded") !== "true"),
  );
  $$("a", nav).forEach((a) =>
    a.addEventListener("click", () => setOpen(false)),
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true")
      setOpen(false, true);
  });
  document.addEventListener("click", (e) => {
    if (
      btn.getAttribute("aria-expanded") === "true" &&
      !nav.contains(e.target) &&
      !btn.contains(e.target)
    )
      setOpen(false);
  });
  window.matchMedia("(min-width: 62.01em)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
})();

/* ---------- Lien actif dans la navigation ---------- */
(function initScrollSpy() {
  if (!("IntersectionObserver" in window)) return;
  const links = $$(".main-nav ul a");
  const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        const link = map.get(en.target.id);
        if (!link || !en.isIntersecting) return;
        links.forEach((l) => {
          l.classList.remove("is-current");
          l.removeAttribute("aria-current");
        });
        link.classList.add("is-current");
        link.setAttribute("aria-current", "location");
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  map.forEach((_, id) => {
    const s = document.getElementById(id);
    if (s) io.observe(s);
  });
})();

/* ---------- Circuit interactif du hero ---------- */
(function initCircuit() {
  const wrap = $("#circuit"),
    btn = $("#circuit-toggle"),
    status = $("#circuit-status");
  if (!wrap || !btn || !status) return;
  btn.addEventListener("click", () => {
    const on = wrap.getAttribute("data-on") !== "true";
    wrap.setAttribute("data-on", String(on));
    btn.setAttribute("aria-pressed", String(on));
    btn.textContent = on ? "Ouvrir l’interrupteur" : "Fermer l’interrupteur";
    status.textContent = on
      ? "Circuit fermé : le courant passe, la LED est allumée."
      : "Circuit ouvert : le courant ne passe pas, la LED est éteinte.";
  });
})();

/* ---------- Coordonnées de contact ---------- */
(function initContacts() {
  const make = (href, text, external) => {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    if (external) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      const sr = document.createElement("span");
      sr.className = "visually-hidden";
      sr.textContent = " (s’ouvre dans un nouvel onglet)";
      a.appendChild(sr);
    }
    return a;
  };
  const fill = (key, ok, build) => {
    const slot = $('[data-contact="' + key + '"]');
    if (slot && ok) slot.replaceWith(build());
  };
  fill("email", configEmailOk(), () =>
    make("mailto:" + CONFIG.email, CONFIG.email, false),
  );
  fill("whatsapp", configWhatsappOk(), () =>
    make("https://wa.me/" + CONFIG.whatsapp, "Écrire sur WhatsApp", true),
  );
  fill("facebook", configUrlOk(CONFIG.facebook), () =>
    make(CONFIG.facebook, "Page Facebook", true),
  );
  fill("instagram", configUrlOk(CONFIG.instagram), () =>
    make(CONFIG.instagram, "Compte Instagram", true),
  );
})();

/* ---------- Projets ---------- */
(function renderProjects() {
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };
  const card = (p) => {
    const art = el("article", "project");
    if (p.image && p.image.src) {
      const fig = el("figure");
      const img = el("img");
      img.src = p.image.src;
      img.alt = p.image.alt || "";
      img.loading = "lazy";
      fig.appendChild(img);
      art.appendChild(fig);
    }
    art.appendChild(
      el(
        "span",
        "status status-" +
          (p.status === "prep"
            ? "prep"
            : p.status === "done"
              ? "done"
              : "example"),
        STATUS_LABELS[p.status] || "",
      ),
    );
    art.appendChild(el("h4", "", p.title));
    art.appendChild(el("p", "", p.summary));
    if ((p.skills && p.skills.length) || (p.parts && p.parts.length)) {
      const d = el("details");
      d.appendChild(el("summary", "", "Voir le principe et le matériel"));
      if (p.skills && p.skills.length) {
        d.appendChild(el("p", "", "Ce que les élèves apprennent :"));
        const ul = el("ul");
        p.skills.forEach((s) => ul.appendChild(el("li", "", s)));
        d.appendChild(ul);
      }
      if (p.parts && p.parts.length) {
        d.appendChild(el("p", "", "Matériel :"));
        const ul = el("ul");
        p.parts.forEach((s) => ul.appendChild(el("li", "", s)));
        d.appendChild(ul);
      }
      art.appendChild(d);
    }
    if (p.link && /^https?:\/\//.test(p.link.href)) {
      const a = el("a", "", p.link.label || "En savoir plus");
      a.href = p.link.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      art.appendChild(a);
    }
    return art;
  };
  const done = $("#projects-done"),
    ideas = $("#projects-ideas");
  if (done) {
    if (PROJECTS.done.length)
      PROJECTS.done.forEach((p) => done.appendChild(card(p)));
    else {
      const box = el("div", "empty-state");
      box.appendChild(
        el("h4", "", "Les premières réalisations arrivent bientôt"),
      );
      box.appendChild(
        el(
          "p",
          "",
          "Nous ne publions que de vrais projets terminés par nos élèves. Dès qu’un projet sera prêt, il apparaîtra ici avec une courte explication et des photos.",
        ),
      );
      done.appendChild(box);
    }
  }
  if (ideas) PROJECTS.ideas.forEach((p) => ideas.appendChild(card(p)));
})();

/* ---------- Formulaire d'inscription (démonstration, sans envoi) ---------- */
(function initForm() {
  const form = $("#join-form"),
    result = $("#form-result"),
    summary = $("#form-summary");
  if (!form || !result) return;
  const f = {
    name: $("#parent-name"),
    contact: $("#contact-field"),
    age: $("#child-age"),
    message: $("#message"),
    method: $$('input[name="method"]', form),
  };
  const errEl = {
    name: $("#parent-name-err"),
    contact: $("#contact-err"),
    age: $("#child-age-err"),
    method: $("#method-err"),
    message: $("#message-err"),
  };
  const methodValue = () => (f.method.find((r) => r.checked) || {}).value || "";

  const setError = (key, msg) => {
    const target = key === "method" ? f.method[0] : f[key];
    errEl[key].textContent = msg;
    errEl[key].hidden = !msg;
    if (key === "method")
      f.method.forEach((r) => r.toggleAttribute("aria-invalid", !!msg));
    else if (msg) target.setAttribute("aria-invalid", "true");
    else target.removeAttribute("aria-invalid");
  };

  const validators = {
    name() {
      const v = f.name.value.trim();
      if (!v) return "Indiquez votre nom.";
      if (v.length < 2) return "Le nom doit contenir au moins 2 caractères.";
      return "";
    },
    contact() {
      const v = f.contact.value.trim();
      if (!v) return "Indiquez un numéro de téléphone ou une adresse e-mail.";
      const mail = isEmail(v),
        tel = isPhone(v);
      if (!mail && !tel)
        return "Ce n’est ni une adresse e-mail ni un numéro de téléphone valide (8 à 15 chiffres).";
      const m = methodValue();
      if (m === "E-mail" && !mail)
        return "Vous préférez être contacté par e-mail : indiquez une adresse e-mail.";
      if ((m === "Téléphone" || m === "WhatsApp") && !tel)
        return (
          "Vous préférez être contacté par " +
          (m === "WhatsApp" ? "WhatsApp" : "téléphone") +
          " : indiquez un numéro."
        );
      return "";
    },
    age() {
      const raw = f.age.value.trim();
      if (!raw) return "Indiquez l’âge de l’enfant.";
      const n = Number(raw);
      if (!Number.isInteger(n) || n < 1 || n > 18)
        return "L’âge doit être un nombre entier entre 1 et 18.";
      return "";
    },
    method() {
      return methodValue() ? "" : "Choisissez un moyen de contact.";
    },
    message() {
      const v = f.message.value.trim();
      if (!v) return "Écrivez un court message.";
      if (v.length < 10)
        return "Le message doit contenir au moins 10 caractères.";
      return "";
    },
  };
  const order = ["name", "contact", "age", "method", "message"];

  const validateAll = () => {
    const bad = [];
    order.forEach((k) => {
      const m = validators[k]();
      setError(k, m);
      if (m) bad.push(k);
    });
    return bad;
  };
  // Revalider un champ déjà en erreur quand on le corrige
  const watch = (k, nodes) =>
    nodes.forEach((n) =>
      n.addEventListener("input", () => {
        if (!errEl[k].hidden) setError(k, validators[k]());
        if (k === "method" || k === "contact") {
          if (!errEl.contact.hidden) setError("contact", validators.contact());
        }
      }),
    );
  watch("name", [f.name]);
  watch("contact", [f.contact]);
  watch("age", [f.age]);
  watch("message", [f.message]);
  watch("method", f.method);

  const buildMessage = () =>
    [
      "Bonjour Robo Kids Tozeur,",
      "",
      "Je m’appelle " +
        f.name.value.trim() +
        ". Je souhaite inscrire mon enfant (" +
        f.age.value.trim() +
        " ans).",
      "",
      f.message.value.trim(),
      "",
      "Moyen de contact préféré : " + methodValue(),
      "Mes coordonnées : " + f.contact.value.trim(),
      "",
      "Merci.",
    ].join("\n");

  const preview = $("#message-preview"),
    mailLink = $("#mail-link"),
    waLink = $("#wa-link"),
    altStatus = $("#alt-status");
  let currentMessage = "";

  const wireAlternative = (link, ok, href, missingText) => {
    if (ok) {
      link.href = href;
      link.removeAttribute("aria-disabled");
      if (link.id === "mail-link") link.removeAttribute("target");
      else {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    } else {
      link.href = "#inscription";
      link.setAttribute("aria-disabled", "true");
    }
    link.dataset.missing = missingText;
  };
  [mailLink, waLink].forEach((l) =>
    l.addEventListener("click", (e) => {
      if (l.getAttribute("aria-disabled") === "true") {
        e.preventDefault();
        altStatus.textContent = l.dataset.missing;
      }
    }),
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const bad = validateAll();
    if (bad.length) {
      summary.textContent =
        "Le formulaire contient " +
        bad.length +
        (bad.length > 1 ? " erreurs" : " erreur") +
        ". Corrigez-" +
        (bad.length > 1 ? "les" : "la") +
        " puis relancez la vérification.";
      summary.hidden = false;
      const first = bad[0] === "method" ? f.method[0] : f[bad[0]];
      first.focus();
      return;
    }
    summary.hidden = true;
    currentMessage = buildMessage();
    preview.textContent = currentMessage;
    const subject = "Inscription : demande d’informations";
    wireAlternative(
      mailLink,
      configEmailOk(),
      "mailto:" +
        CONFIG.email +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(currentMessage),
      "L’adresse e-mail du club n’est pas encore configurée. Copiez le message ou contactez-nous via LinkedIn.",
    );
    wireAlternative(
      waLink,
      configWhatsappOk(),
      "https://wa.me/" +
        CONFIG.whatsapp +
        "?text=" +
        encodeURIComponent(currentMessage),
      "Le numéro WhatsApp du club n’est pas encore configuré. Copiez le message ou contactez-nous via LinkedIn.",
    );
    altStatus.textContent = "";
    form.hidden = true;
    result.hidden = false;
    result.focus();
  });

  $("#copy-message").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(currentMessage);
      altStatus.textContent = "Message copié. Collez-le dans votre messagerie.";
    } catch (err) {
      const range = document.createRange();
      range.selectNodeContents(preview);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      altStatus.textContent =
        "La copie automatique n’est pas disponible : le message est sélectionné, copiez-le avec votre clavier.";
    }
  });

  $("#edit-message").addEventListener("click", () => {
    result.hidden = true;
    form.hidden = false;
    f.name.focus();
  });
})();

/* ---------- Retour en haut ---------- */
(function initToTop() {
  const btn = $("#to-top");
  if (!btn) return;
  let ticking = false;
  const update = () => {
    btn.hidden = window.scrollY < 700;
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
})();
