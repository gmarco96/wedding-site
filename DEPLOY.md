# Pubblicazione del sito

Il sito è completamente statico (HTML/CSS/JS), quindi l'hosting su **GitHub Pages** è **gratuito**.
L'unico costo è il dominio `.it` (facoltativo): circa 5–10 € l'anno (non esistono `.it` gratuiti).

La pubblicazione avviene tramite GitHub Actions (`.github/workflows/pages.yml`): a ogni `git push`
su `main` vengono pubblicati solo `index.html`, `assets/` e `images/`.

## 1. Attivare GitHub Pages (una volta sola)

1. Con il piano GitHub gratuito il repository deve essere **pubblico**:
   **Settings → General → Danger Zone → Change visibility → Public**.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Fai un push su `main` (oppure **Actions → Deploy to GitHub Pages → Run workflow**).
4. Quando il workflow è verde, il sito è online su <https://gmarco96.github.io/wedding-site/>.

## 2. Dominio `.it` (facoltativo)

Nomi liberi al 30/10/2026 (verificati su whois.nic.it):
`claudiamarco.it`, `claudiaemarco2027.it`, `claudiaemarcosposi.it`, `matrimonioclaudiamarco.it`
(`claudiaemarco.it` è già registrato).

1. Registra il dominio presso un registrar che permette di modificare i DNS
   (es. Register.it, Aruba, OVH).
2. Nel pannello DNS del registrar crea questi record:

   | Tipo  | Nome  | Valore               |
   |-------|-------|----------------------|
   | A     | `@`   | `185.199.108.153`    |
   | A     | `@`   | `185.199.109.153`    |
   | A     | `@`   | `185.199.110.153`    |
   | A     | `@`   | `185.199.111.153`    |
   | CNAME | `www` | `gmarco96.github.io` |

3. Su GitHub: **Settings → Pages → Custom domain** → inserisci il dominio → **Save**.
4. Dopo la propagazione DNS (da pochi minuti a qualche ora) spunta **Enforce HTTPS**
   (certificato gratuito emesso da GitHub).

## Test in locale

```bash
python -m http.server 8123
```

poi apri <http://localhost:8123>.
