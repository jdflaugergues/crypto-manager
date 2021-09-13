# Crypto Manager

Application d'alerte sur les cours des cryptomonnaies pour savoir quand vendre et quand acheter

## Base de données
- Lancer le service MongoDB `sudo systemctl start mongod`
- L'URI de la base se trouve dans le fichier de conf `./config/development.yaml`
- L'interface de la base est accessible via MongoDB Compass

## Service d'envoi d'email
Le service utilise le module *Nodemailer* et passe par google.
Pour définir la clé : 
 - Aller sur https://myaccount.google.com/
 - Sélectionner Sécurity
 - Dans la section *Signing in to Google*, sélectionner *App passwords* (s'authentifier avec son compte Goolge)
 - Sélectionner l'application *Mail* et le device *Other* et cliquer sur *Generate*
 - Le mot de passe généré est celui a utiliser dans la configuration de nodemailer (`auth.pass`)
 
 ```
// Exemple
nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xxx@gmail.com',
    pass: 'mot de passe généré'
  }
})
 ```
 
Source : https://support.google.com/accounts/answer/185833?p=InvalidSecondFactor&visit_id=637667345551110382-653881859&rd=1

