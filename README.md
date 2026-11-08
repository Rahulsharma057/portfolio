# Rahul Sharma — Portfolio Website

Fully dynamic portfolio: Next.js + Material UI frontend, Node/Express + MongoDB backend,
JWT admin login, Cloudinary image uploads, dark/light mode, aur teen language
(English / हिन्दी / Hinglish) — default English.

Website ka saara content database se aata hai — koi text ya image code me hardcode nahi hai.
Admin panel se change karo, site turant update ho jati hai. Dobara deploy karne ki zarurat nahi.

```
portfolio/
├── backend/     Node + Express + MongoDB  (port 5000)
└── frontend/    Next.js + Material UI     (port 3000)
```

---

## Setup — 10 minute me

### Step 1 — MongoDB Atlas (free)

1. https://cloud.mongodb.com pe account banao
2. Free M0 cluster create karo
3. **Database Access** → naya user banao (username + password yaad rakho)
4. **Network Access** → Add IP → `0.0.0.0/0` (Allow from anywhere)
5. **Connect** → Drivers → connection string copy karo

### Step 2 — Cloudinary (free)

1. https://cloudinary.com pe signup karo
2. Dashboard se copy karo: **Cloud Name**, **API Key**, **API Secret**

### Step 3 — Backend chalao

```bash
cd backend
npm install
cp .env.example .env
```

Ab `.env` kholo aur apni values bharo:

```
MONGO_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/portfolio
JWT_SECRET=koi_lamba_random_string_kam_se_kam_32_character
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ADMIN_EMAIL=rahulsharma101102@gmail.com
ADMIN_PASSWORD=apna_password
```

Database me starting data daalo (admin user + aapki skills, experience, education, projects):

```bash
npm run seed
npm run dev
```

Browser me `http://localhost:5000` kholo — `{"success": true, ...}` dikhna chahiye.

### Step 4 — Frontend chalao

Naya terminal kholo:

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

`http://localhost:3000` — website chal padi.

### Step 5 — Login karo

`http://localhost:3000/login` → jo `ADMIN_EMAIL` aur `ADMIN_PASSWORD` `.env` me daala tha, wahi.

---

## Admin panel

| URL | Kya kar sakte ho |
|---|---|
| `/admin` | Dashboard — counts aur unread messages |
| `/admin/profile` | Naam, title, bio, **hero background image**, resume link, socials, stats |
| `/admin/skills` | Skills add/edit/delete, category ke saath |
| `/admin/experience` | Job experience, bullet points |
| `/admin/education` | BCA, LL.B |
| `/admin/projects` | Projects, cover image, tech stack, featured toggle, NDA badge |
| `/admin/certificates` | Certificates, images, download links |
| `/admin/messages` | Contact form ke messages, read mark, reply |

---

## Pehle din ke kaam

1. **Resume daalo** — apni PDF ko `frontend/public/resume.pdf` naam se rakho
2. **Hero background** — `/admin/profile` se image upload karo (ya `frontend/public/images/hero-fallback.jpg` rakho)
3. **GitHub link** — `/admin/profile` → Social links me apna actual GitHub URL daalo
4. **Projects** — seed me 2 placeholder projects hain, unko apne actual projects se replace karo
5. **Project images** — har project ka screenshot upload karo
6. **NDA check** — STAQO aur client ke projects pe "Under NDA" badge laga hua hai. Agar company se permission mil jaye to `/admin/projects` se off kar dena
7. **Project links** — `/admin/projects` se har project ka `liveUrl` aur `githubUrl` daalo. Jahan demo hai wahan demo login credentials bhi
8. **Hero image adjust** — image upload karne ke baad neeche wale tool se mobile ka focal point set karo, warna phone pe image ka galat hissa dikhega
9. **Translations** — seed me Profile, pehla project aur STAQO experience ki Hindi/Hinglish already bhari hui hai. Baaki entries ke liye admin panel ke Translations tab use karo

---

## Fonts

Fonts npm package se self-hosted hain (`@fontsource`), Google ke server se nahi. Do wajah:

**1. Build network pe depend nahi karta.** `next/font/google` build ke time Google se font
download karta hai. Network slow ho, firewall block kare, ya CI me internet na ho - poora
build fail ho jata hai. Self-hosted font ke saath aisa kabhi nahi hota.

**2. Inter me Devanagari glyphs nahi hain.** Hindi text Inter me render ho hi nahi sakta -
browser kisi bhi random fallback font pe chala jata hai, isliye Hindi page ka font alag
aur bhadda lagta hai. Isliye **Noto Sans Devanagari** alag se load hota hai.

