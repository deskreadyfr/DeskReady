import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Mentions légales',
}

const CONTENT_BLOCKS = [
  {
    title: '1. Éditeur du site',
    body: `Le site DeskReady (ci-après "le Site") est édité par :

Nom : DeskReady
Forme juridique : Auto-entrepreneur / Entreprise individuelle
Adresse e-mail : contact@deskready.com
Directeur de la publication : Les fondateurs de DeskReady`,
  },
  {
    title: '2. Hébergeur',
    body: `Le Site est hébergé par :

Vercel Inc.
440 N Barranca Ave #4133
Covina, CA 91723
États-Unis
Site : vercel.com`,
  },
  {
    title: '3. Propriété intellectuelle',
    body: `L'ensemble des contenus présents sur le Site (textes, images, graphismes, logos, icônes, sons, logiciels, etc.) est la propriété exclusive de DeskReady ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.

Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du Site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est interdite sans l'autorisation préalable et écrite de DeskReady.`,
  },
  {
    title: '4. Données personnelles',
    body: `DeskReady s'engage à protéger la vie privée de ses utilisateurs.

Les données collectées (via les formulaires de contact ou de réservation de call) sont exclusivement utilisées pour traiter vos demandes et vous contacter. Elles ne sont jamais cédées à des tiers.

Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée, et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données vous concernant.

Pour exercer ce droit, contactez-nous à : contact@deskready.com`,
  },
  {
    title: '5. Cookies',
    body: `Le Site peut utiliser des cookies à des fins de mesure d'audience et d'amélioration de l'expérience utilisateur. Vous pouvez configurer votre navigateur pour refuser les cookies.`,
  },
  {
    title: '6. Limitation de responsabilité',
    body: `Les informations et contenus publiés sur le Site sont fournis à titre informatif uniquement. DeskReady ne saurait être tenu responsable des décisions prises par les utilisateurs sur la base des informations disponibles sur le Site.

Les données de marché présentées dans la section Data Room sont indicatives et ne constituent pas des conseils en investissement.`,
  },
  {
    title: '7. Droit applicable et juridiction compétente',
    body: `Les présentes mentions légales sont régies par le droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.`,
  },
  {
    title: '8. Contact',
    body: `Pour toute question relative aux présentes mentions légales ou à l'utilisation du Site, vous pouvez nous contacter à l'adresse suivante :

📧 contact@deskready.com`,
  },
]

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20">
        <div className="max-w-[860px] mx-auto px-8 py-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-1.5 bg-[rgba(124,58,237,0.2)] border border-[rgba(168,85,247,0.4)] rounded-full px-4 py-1.5 text-purple-soft text-xs font-semibold tracking-widest uppercase mb-6"
            >
              Légal
            </div>
            <h1
              className="font-raleway font-black text-dr-white leading-none mb-3"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
            >
              Mentions légales
            </h1>
            <p className="text-dr-grey text-sm font-light">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4">
            {CONTENT_BLOCKS.map((block, i) => (
              <div
                key={i}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.15)] rounded-2xl p-7"
              >
                <h2 className="font-syne font-bold text-dr-white text-base mb-4">{block.title}</h2>
                <p className="text-dr-grey text-sm leading-relaxed font-light whitespace-pre-line">{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
