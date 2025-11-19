import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    this.loadTranslations();
  }

  private loadTranslations() {
    // Charger les traductions françaises
    this.translate.setTranslation('fr', {
      'HEADER': {
        'LOGO': 'Boutique App',
        'HOME': 'Accueil',
        'SEARCH': 'Rechercher',
        'CART': 'Panier',
        'MY_ACCOUNT': 'Mon compte',
        'LOGIN': 'Login',
        'TOGGLE_THEME': 'Changer le thème',
        'LANGUAGE': 'Changer la langue'
      },
      'MENU': {
        'HOME': 'Accueil',
        'CATEGORIES': 'Catégories',
        'BUNDLE_SAVE': 'Bundle & Save',
        'NEWS': 'Nouveautés',
        'ABOUT_US': 'À propos de nous',
        'CONTACT': 'Contact',
        'MY_ACCOUNT': 'Mon compte'
      },
      'CATEGORIES': {
        'HOME': 'Maison',
        'TECHNOLOGY': 'Technologie',
        'DECORATION': 'Décoration',
        'SCENT': 'Parfums'
      },
      'HOME': {
        'HERO_TITLE': 'Découvrez nos produits',
        'HERO_SUBTITLE': 'Trouvez tout ce dont vous avez besoin pour votre maison avec la meilleure qualité et des prix incroyables',
        'HERO_BUTTON': 'Voir les produits',
        'PRODUCTS_TITLE': 'Nos Produits',
        'PRODUCTS_SUBTITLE': 'Explorez nos catégories et trouvez les produits parfaits pour vous',
        'ADD_TO_CART': 'Ajouter au panier'
      },
      'AUTH': {
        'LOGIN_TITLE': 'Connexion',
        'LOGIN_SUBTITLE': 'Accédez à votre compte pour continuer',
        'REGISTER_TITLE': 'Créer un compte',
        'REGISTER_SUBTITLE': 'Rejoignez-nous et découvrez des produits incroyables',
        'NAME': 'Nom complet',
        'EMAIL': 'Adresse e-mail',
        'PASSWORD': 'Mot de passe',
        'CONFIRM_PASSWORD': 'Confirmer le mot de passe',
        'NAME_PLACEHOLDER': 'Entrez votre nom complet',
        'EMAIL_PLACEHOLDER': 'votre@email.com',
        'PASSWORD_PLACEHOLDER': 'Minimum 6 caractères',
        'CONFIRM_PASSWORD_PLACEHOLDER': 'Répétez votre mot de passe',
        'REMEMBER_ME': 'Se souvenir de moi',
        'FORGOT_PASSWORD': 'Mot de passe oublié ?',
        'AGREE_TERMS': 'J\'accepte les termes et conditions',
        'LOGIN_BUTTON': 'Se connecter',
        'REGISTER_BUTTON': 'Créer un compte',
        'NO_ACCOUNT': 'Vous n\'avez pas de compte ?',
        'HAVE_ACCOUNT': 'Vous avez déjà un compte ?',
        'REGISTER_LINK': 'Inscrivez-vous ici',
        'LOGIN_LINK': 'Connectez-vous ici'
      },
      'FOOTER': {
        'COMPANY': 'Entreprise',
        'SUPPORT': 'Support',
        'LEGAL': 'Légal',
        'ABOUT_US': 'À propos de nous',
        'CAREERS': 'Carrières',
        'PRESS': 'Presse',
        'HELP_CENTER': 'Centre d\'aide',
        'SHIPPING': 'Livraison',
        'RETURNS': 'Retours',
        'PRIVACY_POLICY': 'Politique de confidentialité',
        'TERMS_OF_SERVICE': 'Conditions d\'utilisation',
        'COOKIE_POLICY': 'Politique des cookies',
        'NEWSLETTER': 'Newsletter',
        'NEWSLETTER_DESC': 'Abonnez-vous pour recevoir des offres exclusives et des nouveautés',
        'EMAIL_PLACEHOLDER': 'Votre adresse e-mail',
        'SUBSCRIBE': 'S\'abonner',
        'COMPANY_NAME': 'Boutique App',
        'ALL_RIGHTS_RESERVED': 'Tous droits réservés'
      }
    });

    // Charger les traductions anglaises
    this.translate.setTranslation('en', {
      'HEADER': {
        'LOGO': 'Boutique App',
        'HOME': 'Home',
        'SEARCH': 'Search',
        'CART': 'Cart',
        'MY_ACCOUNT': 'My Account',
        'LOGIN': 'Login',
        'TOGGLE_THEME': 'Toggle theme',
        'LANGUAGE': 'Change language'
      },
      'MENU': {
        'HOME': 'Home',
        'CATEGORIES': 'Categories',
        'BUNDLE_SAVE': 'Bundle & Save',
        'NEWS': 'News',
        'ABOUT_US': 'About us',
        'CONTACT': 'Contact',
        'MY_ACCOUNT': 'My Account'
      },
      'CATEGORIES': {
        'HOME': 'Home',
        'TECHNOLOGY': 'Technology',
        'DECORATION': 'Decoration',
        'SCENT': 'Scents'
      },
      'HOME': {
        'HERO_TITLE': 'Discover our products',
        'HERO_SUBTITLE': 'Find everything you need for your home with the best quality and incredible prices',
        'HERO_BUTTON': 'View products',
        'PRODUCTS_TITLE': 'Our Products',
        'PRODUCTS_SUBTITLE': 'Explore our categories and find the perfect products for you',
        'ADD_TO_CART': 'Add to cart'
      },
      'AUTH': {
        'LOGIN_TITLE': 'Login',
        'LOGIN_SUBTITLE': 'Access your account to continue',
        'REGISTER_TITLE': 'Create Account',
        'REGISTER_SUBTITLE': 'Join us and discover incredible products',
        'NAME': 'Full name',
        'EMAIL': 'Email',
        'PASSWORD': 'Password',
        'CONFIRM_PASSWORD': 'Confirm password',
        'NAME_PLACEHOLDER': 'Enter your full name',
        'EMAIL_PLACEHOLDER': 'your@email.com',
        'PASSWORD_PLACEHOLDER': 'Minimum 6 characters',
        'CONFIRM_PASSWORD_PLACEHOLDER': 'Repeat your password',
        'REMEMBER_ME': 'Remember me',
        'FORGOT_PASSWORD': 'Forgot your password?',
        'AGREE_TERMS': 'I agree to the terms and conditions',
        'LOGIN_BUTTON': 'Login',
        'REGISTER_BUTTON': 'Create Account',
        'NO_ACCOUNT': 'Don\'t have an account?',
        'HAVE_ACCOUNT': 'Already have an account?',
        'REGISTER_LINK': 'Register here',
        'LOGIN_LINK': 'Login here'
      },
      'FOOTER': {
        'COMPANY': 'Company',
        'SUPPORT': 'Support',
        'LEGAL': 'Legal',
        'ABOUT_US': 'About us',
        'CAREERS': 'Careers',
        'PRESS': 'Press',
        'HELP_CENTER': 'Help center',
        'SHIPPING': 'Shipping',
        'RETURNS': 'Returns',
        'PRIVACY_POLICY': 'Privacy policy',
        'TERMS_OF_SERVICE': 'Terms of service',
        'COOKIE_POLICY': 'Cookie policy',
        'NEWSLETTER': 'Newsletter',
        'NEWSLETTER_DESC': 'Subscribe to receive exclusive offers and news',
        'EMAIL_PLACEHOLDER': 'Your email address',
        'SUBSCRIBE': 'Subscribe',
        'COMPANY_NAME': 'Boutique App',
        'ALL_RIGHTS_RESERVED': 'All rights reserved'
      }
    });

    // Charger les traductions espagnoles
    this.translate.setTranslation('es', {
      'HEADER': {
        'LOGO': 'Boutique App',
        'HOME': 'Inicio',
        'SEARCH': 'Buscar',
        'CART': 'Carrito',
        'MY_ACCOUNT': 'Mi Cuenta',
        'LOGIN': 'Login',
        'TOGGLE_THEME': 'Cambiar tema',
        'LANGUAGE': 'Cambiar idioma'
      },
      'MENU': {
        'HOME': 'Inicio',
        'CATEGORIES': 'Categorías',
        'BUNDLE_SAVE': 'Bundle & Save',
        'NEWS': 'Noticias',
        'ABOUT_US': 'Sobre nosotros',
        'CONTACT': 'Contacto',
        'MY_ACCOUNT': 'Mi Cuenta'
      },
      'CATEGORIES': {
        'HOME': 'Casa',
        'TECHNOLOGY': 'Tecnología',
        'DECORATION': 'Decoración',
        'SCENT': 'Aromas'
      },
      'HOME': {
        'HERO_TITLE': 'Descubre nuestros productos',
        'HERO_SUBTITLE': 'Encuentra todo lo que necesitas para tu hogar con la mejor calidad y precios increíbles',
        'HERO_BUTTON': 'Ver productos',
        'PRODUCTS_TITLE': 'Nuestros Productos',
        'PRODUCTS_SUBTITLE': 'Explora nuestras categorías y encuentra los productos perfectos para ti',
        'ADD_TO_CART': 'Añadir al carrito'
      },
      'AUTH': {
        'LOGIN_TITLE': 'Iniciar Sesión',
        'LOGIN_SUBTITLE': 'Accede a tu cuenta para continuar',
        'REGISTER_TITLE': 'Crear Cuenta',
        'REGISTER_SUBTITLE': 'Únete a nosotros y descubre productos increíbles',
        'NAME': 'Nombre completo',
        'EMAIL': 'Correo electrónico',
        'PASSWORD': 'Contraseña',
        'CONFIRM_PASSWORD': 'Confirmar contraseña',
        'NAME_PLACEHOLDER': 'Ingresa tu nombre completo',
        'EMAIL_PLACEHOLDER': 'tu@email.com',
        'PASSWORD_PLACEHOLDER': 'Mínimo 6 caracteres',
        'CONFIRM_PASSWORD_PLACEHOLDER': 'Repite tu contraseña',
        'REMEMBER_ME': 'Recordarme',
        'FORGOT_PASSWORD': '¿Olvidaste tu contraseña?',
        'AGREE_TERMS': 'Acepto los términos y condiciones',
        'LOGIN_BUTTON': 'Iniciar Sesión',
        'REGISTER_BUTTON': 'Crear Cuenta',
        'NO_ACCOUNT': '¿No tienes cuenta?',
        'HAVE_ACCOUNT': '¿Ya tienes cuenta?',
        'REGISTER_LINK': 'Regístrate aquí',
        'LOGIN_LINK': 'Inicia sesión aquí'
      },
      'FOOTER': {
        'COMPANY': 'Empresa',
        'SUPPORT': 'Soporte',
        'LEGAL': 'Legal',
        'ABOUT_US': 'Sobre nosotros',
        'CAREERS': 'Carreras',
        'PRESS': 'Prensa',
        'HELP_CENTER': 'Centro de ayuda',
        'SHIPPING': 'Envíos',
        'RETURNS': 'Devoluciones',
        'PRIVACY_POLICY': 'Política de privacidad',
        'TERMS_OF_SERVICE': 'Términos de servicio',
        'COOKIE_POLICY': 'Política de cookies',
        'NEWSLETTER': 'Newsletter',
        'NEWSLETTER_DESC': 'Suscríbete para recibir ofertas exclusivas y novedades',
        'EMAIL_PLACEHOLDER': 'Tu correo electrónico',
        'SUBSCRIBE': 'Suscribirse',
        'COMPANY_NAME': 'Boutique App',
        'ALL_RIGHTS_RESERVED': 'Todos los derechos reservados'
      }
    });
  }
}
