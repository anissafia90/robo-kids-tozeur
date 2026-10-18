# Robo Kids Tozeur - site web

Site vitrine du club de robotique Robo Kids Tozeur (Tozeur, Tunisie).
HTML5, CSS3 et JavaScript natif uniquement. Aucun outil de build, aucun serveur, aucune base de données.

## 1. Ouvrir le site

Double-cliquez sur `index.html`. Le site fonctionne directement dans le navigateur, même sans Internet
(les polices Google se chargent si Internet est disponible, sinon des polices système sont utilisées).

Pour un aperçu plus proche de la réalité (facultatif) :

```
cd robo-kids-tozeur
python3 -m http.server 8000
```
puis ouvrez http://localhost:8000

## 2. Structure

```
index.html          contenu et textes du site
css/style.css       styles (couleurs et polices dans les variables :root, en haut)
js/main.js          comportement + CONFIG (contacts) + PROJECTS (projets)
assets/images/      favicon.svg, og-cover.png (aperçu pour les réseaux sociaux), vos futures photos
README.md           ce fichier
```

## 3. Ce que vous devez compléter avant la mise en ligne

| À faire | Où | Détail |
|---|---|---|
| Adresse e-mail officielle | `js/main.js`, `CONFIG.email` | Laisser vide tant qu'elle n'est pas confirmée. |
| Numéro WhatsApp officiel | `js/main.js`, `CONFIG.whatsapp` | Chiffres seulement, format international, ex. `216XXXXXXXX` (sans + ni espaces). |
| Facebook / Instagram | `js/main.js`, `CONFIG.facebook`, `CONFIG.instagram` | Adresse complète commençant par `https://`. |
| Adresse du site | `index.html`, balises `canonical`, `og:url`, `og:image` | Remplacer `https://VOTRE-SITE.example/` par l'adresse réelle. |
| Image de partage | `assets/images/og-cover.png` | Image de 1200 x 630 px. Remplacez-la par votre visuel. |

Tant qu'une valeur de `CONFIG` est vide, le site affiche « Bientôt disponible » à la place du lien et
désactive le bouton correspondant du formulaire. Aucun lien mort n'est affiché.

## 4. Modifier le contenu

- **Textes** : modifiez-les directement dans `index.html` (chaque section a un `id` : `accueil`, `club`, `activites`, `demarche`, `projets`, `pourquoi`, `parents`, `inscription`, `contact`).
- **Statut d'une activité** : dans la section Activités, changez le texte de `<span class="status status-planned">Au programme</span>` (par exemple « En cours »).
- **Couleurs et polices** : variables au début de `css/style.css` (`--navy-900`, `--blue-500`, `--cyan-400`, `--accent`, `--font-head`, `--font-body`).
- **Ajouter un vrai projet d'élève** : dans `js/main.js`, copiez un bloc de `PROJECTS.ideas`, collez-le dans `PROJECTS.done`, mettez `status: 'done'`, puis ajoutez une photo :
  ```js
  {
    title: 'Notre feu tricolore',
    status: 'done',
    summary: 'Description courte, vraie et précise.',
    skills: ['...'], parts: ['...'],
    image: { src: 'assets/images/feu-tricolore.jpg', alt: 'Description de la photo' }
  }
  ```
  Tant que `done` est vide, un message d'attente honnête est affiché. N'ajoutez que de vrais projets, et des photos d'enfants uniquement avec l'accord des parents.
- **Photos** : ajoutez-les dans `assets/images/`. Aucune photographie n'est incluse : le visuel du hero est une illustration originale.

## 5. Le formulaire d'inscription (important)

Il n'y a **pas de serveur**. Le formulaire vérifie les champs, puis affiche le message prêt à envoyer,
sans rien envoyer ni enregistrer. Un bandeau « Mode démonstration » l'explique au visiteur.

Alternatives qui fonctionnent :
- **Copier le message** : toujours disponible.
- **E-mail pré-rempli** et **WhatsApp pré-rempli** : s'activent seulement quand `CONFIG.email` / `CONFIG.whatsapp` sont renseignés.

Pour recevoir de vrais messages plus tard, il faudra relier le formulaire à un service (par exemple Netlify Forms,
Formspree ou Google Forms) puis modifier le texte du bandeau et du bouton. Tant que ce n'est pas fait, ne retirez pas l'avertissement.

## 6. Publier gratuitement

### GitHub Pages
1. Créez un dépôt GitHub et envoyez-y tout le contenu du dossier (`index.html` à la racine).
2. Dépôt > Settings > Pages > Source : branche `main`, dossier `/ (root)` > Save.
3. Après environ une minute, le site est disponible sur `https://VOTRE-COMPTE.github.io/NOM-DU-DEPOT/`.
4. Mettez cette adresse dans les balises `canonical` et `og:` de `index.html`.

### Netlify
1. Sur netlify.com : Add new site > Deploy manually.
2. Glissez-déposez le dossier du site. Le site est publié immédiatement sur une adresse `.netlify.app`.
3. Pour mettre à jour, glissez le dossier de nouveau.

## 7. Accessibilité et préparation de l'arabe

- Lien d'évitement, navigation clavier, focus visible, menu mobile accessible, formulaire avec étiquettes et messages d'erreur liés aux champs.
- Les animations respectent `prefers-reduced-motion`.
- Les marges utilisent des propriétés logiques et le CSS contient une base `[dir="rtl"]` : pour une future version arabe, créez une copie avec `<html lang="ar" dir="rtl">` et traduisez les textes.

## 8. Ce qui n'a pas été inventé

Aucun contact, tarif, horaire, âge minimum, statistique, témoignage, photo d'élève, partenariat ou récompense.
Les projets affichés sont des exemples ou des projets en préparation, et sont étiquetés comme tels.