Font stack ek hi jagah hai — `src/theme/fonts.js`:

```js
'"Inter", "Noto Sans Devanagari", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
```

Browser har character ke liye apne aap sahi font chunta hai: Latin letters Inter se,
Devanagari Noto Sans Devanagari se. Aur Devanagari font **sirf tab download hota hai jab
page pe Hindi text ho** — English visitors ko uska weight nahi uthana padta.

Font badalna ho to: `npm i @fontsource/<font-name>`, phir `src/theme/fonts.js` me import
aur `FONT_STACK` update kar do. Baaki kahin change karne ki zarurat nahi.


---

## Languages — English, Hindi, Hinglish

Site teen language me chalti hai. **Default English hai** — naya visitor hamesha English dekhega.
Navbar me translate icon se switch hota hai, choice `localStorage` me save hoti hai,
aur refresh ke baad bhi yaad rehti hai.

### Do tarah ka text, do tarah se translate

**1. UI labels** (buttons, headings, form labels, error messages) — `frontend/src/i18n/translations.js`
me teeno language ke dictionaries hain. Naya text add karna ho to teeno me add karo.
Koi key miss ho jaye to English fallback apne aap chal jata hai.

```js
// component me aise use hota hai
const { t, lang } = useTranslation();
<Button>{t("hero.viewProjects")}</Button>
<Typography>{t("about.title", { name: "Rahul Sharma" })}</Typography>
```

**2. Aapka content** (bio, project description, experience points) — yeh database me hai,
isliye admin panel se translate hota hai. Har document me ek optional `translations` object hai:

```js
{
  shortBio: "English text here",           // main field - HAMESHA English
  translations: {
    hi:       { shortBio: "हिंदी text" },
    hinglish: { shortBio: "Hinglish text" }
  }
}
```

> **Rule:** main fields me hamesha **English** likhna, kyunki default language English hai.
> Hindi aur Hinglish sirf `translations` ke andar. Agar main field me Hinglish likh doge
> to English visitor ko bhi Hinglish hi dikhegi.

Admin panel me har form ke neeche **"Translations"** section hai, jisme Hindi aur Hinglish
ke tabs hain. Khali chhod do to website pe English dikhegi — kuch toot-ta nahi.

Jin cheezon ka translation support hai: Profile (naam, title, tagline, bio, stats),
Projects, Experience, Education, Certificates.
Skills ke naam translate nahi hote, kyunki React aur Node.js har language me same hi likhe jate hain.

### Naya language add karna ho to

1. `src/i18n/translations.js` me `LANGUAGES` array me entry add karo
2. Usi file me uska dictionary object banao
3. `dictionaries` export me add kar do

Bas. Switcher aur admin ke translation tabs apne aap us language ko dikhane lagenge.

---

## Home page ki background image — mobile pe adjust karna

Yeh sabse common problem hai: `background-size: cover` image ko crop karta hai.
Desktop frame chauda hota hai, mobile frame tall — isliye ek hi position dono pe sahi
nahi baithti. Aksar mobile pe chehra ya main subject kat jata hai.

**Admin panel → Profile → Home page background image** me iska tool hai:

| Control | Kya karta hai |
|---|---|
| Mobile / Desktop toggle | Kaunse device ke liye set kar rahe ho |
| Image pe click | Wahi point frame ke beech me aa jata hai (focal point) |
| Live preview | Desktop (16:9) aur mobile (390px) dono side by side, turant update |
| Overlay slider | Image ke upar ki perdah — 80–85% zyadatar photos pe theek. Iske bina text padha nahi jata |
| Blur slider | Busy photo ho to 2–4px blur text ko alag dikhata hai |

Database me yeh fields save hoti hain: `heroFocus`, `heroFocusMobile`, `heroOverlay`, `heroBlur`.
Hero component inhi se `background-position` set karta hai:

```js
backgroundPosition: {
  xs: `${fm.x}% ${fm.y}%`,   // mobile
  md: `${fd.x}% ${fd.y}%`,   // desktop
}
```

**Tip:** mobile ke liye focal point thoda upar rakho (y around 30–40%), kyunki tall frame me
image ka neeche wala hissa aksar kat jata hai.

---

## Project links aur demo login

Har project card pe teen cheezein aa sakti hain — jo bhari hui hoti hain, wahi dikhti hain:

| Button | Kab dikhta hai | Kya karta hai |
|---|---|---|
| **Live demo** | `liveUrl` bhara ho | Deploy ki hui site naye tab me kholta hai |
| **Code** | `githubUrl` bhara ho | GitHub repo kholta hai |
| **Demo login** | kam se kam ek credential ho | Dialog kholta hai jisme har role ke test accounts hain |

