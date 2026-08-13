# Resolution Desk — Live Deployment Guide (by Surti)

Is folder mein 2 cheezein hain:
- `index.html`  → poora tool (frontend)
- `api/generate.js` → chhota secure proxy jo aapki API key ko chhupa kar rakhta hai

GitHub Pages akela kaafi NAHI hai (wahan key mehfooz nahi rakhi ja sakti). Isliye hum
**GitHub (code) + Vercel (free live link + proxy)** use karenge. Poora setup ~10 minute.

---

## Aap ko kya chahiye
1. Ek **GitHub** account (free) — https://github.com
2. Ek **Vercel** account (free) — https://vercel.com  (GitHub se sign-in kar lena)
3. Ek **Anthropic API key** — https://console.anthropic.com
   - Ye aapke claude.ai subscription se ALAG hai aur per-use paid hai (bahut sasta).
   - Console → **Billing** mein thoda credit add karein (jaise $5).
   - Console → **API Keys → Create Key** → key copy kar lein (ek hi dafa dikhti hai).

---

## Steps

### 1) Code GitHub par daalein
- GitHub par jaake **New repository** banayein (naam koi bhi, e.g. `resolution-desk`), Public/Private dono theek.
- **Add file → Upload files** se ye folder ki files upload karein — dhyan rahe structure yahi ho:
  ```
  index.html
  api/generate.js
  ```
  (yani `generate.js` ek `api` naam ke folder ke andar ho)
- **Commit changes**.

### 2) Vercel par deploy karein
- Vercel.com → **Add New… → Project** → apna GitHub repo **Import** karein.
- Kuch settings chhedne ki zaroorat nahi — seedha **Deploy** daba dein.

### 3) API key add karein (sab se zaroori)
- Vercel mein apne project → **Settings → Environment Variables**.
- Add karein:
  - **Name:** `ANTHROPIC_API_KEY`  → **Value:** apni Anthropic key paste karein.
  - (recommended) **Name:** `ACCESS_CODE` → **Value:** koi bhi apna password (jaise `surti123`).
- Save karke **Deployments → (latest) → Redeploy** dabayein taake key lag jaye.

### 4) Ho gaya 🎉
- Aap ko ek link milega jaise: `https://resolution-desk-xxxx.vercel.app`
- Ye link kisi bhi system/phone par khol kar use kar sakte hain.

---

## ACCESS_CODE kyun zaroori hai
Link public hota hai. Agar aap `ACCESS_CODE` set kar dein, to tool sirf tab kaam karega jab
koi wahi code (tool mein upar "Access code" box) daale. Isse koi ajnabi aap ke API credits
kharch nahi kar sakta. Aap khud ek dafa code daal dein, browser use yaad rakh lega.

## Kharcha (roughly)
Model `claude-sonnet-5` (~$2 per million input / $10 per million output tokens).
Ek reply ya translation chand cents ka bhi nahi hota. Screenshot images thodi ziyada
input leti hain, phir bhi bahut sasta. Halaanki: hamesha Console → Billing mein ek
**spend limit** laga lein — ehtiyaat behtar hai.

## Model sasta/behtar karna ho to
`api/generate.js` mein `"claude-sonnet-5"` ko badal sakte hain:
- `"claude-haiku-4-5-20251001"` → sab se sasta ($1/$5)
- `"claude-sonnet-5"` → behtareen balance (default)

Badalne ke baad GitHub par file update karein → Vercel khud dobara deploy kar dega.

---

Developed by **Surti**.
