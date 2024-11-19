import { createI18n } from 'vue-i18n'

// Messages de traduction
const messages = {
  fr: {
    message: {
      hello: 'Bonjour!',
      welcome: 'Bienvenue {name}',
      nav: {
        home: 'Accueil',
        about: 'À propos',
        contact: 'Contact'
      }
    }
  },
  en: {
    message: {
      hello: 'Hello!',
      welcome: 'Welcome {name}',
      nav: {
        home: 'Home',
        about: 'About',
        contact: 'Contact'
      }
    }
  }
}

// Créer l'instance i18n
export const i18n = createI18n({
  legacy: false, // Vous permet d'utiliser la Composition API
  locale: 'fr', // Langue par défaut
  fallbackLocale: 'en', // Langue de secours
  messages,
})