Card pe ek **"Live"** chip bhi apne aap lag jata hai jab `liveUrl` set ho — scroll karte waqt
turant pata chal jata hai ki kaunse projects try kiye ja sakte hain.

### Demo login kyun zaroori hai

Recruiter live demo kholta hai, login screen dekhta hai, aur wapas chala jata hai —
kyunki uske paas account nahi hota. **Demo login** button isi ko solve karta hai:
har role (Super Admin / Admin / Manager / User / Guest) ka email aur password,
copy button ke saath, aur "Open live demo" ka direct link.

Admin panel → Projects → koi project edit karo → **Demo login credentials** me
"Add role" se jitne chaho roles add karo. Har role me optional note bhi hai
(jaise "poora access" ya "read-only"), jo dialog me dikhta hai.

`Demo note` field alag hai — woh dialog me upar dikhta hai, poore demo ke baare me.
Jaise: "Data har raat reset ho jata hai."

> **SIRF demo accounts.** Yahan jo credentials daloge woh website pe sabko dikhenge.
> Isliye sirf aise test accounts daalo jo ek throwaway demo database pe chalte hain,
> dummy data ke saath. Kisi asli client, production system ya apne personal account
> ka login kabhi mat daalna. NDA wale projects pe credentials khali rakho — card pe
> koi button nahi aayega, sirf "Under NDA" chip dikhega.

### Copy button ka fallback

`navigator.clipboard` sirf HTTPS ya localhost pe chalta hai. Agar site plain HTTP pe ho,
ya browser permission na de, to woh chup-chaap fail ho jata hai. Isliye `src/lib/clipboard.js`
do step me kaam karta hai — pehle modern API, fail hone par purana `execCommand` wala
tareeka. Copy hua ya nahi, dono case me toast batata hai.

---

## About section ke expandable points

About section chhota rakhna zaroori hai — koi 5 paragraph nahi padhta. Isliye do toggle hain:

**1. Read more / Show less** — short bio hamesha dikhti hai, long bio band rehti hai.
Jisko aur padhna hai woh button dabata hai.

**2. Chhote expandable points** — "Law + tech ka combination kyun", "Main kaise kaam karta hoon",
"Abhi kya seekh raha hoon" jaise points. Band rehte hain, click pe khulte hain, aur ek waqt
me ek hi khula rehta hai.

Admin panel → Profile → **About ke expandable points** se add/edit/reorder kar sakte ho
(upar-neeche arrows se order badalta hai). Hindi aur Hinglish translation bhi support hai.

Band accordion ka content DOM me hota hi nahi (`unmountOnExit`), isliye page halka rehta hai
aur chhupa hua text Ctrl+F me nahi aata.


---

## Notifications — react-toastify

Saare success aur error messages toast me dikhte hain. Theme ke saath match karte hain —
dark mode me dark toast, light mode me light.

Sab kuch ek hi wrapper se jata hai (`src/lib/toast.js`), taaki style aur duration
ek jagah se control ho:

```js
import toast from "@/lib/toast";

toast.success("Project add ho gaya");
toast.error("Kuch galat ho gaya");
toast.info("...");
toast.warn("...");
```

`<ToastContainer>` `ThemeRegistry` ke andar hai (`src/components/ui/Toaster.jsx`),
isliye theme badalne pe toast ka look bhi badal jata hai.

**Dhyan dene wali baat:** form ki field-level validation errors toast me nahi jate —
woh field ke neeche hi dikhte hain, kyunki wahan user ko pata hona chahiye ki *kaunsi*
field galat hai. Toast sirf overall result ke liye hai (bhej diya / fail ho gaya).


---

## Deployment

### Backend → Render.com (free)

1. Code GitHub pe push karo
2. Render → New → Web Service → repo connect karo
3. **Root Directory:** `backend`
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. Environment me `.env` ki saari values add karo
7. Deploy ke baad live URL milega, jaise `https://xyz.onrender.com`

### Frontend → Vercel (free)

1. Vercel → New Project → wahi repo
2. **Root Directory:** `frontend`
3. Environment Variable: `NEXT_PUBLIC_API_URL` = `https://xyz.onrender.com/api/v1`
4. Deploy

### Deploy ke baad do cheezein zaroor badalni hain

1. Render ke env me `CLIENT_URL` = Vercel ka live URL
   **Yeh nahi kiya to CORS error aayega aur koi API call nahi chalegi.**
2. Vercel ke env me `NEXT_PUBLIC_API_URL` = Render ka URL + `/api/v1`

