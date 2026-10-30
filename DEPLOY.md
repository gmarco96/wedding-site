# Pubblicazione del sito

Il sito è completamente statico (HTML/CSS/JS), quindi l'hosting è **gratuito** su Netlify.
L'unico costo è il dominio `.it`: circa 5–10 € l'anno (non esistono `.it` gratuiti).

## 1. Hosting gratuito su Netlify

1. Accedi a <https://app.netlify.com> con l'account GitHub.
2. **Add new site → Import an existing project → GitHub** → scegli `gmarco96/wedding-site`.
3. Lascia le impostazioni lette da `netlify.toml` (build command e cartella `public`) → **Deploy**.
4. Il sito è online su `https://<nome>.netlify.app`. Ogni `git push` su `main` lo ripubblica.

## 2. Dominio `.it`

Nomi liberi al 30/10/2026 (verificati su whois.nic.it):
`claudiamarco.it`, `claudiaemarco2027.it`, `claudiaemarcosposi.it`, `matrimonioclaudiamarco.it`
(`claudiaemarco.it` è già registrato).

1. Registra il dominio presso un registrar che permette di modificare i DNS
   (es. Register.it, Aruba, OVH, Regery, Cloudean).
2. Su Netlify: **Site configuration → Domain management → Add a domain** → inserisci il dominio.
3. Nel pannello DNS del registrar crea questi record:

   | Tipo  | Nome  | Valore                     |
   |-------|-------|----------------------------|
   | A     | `@`   | `75.2.60.5`                |
   | CNAME | `www` | `<nome>.netlify.app`       |

   In alternativa usa i nameserver Netlify (Netlify DNS, gratuito) indicati nel pannello.
4. Dopo la propagazione DNS (da pochi minuti a qualche ora), Netlify attiva da solo il
   certificato HTTPS gratuito (Let's Encrypt).

## Test in locale

```bash
python -m http.server 8123
```

poi apri <http://localhost:8123>.