> **Render free tier:** 15 minute idle rehne pe server so jata hai, phir pehli request me
> 30–50 second lagte hain. Interview se pehle site ek baar khol lena taaki server jaga rahe.

---

## Tech stack

**Backend:** Express 4, Mongoose 8, JWT, bcryptjs, Multer 2, Cloudinary 2
**Frontend:** Next.js 14 (App Router), Material UI 5, Axios, react-toastify, Fontsource (self-hosted fonts)

Animation ke liye koi library nahi hai — fade-in `IntersectionObserver` se hota hai,
theme toggle MUI ke apne theming se, aur i18n ek chhote custom context se (next-intl
jaisi library ki zarurat nahi padi). Jitni kam dependency, utne kam bugs.

---

## Project structure

```
backend/src/
├── config/       db.js, cloudinary.js
├── models/       8 collections
├── controllers/  business logic
├── routes/       URL → controller
├── middleware/   auth, upload, error handling
├── utils/        token, slug, crudFactory
├── seed/         pehli baar ka data
├── app.js        Express app
└── server.js     entry point

frontend/src/
├── app/          pages (App Router)
├── components/   layout, sections, ui, admin
├── i18n/         teeno language ke dictionaries + context
├── theme/        dark/light theme
├── context/      AuthContext
├── lib/          axios, serverApi, format
└── hooks/        useCrud
```

### Backend ka pattern

Route sirf **bulata** hai, controller **karta** hai, model **batata** hai ki data kaisa dikhega.
Teeno ka kaam mix mat karna.

Zyadatar controllers `utils/crudFactory.js` se bante hain — ek hi jagah getAll, getOne,
create, update aur delete ka logic hai, saath me Cloudinary cleanup. Isliye naya section
add karna ho to sirf model + 3 line ka controller + route chahiye.

### Admin panel ka pattern

Saare list pages ek hi `components/admin/CrudPage.jsx` se bante hain. Har page bas
columns aur fields ka config deta hai — isliye `/admin/skills` sirf 30 line ka hai.

---

## Jo cheezein toot sakti hain (aur pehle se theek kar di gayi hain)

| Problem | Kahan handle hua |
|---|---|
| `/projects/featured` ko `/:slug` samajh lena | `project.routes.js` me featured pehle likha hai |
| Cloudinary images blank | `next.config.mjs` me `res.cloudinary.com` allow kiya hai |
| `public_id` me `/` se URL tootna | frontend `---` bhejta hai, backend wapas badalta hai |
| Theme toggle pe hydration mismatch | `ColorModeContext` pehle render ke baad mode set karta hai |
| Server component se theme function pass karna | `Hero.jsx` client component hai (comment me likha hai kyun) |
| `/projects/galat-slug` pe 200 aana | root `loading.js` nahi rakhi, isliye proper 404 aata hai |
| Delete pe Cloudinary storage bharna | `crudFactory` delete pe images bhi hataata hai |
| iOS pe background image atakna | mobile pe `backgroundAttachment: scroll` |
| Mobile pe horizontal scroll | `globals.css` me `overflow-x: hidden` |
| Card ke andar button se link trigger hona | Buttons `CardActionArea` ke BAAHAR `CardActions` me hain - `<a>` ke andar `<a>` nest nahi hota |
| Copy button HTTP pe fail hona | `lib/clipboard.js` me `execCommand` fallback |
| Hindi text ka font bhadda dikhna | Noto Sans Devanagari alag se load hota hai - Inter me Devanagari glyphs hi nahi hain |
| Google Fonts down/block hone pe build fail | Fonts self-hosted hain (`@fontsource`), build ke waqt koi network call nahi |
| Language badalne pe hydration mismatch | `LanguageProvider` default English se shuru hota hai, localStorage pehle render ke BAAD padhta hai |
| Hero image mobile pe galat crop | Alag `heroFocusMobile` focal point, admin panel se set hota hai |
| Translation missing hone pe khali page | `t()` aur `localized()` dono English pe fallback karte hain |

---

## Security

- **Register endpoint nahi hai.** Admin sirf `npm run seed` se banta hai. Public register
  route hota to koi bhi account banakar aapka data edit kar sakta tha.
- `.env` `.gitignore` me hai — GitHub pe kabhi push mat karna.
- Password bcrypt se hash hota hai, kabhi plain text me store nahi hota.
- Saare write endpoints JWT se protected hain.
- Deploy karne ke baad `/admin` se password badal lena.

---

## Commands

```bash
# backend
npm run dev     # nodemon ke saath
npm start       # production
npm run seed    # database reset + starting data

# frontend
npm run dev     # development
npm run build   # production build
npm start       # built version chalao
npm run lint
```
