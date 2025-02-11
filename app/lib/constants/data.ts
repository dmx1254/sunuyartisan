import { ARTISANMETIER, ICATEGORY, JOB, Region, SubJob } from "@/types";
import jobsIcones from "./images";

const {
  alum,
  meca,
  menu,
  metal,
  caross,
  elec,
  electAuto,
  peintre,
  clim,
  cordo,
  electronicien,
  tapis,
  maroquinier,
  tailleur,
  brodeur,
  tricoteur,
  macon,
  plomberie,
  carreleur,
  peintreBatiment,
  chapelier,
  ebeniste,
  sculpteur,
  ceramiste,
  bijoutier,
  caligraphe,
  coiffeur,
  esthetique,
  horloger,
  repElectro,
  fleuriste,
  photographe,
  prothesiste,
  forgeron,
  luthier,
  boulangier,
  charcut,
  poisson,
  epicier,
  cuisinier,
  agro,
  techSolaire,
  transport,
  transformArtisanal,
  amenagInterieur,
  puisatier,
  nettoyageLocaux,
  blanchisserie,
  calendar,
  wallet,
  notif,
  shield,
  language,
  info,
  profile,
  help,
  messages,
  security,
  schedule,
  homeprof,
  update,
  terms,
  menuisierCat,
  plombierCat,
  electricienCat,
  maconCat,
  mecaCat,
  metalliqueCat,
  climCat,
} = jobsIcones;

export const subCat: ICATEGORY[] = [
  {
    name: "Tous",
    slug: "tous",
  },
  {
    name: "Mécanicien",
    slug: "mecanicien",
  },
  {
    name: "Cordonnier",
    slug: "cordonnier",
  },
  {
    name: "Tailleur",
    slug: "tailleur",
  },
  {
    name: "Menuiserie bois",
    slug: "menuiserie-bois",
  },
  {
    name: "Menuiserie Métallique",
    slug: "menuiserie-metallique",
  },
  {
    name: "Menuisierie Aluminium",
    slug: "menuiserie-aluminium",
  },
  {
    name: "Maroquinier",
    slug: "maroquinier",
  },
];

export const jobs: JOB[] = [
  {
    id: "HJ125M",
    name: "Menuiserie bois",
    image: menu,
    slug: "menuiserie-bois",
  },
  {
    id: "MA476T",
    name: "Menuiserie Métallique",
    image: metal,
    slug: "menuiserie-metallique",
  },
  {
    id: "QP391O",
    name: "Menuisierie Aluminium",
    image: alum,
    slug: "menuiserie-aluminium",
  },
  {
    id: "WKD75U",
    name: "Mécanicien",
    image: meca,
    slug: "mecanicien",
  },
  {
    id: "WKE63Z",
    name: "Électricien",
    image: elec,
    slug: "electricien",
  },
  {
    id: "OPT72X",
    name: "Électricien Auto",
    image: electAuto,
    slug: "electricien-auto",
  },
  {
    id: "KVY37G",
    name: "Tôlier-peintre",
    image: peintre,
    slug: "tolier-peintre",
  },

  {
    id: "ZWL85U",
    name: "Système de climatisation",
    image: clim,
    slug: "systeme-de-climatisation",
  },
  {
    id: "DIO71U",
    name: "Èlectronicien",
    image: electronicien,
    slug: "electronicien",
  },
  {
    id: "QER35P",
    name: "Tapissier",
    image: tapis,
    slug: "tapissier",
  },
  {
    id: "KIZ82B",
    name: "Cordonnier",
    image: cordo,
    slug: "cordonnier",
  },
  {
    id: "DTY49L",
    name: "Maroquinier",
    image: maroquinier,
    slug: "maroquinier",
  },
  {
    id: "WYU14A",
    name: "Tailleur",
    image: tailleur,
    slug: "tailleur",
  },
  {
    id: "BHO24C",
    name: "Brodeur",
    image: brodeur,
    slug: "brodeur",
  },
  {
    id: "XKQ75T",
    name: "Tricoteur",
    image: tricoteur,
    slug: "tricoteur",
  },
  {
    id: "DUA19H",
    name: "Maconnerie",
    image: macon,
    slug: "maconnerie",
  },
  {
    id: "UHZ75O",
    name: "Plomberie",
    image: plomberie,
    slug: "plomberie",
  },
  {
    id: "WTM43A",
    name: "Carreleur",
    image: carreleur,
    slug: "carreleur",
  },
  {
    id: "GUZ26V",
    name: "Charpentier",
    image: chapelier,
    slug: "charpentier",
  },
  {
    id: "WOE98B",
    name: "Céramiste",
    image: ceramiste,
    slug: "ceramiste",
  },
  {
    id: "KLP20D",
    name: "Bijoutier",
    image: bijoutier,
    slug: "bijoutier",
  },
  {
    id: "GZN47W",
    name: "Calligraphe",
    image: caligraphe,
    slug: "calligraphe",
  },
  {
    id: "GTK38H",
    name: "Horloger",
    image: horloger,
    slug: "horloger",
  },
  {
    id: "YVE27J",
    name: "Réparateur d'électroménager",
    image: repElectro,
    slug: "reparateur-electromenager",
  },
  {
    id: "DPK63O",
    name: "Fleuriste",
    image: fleuriste,
    slug: "fleuriste",
  },
  {
    id: "NTP62V",
    name: "Photographe",
    image: photographe,
    slug: "photographe",
  },
  {
    id: "KAX43N",
    name: "Forgeron",
    image: forgeron,
    slug: "forgeron",
  },
  {
    id: "XQH71T",
    name: "Luthier",
    image: luthier,
    slug: "luthier",
  },
  {
    id: "RKS21B",
    name: "Boulanger Pâtissier",
    image: boulangier,
    slug: "boulanger-patissier",
  },
  {
    id: "DNR48W",
    name: "Charcutier traiteur",
    image: charcut,
    slug: "charcutier-traiteur",
  },
  {
    id: "HYC39Z",
    name: "Poissonnier",
    image: poisson,
    slug: "poissonnier",
  },
  {
    id: "BYZ29L",
    name: "Èpicerie artisanale",
    image: epicier,
    slug: "epicerie-artisanale",
  },
  {
    id: "VEL08O",
    name: "Restauration",
    image: cuisinier,
    slug: "restauration",
  },
  {
    id: "DAB41E",
    name: "Transformation artisanale",
    image: transformArtisanal,
    slug: "transformation-artisanale",
  },
  {
    id: "KWU82E",
    name: "Technicien en énergie renouvelable",
    image: techSolaire,
    slug: "technicien-en-energie-renouvelable",
  },
  {
    id: "XPA28D",
    name: "Agroalimentaire",
    image: agro,
    slug: "agroalimentaire",
  },
  {
    id: "FOW35L",
    name: "Transport",
    image: transport,
    slug: "transport",
  },
  {
    id: "PSD18B",
    name: "Aménagement interieur",
    image: amenagInterieur,
    slug: "amenagement-interieur",
  },
  {
    id: "HQU41K",
    name: "Puisatier",
    image: amenagInterieur,
    slug: "puisatier",
  },
  {
    id: "VRD37N",
    name: "Néttoyage de locaux",
    image: nettoyageLocaux,
    slug: "nettoyage-de-locaux",
  },
  {
    id: "QOG61T",
    name: "Blanchisserie",
    image: blanchisserie,
    slug: "blanchisserie",
  },
];

export default jobs;

export const subJobs: ARTISANMETIER[] = [
  {
    id: "54d61f",
    metier: "Menuiserie bois",
    slug: "menuiserie-bois",
    sousMetier: [
      {
        id: "9f5c38",
        metier: "Menuisier traditionnel",
        slug: "menuisier-traditionnel",
        description:
          "Spécialisé dans la fabrication de meubles et boiseries intérieures.",
      },
      {
        id: "f3c4e5",
        metier: "Menuisier poseur",
        slug: "menuisier-poseur",
        description:
          "Expert dans l'installation de portes, fenêtres et parquets.",
      },
      {
        id: "abfc1e",
        metier: "Ébéniste",
        slug: "ebeniste",
        description:
          "Conçoit des meubles haut de gamme et restaure des pièces anciennes.",
      },
      {
        id: "ff08e5",
        metier: "Charpentier bois",
        slug: "charpentier-bois",
        description:
          "Travaille sur les structures en bois, telles que les charpentes et ossatures.",
      },
    ],
  },
  {
    id: "qi61tl",
    metier: "Maroquinier",
    slug: "maroquinier",
    sousMetier: [
      {
        id: "def456",
        metier: "Créateur d'articles de luxe",
        slug: "createur-d-articles-de-luxe",
        description:
          "Conçoit et fabrique des articles haut de gamme comme des sacs et portefeuilles en cuir de qualité supérieure.",
      },
      {
        id: "ghi789",
        metier: "Réparateur d'articles en cuir",
        slug: "reparateur-d-articles-en-cuir",
        description:
          "Spécialiste de la restauration et de la réparation de produits en cuir abîmés ou usés.",
      },
      {
        id: "jkl012",
        metier: "Couturier spécialisé en maroquinerie",
        slug: "couturier-specialise-en-maroquinerie",
        description:
          "Assemble les pièces de cuir et réalise des finitions précises pour des créations durables.",
      },
      {
        id: "mno345",
        metier: "Designer en maroquinerie",
        slug: "designer-en-maroquinerie",
        description:
          "Imagine et développe des modèles innovants et tendances pour les articles en cuir.",
      },
    ],
  },
  {
    id: "ju12lo",
    metier: "Électronicien",
    slug: "electronicien",
    sousMetier: [
      {
        id: "def456",
        metier: "Électronicien de maintenance",
        slug: "electronicien-de-maintenance",
        description:
          "Spécialiste de la réparation et de l'entretien des équipements électroniques.",
      },
      {
        id: "ghi789",
        metier: "Électronicien industriel",
        slug: "electronicien-industriel",
        description:
          "Responsable de l'installation et de la maintenance des systèmes électroniques dans les environnements industriels.",
      },
      {
        id: "jkl012",
        metier: "Concepteur électronique",
        slug: "concepteur-electronique",
        description:
          "Conçoit et développe des circuits électroniques pour divers appareils et systèmes.",
      },
      {
        id: "mno345",
        metier: "Technicien en microélectronique",
        slug: "technicien-en-microelectronique",
        description:
          "Travaille sur des composants électroniques miniaturisés pour des applications comme les smartphones ou les ordinateurs.",
      },
    ],
  },
  {
    id: "gt15sd",
    metier: "Électricien",
    slug: "electricien",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Électricien bâtiment",
        slug: "electricien-batiment",
        description:
          "Spécialiste des installations électriques dans les bâtiments résidentiels et commerciaux.",
      },
      {
        id: "g7h8i9",
        metier: "Électricien industriel",
        slug: "electricien-industriel",
        description:
          "Expert en systèmes électriques pour les usines et installations industrielles.",
      },
      {
        id: "j1k2l3",
        metier: "Électricien réseau",
        slug: "electricien-reseau",
        description:
          "Chargé de la maintenance et de l'installation des réseaux électriques extérieurs.",
      },
      {
        id: "m4n5o6",
        metier: "Technicien en électricité domotique",
        slug: "technicien-electricite-domotique",
        description:
          "Intervient dans l'installation de systèmes intelligents pour les maisons connectées.",
      },
    ],
  },
  {
    id: "ld81vu",
    metier: "Électricien Auto",
    slug: "electricien-auto",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Diagnostic électrique automobile",
        slug: "diagnostic-electrique-automobile",
        description:
          "Spécialiste des diagnostics électriques sur les systèmes et circuits des véhicules.",
      },
      {
        id: "g7h8i9",
        metier: "Installation d'équipements électroniques",
        slug: "installation-equipements-electroniques",
        description:
          "Installation d'accessoires comme les alarmes, GPS, et systèmes audio.",
      },
      {
        id: "j1k2l3",
        metier: "Réparation de systèmes électriques",
        slug: "reparation-systemes-electriques",
        description:
          "Réparation des composants électriques comme les alternateurs, démarreurs, et fusibles.",
      },
      {
        id: "m4n5o6",
        metier: "Maintenance des batteries et chargeurs",
        slug: "maintenance-batteries-chargeurs",
        description:
          "Entretien et vérification des batteries, chargeurs, et systèmes de recharge.",
      },
    ],
  },
  {
    id: "tx57im",
    metier: "Systéme de climatisation",
    slug: "systeme-de-climatisation",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Technicien en installation de climatisation",
        slug: "technicien-installation-climatisation",
        description:
          "Spécialiste de l'installation de systèmes de climatisation pour les particuliers et les entreprises.",
      },
      {
        id: "g7h8i9",
        metier: "Technicien en maintenance de climatisation",
        slug: "technicien-maintenance-climatisation",
        description:
          "Expert en entretien et réparation de systèmes de climatisation pour assurer leur bon fonctionnement.",
      },
      {
        id: "j1k2l3",
        metier: "Frigoriste",
        slug: "frigoriste",
        description:
          "Professionnel chargé de l'installation et de la maintenance des équipements frigorifiques industriels et domestiques.",
      },
      {
        id: "m4n5o6",
        metier: "Technicien en systèmes de réfrigération",
        slug: "technicien-systemes-refrigeration",
        description:
          "Spécialiste des équipements de réfrigération pour la conservation des aliments et autres produits sensibles.",
      },
    ],
  },
  {
    id: "a1bvqx",
    metier: "Agroalimentaire",
    slug: "agroalimentaire",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Transformatrice de céréales (mil, maïs, fonio...)",
        slug: "transformatrice-de-cereales-mil-mais-fonio",
        description:
          "Transformation artisanale de céréales locales en produits prêts à l'emploi, comme la farine ou la semoule.",
      },
      {
        id: "g7h8i9",
        metier: "Confitures et conserves",
        slug: "confitures-et-conserves",
        description:
          "Production de confitures artisanales et de conserves à partir de fruits et légumes locaux.",
      },
      {
        id: "j1k2l3",
        metier: "Production artisanale",
        slug: "production-artisanale",
        description:
          "Fabrication de produits alimentaires traditionnels ou locaux avec des procédés artisanaux.",
      },
      {
        id: "m4n5o6",
        metier: "Épices et condiments (netou, poudre d'arachide...)",
        slug: "epices-et-condiments-netou-poudre-darachide",
        description:
          "Production et préparation d'épices et condiments locaux pour rehausser les saveurs des plats.",
      },
    ],
  },
  {
    id: "hr64kp",
    metier: "Tailleur",
    slug: "tailleur",
    sousMetier: [
      {
        id: "4d5e6f",
        metier: "Tailleur traditionnel",
        slug: "tailleur-traditionnel",
        description:
          "Spécialiste dans la confection d'habits sur mesure, souvent pour les tenues traditionnelles.",
      },
      {
        id: "7g8h9i",
        metier: "Tailleur de haute couture",
        slug: "tailleur-de-haute-couture",
        description:
          "Expert dans la création de vêtements luxueux et uniques, souvent pour des événements spéciaux.",
      },
      {
        id: "0j1k2l",
        metier: "Tailleur pour hommes",
        slug: "tailleur-pour-hommes",
        description:
          "Confectionne des costumes, chemises et vêtements sur mesure pour hommes.",
      },
      {
        id: "3m4n5o",
        metier: "Tailleur pour femmes",
        slug: "tailleur-pour-femmes",
        description:
          "Réalise des robes, ensembles et vêtements personnalisés pour femmes.",
      },
    ],
  },
  {
    id: "ka73yc",
    metier: "Menuiserie Métallique",
    slug: "menuiserie-metallique",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Fabrication de structures métalliques",
        slug: "fabrication-de-structures-metalliques",
        description:
          "Conception et assemblage de charpentes, grilles, et portails en métal pour divers usages.",
      },
      {
        id: "g7h8i9",
        metier: "Serrurerie métallique",
        slug: "serrurerie-metallique",
        description:
          "Création et installation de serrures, systèmes de fermeture, et éléments de sécurité métalliques.",
      },
      {
        id: "j1k2l3",
        metier: "Menuisier poseur métallique",
        slug: "menuisier-poseur-metallique",
        description:
          "Installation de portes, fenêtres, et autres éléments métalliques pour des constructions.",
      },
      {
        id: "m4n5o6",
        metier: "Décoration en métal",
        slug: "decoration-en-metal",
        description:
          "Réalisation d'éléments décoratifs en métal pour l'intérieur et l'extérieur.",
      },
    ],
  },

  {
    id: "ja4k97",
    metier: "Aménagement intérieur",
    slug: "amenagement-interieur",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Décoration d'intérieur",
        slug: "decoration-interieur",
        description:
          "Création et agencement d'espaces harmonieux pour améliorer l'esthétique et le confort.",
      },
      {
        id: "g7h8i9",
        metier: "Installation de cloisons",
        slug: "installation-cloisons",
        description:
          "Pose de cloisons pour délimiter les espaces dans les habitations ou les bureaux.",
      },
      {
        id: "j1k2l3",
        metier: "Pose de revêtements",
        slug: "pose-revetements",
        description:
          "Installation de revêtements de sol, murs ou plafonds comme carrelage, parquet et papier peint.",
      },
      {
        id: "m4n5o6",
        metier: "Aménagement de cuisines",
        slug: "amenagement-cuisines",
        description:
          "Conception et installation de cuisines sur mesure, fonctionnelles et esthétiques.",
      },
    ],
  },
  {
    id: "fq4cd6",
    metier: "Blanchisserie",
    slug: "blanchisserie",
    sousMetier: [
      {
        id: "def456",
        metier: "Lavage et repassage",
        slug: "lavage-et-repassage",
        description:
          "Service complet incluant le lavage des vêtements et leur repassage pour une finition impeccable.",
      },
      {
        id: "ghi789",
        metier: "Nettoyage à sec",
        slug: "nettoyage-a-sec",
        description:
          "Nettoyage spécialisé pour les tissus délicats ou nécessitant un traitement sans eau.",
      },
      {
        id: "jkl012",
        metier: "Lavage simple",
        slug: "lavage-simple",
        description: "Service de lavage standard des vêtements sans repassage.",
      },
      {
        id: "mno345",
        metier: "Lavage industriel",
        slug: "lavage-industriel",
        description:
          "Service destiné aux grandes quantités de linge, adapté aux entreprises et collectivités.",
      },
    ],
  },
  {
    id: "vfq24b",
    metier: "Transport",
    slug: "transport",
    sousMetier: [
      {
        id: "4d5e6f",
        metier: "Chauffeur de taxi",
        slug: "chauffeur-de-taxi",
        description:
          "Assure le transport de passagers en véhicule individuel sur des trajets urbains ou interurbains.",
      },
      {
        id: "7g8h9i",
        metier: "Conducteur de bus",
        slug: "conducteur-de-bus",
        description:
          "Conduit des bus pour le transport collectif de passagers sur des lignes régulières ou des itinéraires spécifiques.",
      },
      {
        id: "0j1k2l",
        metier: "Transporteur de marchandises",
        slug: "transporteur-de-marchandises",
        description:
          "Effectue le transport et la livraison de marchandises pour des clients ou des entreprises.",
      },
      {
        id: "3m4n5o",
        metier: "Coursier à moto",
        slug: "coursier-a-moto",
        description:
          "Livraison rapide de documents, colis ou autres petits objets en milieu urbain.",
      },
    ],
  },

  {
    id: "t1x2y3",
    metier: "Transformation artisanale",
    slug: "transformation-artisanale",
    sousMetier: [
      {
        id: "a4b5c6",
        metier: "Savonnerie (savons naturels, savons à base de moringa)",
        slug: "savonnerie-savons-naturels-savons-a-base-de-moringa",
        description:
          "Fabrication artisanale de savons à partir d’ingrédients naturels comme le moringa pour des usages personnels ou commerciaux.",
      },
      {
        id: "d7e8f9",
        metier: "Cosmétique naturelle (beurre de karité, huiles essentielles)",
        slug: "cosmetique-naturelle-beurre-de-karite-huiles-essentielles",
        description:
          "Production de cosmétiques naturels à base d’ingrédients locaux tels que le beurre de karité et les huiles essentielles.",
      },
      {
        id: "g1h2i3",
        metier: "Transformation de cuir",
        slug: "transformation-de-cuir",
        description:
          "Travail et façonnage du cuir pour créer des articles tels que des sacs, chaussures ou ceintures.",
      },
      {
        id: "j4k5l6",
        metier: "Vannerie (paniers, nattes)",
        slug: "vannerie-paniers-nattes",
        description:
          "Fabrication artisanale d’articles en vannerie comme des paniers, nattes ou objets décoratifs à partir de matériaux locaux.",
      },
    ],
  },
  {
    id: "nh41qb",
    metier: "Puisatier",
    slug: "puisatier",
    sousMetier: [
      {
        id: "def456",
        metier: "Creusement de puits traditionnels",
        slug: "creusement-de-puits-traditionnels",
        description:
          "Spécialiste du creusement manuel de puits pour l'accès à l'eau potable dans les zones rurales.",
      },
      {
        id: "ghi789",
        metier: "Installation de pompes manuelles",
        slug: "installation-de-pompes-manuelles",
        description:
          "Installation et maintenance de pompes pour faciliter l'extraction de l'eau des puits.",
      },
      {
        id: "jkl012",
        metier: "Construction de puits modernes",
        slug: "construction-de-puits-modernes",
        description:
          "Réalisation de puits cimentés ou équipés de technologies modernes pour une durabilité accrue.",
      },
      {
        id: "mno345",
        metier: "Entretien et réparation de puits",
        slug: "entretien-et-reparation-de-puits",
        description:
          "Travaux d'inspection, de nettoyage et de réparation pour garantir le bon fonctionnement des puits existants.",
      },
    ],
  },
  {
    id: "js14w5",
    metier: "Nettoyage de locaux",
    slug: "nettoyage-de-locaux",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Nettoyage de bureaux",
        slug: "nettoyage-de-bureaux",
        description:
          "Entretien quotidien ou périodique des bureaux pour assurer un espace de travail propre et agréable.",
      },
      {
        id: "g7h8i9",
        metier: "Nettoyage industriel",
        slug: "nettoyage-industriel",
        description:
          "Nettoyage des zones de production et des entrepôts pour maintenir des normes d'hygiène strictes.",
      },
      {
        id: "j1k2l3",
        metier: "Nettoyage après chantier",
        slug: "nettoyage-apres-chantier",
        description:
          "Élimination des déchets, poussières et résidus après des travaux de construction ou de rénovation.",
      },
      {
        id: "m4n5o6",
        metier: "Nettoyage de vitreries",
        slug: "nettoyage-de-vitreries",
        description:
          "Lavage et entretien des fenêtres, vitrines et surfaces vitrées pour une visibilité optimale.",
      },
    ],
  },
  {
    id: "gt42d8",
    metier: "Maçonnerie",
    slug: "maconnerie",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Maçon traditionnel",
        slug: "macon-traditionnel",
        description:
          "Construction et rénovation de murs, fondations, cloisons et dalles en utilisant des matériaux comme la brique, le béton ou la pierre.",
      },
      {
        id: "g7h8i9",
        metier: "Maçon finisseur",
        slug: "macon-finisseur",
        description:
          "Réalisation des finitions des murs, plafonds et sols, notamment la pose de plâtre, de carreaux ou de joints.",
      },
      {
        id: "j1k2l3",
        metier: "Maçon coffreur",
        slug: "macon-coffreur",
        description:
          "Spécialisé dans la création de coffrages pour les structures en béton (piliers, poutres, dalles, etc.).",
      },
      {
        id: "m4n5o6",
        metier: "Maçon pierreux",
        slug: "macon-pierreux",
        description:
          "Expert dans la taille et la pose de pierres pour la construction de murs, façades et monuments en pierres naturelles.",
      },
    ],
  },

  {
    id: "hg28q6",
    metier: "Céramiste",
    slug: "ceramiste",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Modeleur",
        slug: "modeleur",
        description:
          "Spécialiste dans la création de formes en argile ou autres matériaux pour fabriquer des objets décoratifs ou utilitaires.",
      },
      {
        id: "g7h8i9",
        metier: "Poterie",
        slug: "poterie",
        description:
          "Artisan qui façonne des objets en céramique, souvent des pots, des vases et des plats, à la main ou sur un tour de potier.",
      },
      {
        id: "j1k2l3",
        metier: "Céramique artistique",
        slug: "ceramique-artistique",
        description:
          "Création de pièces de céramique en tant qu'œuvres d'art, souvent uniques, combinant esthétique et technique.",
      },
      {
        id: "m4n5o6",
        metier: "Céramiste décorateur",
        slug: "ceramiste-decorateur",
        description:
          "Spécialisé dans la décoration des pièces en céramique, en appliquant des motifs, peintures ou émaux.",
      },
    ],
  },

  {
    id: "nh5qp3",
    metier: "Bijoutier",
    slug: "bijoutier",
    sousMetier: [
      {
        id: "a1b2c3",
        metier: "Bijoutier créateur",
        slug: "bijoutier-createur",
        description:
          "Conception et création de bijoux sur mesure, en utilisant divers matériaux comme l'or, l'argent et les pierres précieuses.",
      },
      {
        id: "d4e5f6",
        metier: "Graveur sur métal",
        slug: "graveur-sur-metal",
        description:
          "Spécialisation dans la gravure de motifs et d'inscriptions sur des bijoux en métal, notamment l'or et l'argent.",
      },
      {
        id: "g7h8i9",
        metier: "Réparateur de bijoux",
        slug: "reparateur-de-bijoux",
        description:
          "Réparation de bijoux endommagés, incluant le soudage, le redressement, et la restauration de la forme originale.",
      },
      {
        id: "j1k2l3",
        metier: "Bijoutier sertisseur",
        slug: "bijoutier-sertisseur",
        description:
          "Installation et sertissage de pierres précieuses et semi-précieuses dans des montures de bijoux, comme des bagues et des colliers.",
      },
    ],
  },

  {
    id: "nj63a8",
    metier: "Menuiserie aluminium",
    slug: "menuiserie-aluminium",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Menuisier aluminium",
        slug: "menuisier-aluminium",
        description:
          "Spécialiste dans la fabrication et la pose de fenêtres, portes et autres structures en aluminium.",
      },
      {
        id: "g7h8i9",
        metier: "Installateur menuiserie aluminium",
        slug: "installateur-menuiserie-aluminium",
        description:
          "Responsable de l'installation de produits en aluminium dans les bâtiments, y compris les fenêtres, les portes et les rideaux métalliques.",
      },
      {
        id: "j1k2l3",
        metier: "Fabricant de structures aluminium",
        slug: "fabricant-structures-aluminium",
        description:
          "Fabrication de structures en aluminium pour des applications industrielles et résidentielles.",
      },
      {
        id: "m4n5o6",
        metier: "Technicien en menuiserie aluminium",
        slug: "technicien-menuiserie-aluminium",
        description:
          "Technicien chargé de la maintenance et de la réparation des installations en aluminium, y compris fenêtres et portes.",
      },
    ],
  },

  {
    id: "hq53d5",
    metier: "Mécanicien",
    slug: "mecanicien",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Mécanicien automobile",
        slug: "mecanicien-automobile",
        description:
          "Réparation et entretien des véhicules automobiles, y compris moteurs, systèmes de freinage et transmission.",
      },
      {
        id: "g7h8i9",
        metier: "Mécanicien industriel",
        slug: "mecanicien-industriel",
        description:
          "Maintenance des machines industrielles, incluant la réparation de moteurs et de systèmes mécaniques complexes.",
      },
      {
        id: "j1k2l3",
        metier: "Mécanicien poids lourds",
        slug: "mecanicien-poids-lourds",
        description:
          "Réparation et entretien des camions, bus et autres véhicules lourds, avec un focus sur les moteurs et châssis.",
      },
      {
        id: "m4n5o6",
        metier: "Mécanicien motocycle",
        slug: "mecanicien-motocycle",
        description:
          "Réparation et entretien des motos et scooters, y compris les moteurs, les suspensions et les systèmes électriques.",
      },
    ],
  },

  {
    id: "pq41w3",
    metier: "Tolier-peintre",
    slug: "tolier-peintre",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Peintre en bâtiment",
        slug: "peintre-en-batiment",
        description:
          "Applique des peintures, vernis et autres produits de finition sur les murs, plafonds et autres surfaces.",
      },
      {
        id: "g7h8i9",
        metier: "Peintre décorateur",
        slug: "peintre-decorateur",
        description:
          "Spécialisé dans la création d'effets décoratifs avec des peintures et autres matériaux pour l'intérieur.",
      },
      {
        id: "j0k1l2",
        metier: "Tolier",
        slug: "tolier",
        description:
          "Répare et prépare les surfaces en plâtre, enduit ou autres matériaux pour la peinture.",
      },
      {
        id: "m3n4o5",
        metier: "Peintre en carrosserie",
        slug: "peintre-en-carrosserie",
        description:
          "Réalise des travaux de peinture sur les véhicules pour les restaurer et les protéger.",
      },
    ],
  },

  {
    id: "gy52q1",
    metier: "Tapissier",
    slug: "tapissier",
    sousMetier: [
      {
        id: "def456",
        metier: "Tapissier décorateur",
        slug: "tapissier-decorateur",
        description:
          "Création et pose de revêtements décoratifs sur des meubles et murs, en utilisant des tissus et des matériaux variés.",
      },
      {
        id: "ghi789",
        metier: "Tapissier en ameublement",
        slug: "tapissier-en-ameublement",
        description:
          "Restauration et relooking de meubles anciens ou abîmés, en changeant les tissus et en réparant les structures.",
      },
      {
        id: "jkl012",
        metier: "Tapissier garnisseur",
        slug: "tapissier-garnisseur",
        description:
          "Pose de garnitures, de mousses et tissus sur des sièges ou fauteuils, pour leur donner confort et esthétique.",
      },
      {
        id: "mno345",
        metier: "Tapissier automobile",
        slug: "tapissier-automobile",
        description:
          "Rénovation et recouvrement de sièges et d'intérieurs de véhicules en tissu ou cuir, pour les rendre plus esthétiques et confortables.",
      },
    ],
  },

  {
    id: "mq27k3",
    metier: "Cordonnier",
    slug: "cordonnier",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Réparateur de chaussures",
        slug: "reparateur-de-chaussures",
        description:
          "Réparation et entretien des chaussures, incluant le remplacement de semelles, de talons et de coutures.",
      },
      {
        id: "g7h8i9",
        metier: "Fabricant de chaussures sur mesure",
        slug: "fabricant-de-chaussures-sur-mesure",
        description:
          "Conception et fabrication de chaussures personnalisées selon les besoins et les spécifications du client.",
      },
      {
        id: "j1k2l3",
        metier: "Poseur de semelles",
        slug: "poseur-de-semelles",
        description:
          "Installation de semelles dans les chaussures pour améliorer leur confort, durabilité et fonctionnalité.",
      },
      {
        id: "m4n5o6",
        metier: "Restaurateur de cuir",
        slug: "restaurateur-de-cuir",
        description:
          "Réparation et restauration de cuir, y compris la réparation de déchirures, le nettoyage et la teinture.",
      },
    ],
  },

  {
    id: "bz27k9",
    metier: "Brodeur",
    slug: "brodeur",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Brodeur textile",
        slug: "brodeur-textile",
        description:
          "Spécialisé dans la broderie sur tissus, vêtements et accessoires.",
      },
      {
        id: "g7h8i9",
        metier: "Brodeur d'art",
        slug: "brodeur-dart",
        description:
          "Création de motifs artistiques brodés pour des œuvres décoratives et des objets d'art.",
      },
      {
        id: "j1k2l3",
        metier: "Brodeur sur cuir",
        slug: "brodeur-sur-cuir",
        description:
          "Broderie sur des matériaux en cuir pour des accessoires tels que sacs et vêtements.",
      },
      {
        id: "m4n5o6",
        metier: "Brodeur traditionnel",
        slug: "brodeur-traditionnel",
        description:
          "Utilisation de techniques de broderie anciennes pour des créations artisanales classiques.",
      },
    ],
  },

  {
    id: "xy17h2",
    metier: "Tricoteur",
    slug: "tricoteur",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Tricoteur machine",
        slug: "tricoteur-machine",
        description:
          "Utilisation de machines à tricoter pour fabriquer des tissus et des vêtements en grande quantité.",
      },
      {
        id: "g7h8i9",
        metier: "Tricoteur à la main",
        slug: "tricoteur-a-la-main",
        description:
          "Fabrication de textiles et de vêtements en utilisant des techniques de tricot manuel.",
      },
      {
        id: "j1k2l3",
        metier: "Tricoteur de mode",
        slug: "tricoteur-de-mode",
        description:
          "Création de vêtements et accessoires tendance, souvent réalisés à la main ou avec des machines spécialisées.",
      },
      {
        id: "m4n5o6",
        metier: "Tricoteur d'art",
        slug: "tricoteur-d-art",
        description:
          "Tricotage d'œuvres d'art ou de créations uniques, combinant la technique traditionnelle et des éléments artistiques.",
      },
    ],
  },

  {
    id: "jz75f4",
    metier: "Plomberie",
    slug: "plomberie",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Plombier réparateur",
        slug: "plombier-reparateur",
        description:
          "Intervient pour réparer les fuites d'eau, les canalisations bouchées et autres défaillances des installations sanitaires.",
      },
      {
        id: "g7h8i9",
        metier: "Plombier installateur",
        slug: "plombier-installateur",
        description:
          "Spécialisé dans l'installation de nouveaux systèmes de plomberie, y compris les tuyauteries, les chauffe-eaux et les sanitaires.",
      },
      {
        id: "j0k1l2",
        metier: "Plombier chauffagiste",
        slug: "plombier-chauffagiste",
        description:
          "Responsable de l'installation et de la maintenance des systèmes de chauffage, de climatisation et de chauffe-eau.",
      },
      {
        id: "m3n4o5",
        metier: "Plombier sanitaire",
        slug: "plombier-sanitaire",
        description:
          "Intervient pour l'entretien et l'installation des équipements sanitaires tels que les lavabos, toilettes et douches.",
      },
    ],
  },

  {
    id: "vr53o8",
    metier: "Carreleur",
    slug: "carreleur",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Carreleur de sols",
        slug: "carreleur-de-sols",
        description:
          "Spécialiste dans la pose de carrelage sur les sols, que ce soit pour des intérieurs ou des extérieurs.",
      },
      {
        id: "g7h8i9",
        metier: "Carreleur de murs",
        slug: "carreleur-de-murs",
        description:
          "Expert dans la pose de carrelage mural, notamment dans les cuisines et salles de bains.",
      },
      {
        id: "j0k1l2",
        metier: "Carreleur en faïence",
        slug: "carreleur-en-faience",
        description:
          "Spécialiste de la pose de faïence, principalement utilisée pour les murs et décorations intérieures.",
      },
      {
        id: "m3n4o5",
        metier: "Carreleur en mosaïque",
        slug: "carreleur-en-mosaique",
        description:
          "Expert dans la pose de mosaïque, souvent utilisée pour des revêtements décoratifs.",
      },
    ],
  },

  {
    id: "fk92w6",
    metier: "Charpentier",
    slug: "charpentier",
    sousMetier: [
      {
        id: "D4E5F6",
        metier: "Charpentier bois",
        slug: "charpentier-bois",
        description:
          "Spécialiste dans la conception et la réalisation de structures en bois comme les charpentes et les ossatures.",
      },
      {
        id: "G7H8I9",
        metier: "Charpentier métallique",
        slug: "charpentier-metallique",
        description:
          "Expert dans la fabrication et l'installation de structures métalliques, comme les poutres et les structures en acier.",
      },
      {
        id: "J1K2L3",
        metier: "Charpentier d'art",
        slug: "charpentier-dart",
        description:
          "Réalisation de travaux de menuiserie fine et artisanale pour des éléments décoratifs ou des structures architecturales complexes.",
      },
      {
        id: "M4N5O6",
        metier: "Charpentier de marine",
        slug: "charpentier-de-marine",
        description:
          "Spécialiste de la construction et de la réparation des structures en bois des navires et autres embarcations.",
      },
    ],
  },

  {
    id: "is94y2",
    metier: "Calligraphe",
    slug: "calligraphe",
    sousMetier: [
      {
        id: "D4E5F6",
        metier: "Calligraphe artistique",
        slug: "calligraphe-artistique",
        description:
          "Création de lettres et de compositions artistiques pour des invitations, des cartes de vœux, des décorations et autres œuvres visuelles.",
      },
      {
        id: "G7H8I9",
        metier: "Calligraphe traditionnel",
        slug: "calligraphe-traditionnel",
        description:
          "Pratique de la calligraphie classique en utilisant des outils traditionnels tels que le calame, la plume et l'encre.",
      },
      {
        id: "J0K1L2",
        metier: "Calligraphe numérique",
        slug: "calligraphe-numerique",
        description:
          "Utilisation de logiciels de design pour créer des polices et des compositions calligraphiques numériques modernes.",
      },
      {
        id: "M3N4O5",
        metier: "Calligraphe de mariage",
        slug: "calligraphe-de-mariage",
        description:
          "Spécialisation dans la création d'invitations, de faire-part et de décorations calligraphiées pour des événements de mariage.",
      },
    ],
  },

  {
    id: "kf81b6",
    metier: "Horloger",
    slug: "horloger",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Réparateur de montres",
        slug: "reparateur-de-montres",
        description:
          "Spécialiste de la réparation de montres mécaniques et à quartz, en assurant un entretien précis.",
      },
      {
        id: "g7h8i9",
        metier: "Horloger bijoutier",
        slug: "horloger-bijoutier",
        description:
          "Création et réparation de montres en combinant des éléments de bijouterie et d'horlogerie.",
      },
      {
        id: "j1k2l3",
        metier: "Réglage de montres",
        slug: "reglage-de-montres",
        description:
          "Service consistant à régler le mouvement et à assurer la précision d'une montre.",
      },
      {
        id: "m4n5o6",
        metier: "Entretien de pendules",
        slug: "entretien-de-pendules",
        description:
          "Réparation et entretien de pendules anciennes, y compris le nettoyage et le remontage des mécanismes.",
      },
    ],
  },

  {
    id: "yc27l3",
    metier: "Réparateur d'électroménager",
    slug: "reparateur-electromenager",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Réparateur de réfrigérateur",
        slug: "reparateur-de-refrigerateur",
        description:
          "Réparation des réfrigérateurs, congélateurs et autres appareils de froid, incluant le diagnostic et le remplacement de pièces défectueuses.",
      },
      {
        id: "g7h8i9",
        metier: "Réparateur de lave-linge",
        slug: "reparateur-de-lave-linge",
        description:
          "Maintenance et réparation des lave-linge, résolution des pannes liées aux moteurs, pompes, circuits électriques et autres composants.",
      },
      {
        id: "j1k2l3",
        metier: "Réparateur de micro-ondes",
        slug: "reparateur-de-micro-ondes",
        description:
          "Réparation des micro-ondes, intervention sur les circuits électriques, les thermostats et autres problèmes de fonctionnement.",
      },
      {
        id: "m4n5o6",
        metier: "Réparateur de télévision",
        slug: "reparateur-de-television",
        description:
          "Réparation de télévisions LCD, LED, plasma et autres modèles, avec diagnostic des problèmes d'écran, de son et de connexion.",
      },
    ],
  },

  {
    id: "zj81p6",
    metier: "Fleuriste",
    slug: "fleuriste",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Créateur floral",
        slug: "createur-floral",
        description:
          "Spécialiste dans la conception de compositions florales pour différents événements et occasions.",
      },
      {
        id: "g7h8i9",
        metier: "Vendeur de fleurs",
        slug: "vendeur-de-fleurs",
        description:
          "Commercialisation de bouquets et de plantes en magasin ou sur des marchés.",
      },
      {
        id: "j1k2l3",
        metier: "Décorateur floral",
        slug: "decorateur-floral",
        description:
          "Aménagement d'espaces avec des fleurs et des plantes pour des événements ou des installations permanentes.",
      },
      {
        id: "m4n5o6",
        metier: "Livraison de fleurs",
        slug: "livraison-de-fleurs",
        description:
          "Service de livraison de bouquets et de plantes à domicile pour des occasions spéciales.",
      },
    ],
  },

  {
    id: "hq46u9",
    metier: "photographe",
    slug: "photographe",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Photographe de mariage",
        slug: "photographe-de-mariage",
        description:
          "Capturer les moments précieux lors des cérémonies de mariage, avec un focus sur les émotions et l'ambiance.",
      },
      {
        id: "g7h8i9",
        metier: "Photographe de portrait",
        slug: "photographe-de-portrait",
        description:
          "Réaliser des portraits artistiques et professionnels, mettant en valeur la personnalité du sujet.",
      },
      {
        id: "j1k2l3",
        metier: "Photographe de mode",
        slug: "photographe-de-mode",
        description:
          "Shooting de mode pour les marques, magazines et créateurs, avec un accent sur les vêtements et accessoires.",
      },
      {
        id: "m4n5o6",
        metier: "Photographe de paysage",
        slug: "photographe-de-paysage",
        description:
          "Capturer la beauté de la nature et des paysages, souvent dans un cadre extérieur et naturel.",
      },
    ],
  },

  {
    id: "gq81m9",
    metier: "Forgeron",
    slug: "forgeron",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Forgeron artisan",
        slug: "forgeron-artisan",
        description:
          "Fabrication d'objets en métal à la main, tels que des couteaux, des clous, des outils, etc.",
      },
      {
        id: "g7h8i9",
        metier: "Forgeron métallier",
        slug: "forgeron-metallier",
        description:
          "Spécialiste dans la fabrication et la réparation d'objets métalliques, comme les portails, rampes et escaliers.",
      },
      {
        id: "j0k1l2",
        metier: "Forgeron ferronnier",
        slug: "forgeron-ferronnier",
        description:
          "Fabrication de structures en métal forgé pour la décoration ou la construction (portes, fenêtres, grilles).",
      },
      {
        id: "m3n4o5",
        metier: "Forgeron soudeur",
        slug: "forgeron-soudeur",
        description:
          "Réparation et assemblage de métaux par fusion, en utilisant diverses techniques de soudage.",
      },
    ],
  },
  {
    id: "dk37x8",
    metier: "Luthier",
    slug: "luthier",
    sousMetier: [
      {
        id: "def456",
        metier: "Luthier réparateur",
        slug: "luthier-reparateur",
        description:
          "Spécialisé dans la réparation et l'entretien des instruments à cordes.",
      },
      {
        id: "ghi789",
        metier: "Luthier créateur",
        slug: "luthier-createur",
        description:
          "Conception et fabrication sur mesure d'instruments à cordes.",
      },
      {
        id: "jkl012",
        metier: "Luthier ajusteur",
        slug: "luthier-ajusteur",
        description:
          "Régulation de la tension des cordes et ajustement des parties de l'instrument.",
      },
      {
        id: "mno345",
        metier: "Luthier restaurateur",
        slug: "luthier-restaurateur",
        description:
          "Restauration d'instruments anciens, préservation de leur intégrité.",
      },
    ],
  },
  {
    id: "lz15v4",
    metier: "Boulanger pâtissier",
    slug: "boulanger-patissier",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Boulanger",
        slug: "boulanger",
        description:
          "Spécialisé dans la préparation du pain, baguettes, et autres produits de boulangerie.",
      },
      {
        id: "g7h8i9",
        metier: "Pâtissier",
        slug: "patisseir",
        description:
          "Expert dans la fabrication de gâteaux, viennoiseries et autres desserts sucrés.",
      },
      {
        id: "j1k2l3",
        metier: "Pâtissier chocolatier",
        slug: "patisseir-chocolatier",
        description:
          "Spécialiste des chocolats fins, bonbons, et créations à base de chocolat.",
      },
      {
        id: "m4n5o6",
        metier: "Pâtissier glacier",
        slug: "patisseir-glacier",
        description:
          "Expert dans la préparation de glaces, sorbets et autres desserts glacés.",
      },
    ],
  },

  {
    id: "wt92u1",
    metier: "Charcutier traiteur",
    slug: "charcutier-traiteur",
    sousMetier: [
      {
        id: "D4E5F6",
        metier: "Charcutier",
        slug: "charcutier",
        description:
          "Spécialisé dans la préparation et la vente de charcuterie, comme les saucisses, jambons et pâtés.",
      },
      {
        id: "G7H8I9",
        metier: "Traiteur",
        slug: "traiteur",
        description:
          "Prépare des plats cuisinés pour des événements spéciaux tels que mariages, banquets et réceptions.",
      },
      {
        id: "J0K1L2",
        metier: "Boucher charcutier",
        slug: "boucher-charcutier",
        description:
          "Combine les rôles de boucher et de charcutier, travaillant à la fois la viande et la charcuterie.",
      },
      {
        id: "M3N4O5",
        metier: "Chef traiteur",
        slug: "chef-traiteur",
        description:
          "Responsable de la création et de la gestion de menus sur mesure pour des événements et des réceptions.",
      },
    ],
  },

  {
    id: "tv67n2",
    metier: "Poissonnier",
    slug: "poissonnier",
    sousMetier: [
      {
        id: "4d5e6f",
        metier: "Poissonnier détaillant",
        slug: "poissonnier-detaillant",
        description:
          "Vente de poissons frais et de fruits de mer dans les magasins spécialisés.",
      },
      {
        id: "7g8h9i",
        metier: "Poissonnier en gros",
        slug: "poissonnier-en-gros",
        description:
          "Fourniture de poissons et fruits de mer en gros pour les restaurants, poissonneries et marchés.",
      },
      {
        id: "j0k1l2",
        metier: "Poissonnier transformateur",
        slug: "poissonnier-transformateur",
        description:
          "Préparation de poissons en filets ou autres produits transformés (sushis, conserves).",
      },
      {
        id: "m3n4o5",
        metier: "Poissonnier livreur",
        slug: "poissonnier-livreur",
        description:
          "Livraison de poissons frais et de produits marins aux clients ou commerces.",
      },
    ],
  },

  {
    id: "jq38c7",
    metier: "Épicerie artisanale",
    slug: "epicerie-artisanale",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Vendeur de produits locaux",
        slug: "vendeur-de-produits-locaux",
        description:
          "Spécialisé dans la vente de produits alimentaires provenant directement des producteurs locaux.",
      },
      {
        id: "g7h8i9",
        metier: "Fabricant de confitures",
        slug: "fabricant-de-confitures",
        description:
          "Production artisanale de confitures faites maison à partir de fruits frais et locaux.",
      },
      {
        id: "j1k2l3",
        metier: "Commerçant de produits bio",
        slug: "commercant-de-produits-bio",
        description:
          "Vente d'aliments certifiés bio, cultivés sans pesticides ni produits chimiques.",
      },
      {
        id: "m4n5o6",
        metier: "Fabricant de fromages artisanaux",
        slug: "fabricant-de-fromages-artisanaux",
        description:
          "Création de fromages artisanaux à partir de lait local, dans le respect des traditions.",
      },
    ],
  },
  {
    id: "bs84y9",
    metier: "Restauration",
    slug: "restauration",
    sousMetier: [
      {
        id: "d4e5f6",
        metier: "Chef de cuisine",
        slug: "chef-de-cuisine",
        description:
          "Responsable de la préparation des repas, de la gestion de la cuisine et de l'encadrement de l'équipe.",
      },
      {
        id: "g7h8i9",
        metier: "Serveur",
        slug: "serveur",
        description:
          "Assure le service à table, prend les commandes et s'occupe des clients pendant leur repas.",
      },
      {
        id: "j1k2l3",
        metier: "Commis de cuisine",
        slug: "commis-de-cuisine",
        description:
          "Assiste le chef et prépare les ingrédients pour la cuisine.",
      },
      {
        id: "m4n5o6",
        metier: "Pâtissier",
        slug: "patisseir",
        description:
          "Spécialiste dans la préparation de pâtisseries, gâteaux et desserts.",
      },
    ],
  },
  {
    id: "lxks6c",
    metier: "Transformation artisanale",
    slug: "transformation-artisanale",
    sousMetier: [
      {
        id: "a4b5c6",
        metier: "Savonnerie (savons naturels, savons à base de moringa)",
        slug: "savonnerie-savons-naturels-savons-a-base-de-moringa",
        description:
          "Fabrication artisanale de savons à partir d’ingrédients naturels comme le moringa pour des usages personnels ou commerciaux.",
      },
      {
        id: "d7e8f9",
        metier: "Cosmétique naturelle (beurre de karité, huiles essentielles)",
        slug: "cosmetique-naturelle-beurre-de-karite-huiles-essentielles",
        description:
          "Production de cosmétiques naturels à base d’ingrédients locaux tels que le beurre de karité et les huiles essentielles.",
      },
      {
        id: "g1h2i3",
        metier: "Transformation de cuir",
        slug: "transformation-de-cuir",
        description:
          "Travail et façonnage du cuir pour créer des articles tels que des sacs, chaussures ou ceintures.",
      },
      {
        id: "j4k5l6",
        metier: "Vannerie (paniers, nattes)",
        slug: "vannerie-paniers-nattes",
        description:
          "Fabrication artisanale d’articles en vannerie comme des paniers, nattes ou objets décoratifs à partir de matériaux locaux.",
      },
    ],
  },

  {
    id: "kroq2t",
    metier: "Technicien en énergie renouvelable",
    slug: "technicien-en-energie-renouvelable",
    sousMetier: [
      {
        id: "def456",
        metier: "Installateur de panneaux solaires",
        slug: "installateur-de-panneaux-solaires",
        description:
          "Spécialiste de la pose et de la maintenance des systèmes photovoltaïques.",
      },
      {
        id: "ghi789",
        metier: "Technicien en éoliennes",
        slug: "technicien-en-eoliennes",
        description:
          "Responsable de l'installation et de l'entretien des éoliennes pour produire de l'énergie.",
      },
      {
        id: "jkl012",
        metier: "Installateur de systèmes géothermiques",
        slug: "installateur-de-systemes-geothermiques",
        description:
          "Expert dans la mise en place de systèmes utilisant la chaleur de la terre pour le chauffage et le refroidissement.",
      },
      {
        id: "mno345",
        metier: "Technicien en biomasse",
        slug: "technicien-en-biomasse",
        description:
          "Chargé de l'installation et de l'entretien des équipements utilisant la biomasse pour produire de l'énergie.",
      },
    ],
  },
];

export const availabilityOptions = [
  "Lundi-Vendredi",
  "Week-end",
  "Soirée",
  "Tous les jours",
  "Urgences",
];

export const skillsOptions = [
  "Fiabilité",
  "Qualité du travail",
  "Rapidité",
  "Innovation",
  "Prix compétitif",
  "Polyvalence",
  "Eco-responsabilité",
  "Expérience",
  "Disponibilité",
  "Sécurité",
  "Précision",
  "Professionnalisme",
  "Adaptabilité",
  "Transparence",
  "Empathie",
];

export const settings = [
  {
    title: "My schedules",
    icon: jobsIcones.schedule,
    path: "schedules",
  },
  {
    title: "My messages",
    icon: jobsIcones.messages,
    path: "messages",
  },

  {
    title: "Notifications",
    icon: jobsIcones.notif,
    path: "notifications",
  },
  {
    title: "Sécurité",
    icon: jobsIcones.security,
    path: "security",
  },

  {
    title: "Profile",
    icon: jobsIcones.profile,
    path: "user-info",
  },
];

export const categories: JOB[] = [
  {
    id: "JZ67M3",
    name: "Plomberie",
    image: plombierCat,
    slug: "plomberie",
  },
  {
    id: "HS7DE4",
    name: "Mécanicien",
    image: mecaCat,
    slug: "mecanicien",
  },
  {
    id: "RA2L3Q",
    name: "Electricien metallique",
    image: metalliqueCat,
    slug: "electricien-metallique",
  },
  {
    id: "LT5Q8T",
    name: "Système de climatisation",
    image: climCat,
    slug: "systeme-de-climatisation",
  },
  {
    id: "DG14J9",
    name: "Menuiserie",
    image: menuisierCat,
    slug: "menuiserie",
  },

  {
    id: "HY6AQ4",
    name: "Electricien",
    image: electricienCat,
    slug: "electricien",
  },

  {
    id: "ZB8QP7",
    name: "Maçonnerie",
    image: maconCat,
    slug: "maconnerie",
  },
];

export const jobProfiles = [];

export const regions: Region[] = [
  {
    region: "dakar",
    departments: [
      {
        department: "dakar",
        communes: [
          "Gorée",
          "Dakar-plateau",
          "Fann-Point E-Amitié",
          "Médina",
          "Fass-Gueule-Tapée-Colobane",
          "Grand Dakar",
          "HLM",
          "Biscuiterie",
          "Hann-Bel-Air",
          "Sicap-Liberté",
          "Dieuppeul-Derklé",
          "Yoff",
          "Mermoz-Sacré-Cœur",
          "Ouakam",
          "Grand Yoff",
          "N'gor",
          "Parcelles Assainies",
          "Cambérene",
        ],
      },
      {
        department: "pikine",
        communes: [
          "Pikine Ouest",
          "Pikine Est",
          "Pikine Sud",
          "Guinaw Rails Nord",
          "Guinaw Rails Sud",
          "Thiaroye Gare",
          "Djidah Thiaroye Kao",
          "Diack Sao",
          "Thiaroye sur Mer",
          "Diamaguène-Sicap Mbao",
          "Keur Massar",
          "Daliford",
          "Malika",
          "M'bao",
          "Yeumbeul Sud",
          "Yeumbeul Nord",
        ],
      },
      {
        department: "guédiawaye",
        communes: [
          "Wakhinane Nimzatt",
          "Sam Notaire",
          "Médina Gounass",
          "Ndiarème Limamoulaye",
          "Golf Sud",
        ],
      },
      {
        department: "rufisque",
        communes: [
          "Rufisque",
          "Bargny",
          "Sébikotane",
          "Diamniadio",
          "Jaxaay-Parcelles Niakoul Rap",
          "Bambilor",
          "Sangalkam",
          "Sendou",
          "Yene",
          "Tivaouane Peulh-Niagha",
          "Rufisque Centre (nord)",
          "Rufisque Est",
          "Rufisque Ouest",
        ],
      },
      {
        department: "keur massar",
        communes: [
          "Yeumbeul Sud",
          "Yeumbeul Nord",
          "Jaxaay",
          "Keur Massar Sud",
          "Keur Massar Nord",
          "Malika",
        ],
      },
    ],
  },
  {
    region: "diourbel",
    departments: [
      {
        department: "diourbel",
        communes: [
          "Diourbel",
          "Dankh Sene",
          "Gade Escale",
          "N'dindy",
          "Keur N'galgou",
          "Taiba Moustapha",
          "Touba Lappe",
          "N'doulo",
          "N'gohe",
          "Patar",
          "Tocky Gare",
          "Touré M'bondé",
        ],
      },
      {
        department: "bambey",
        communes: ["Bambey", "Baba Garage", "Lambaye", "N'goye"],
      },
      {
        department: "mbacké",
        communes: [
          "Mbacké",
          "Dendeye Gouye Gui",
          "Darou Salam Typ",
          "N’dioumane  T.Thiekene",
          "Kael",
          "Touba M'boul",
          "Madina",
          "Darou Nahim",
          "Taiba Tieckene",
          "Dalla N'Gabou",
          "Missirah",
          "N'Ghaye",
          "Touba Fall",
          "Touba Mosquée",
          "Sadio",
          "Taïf",
        ],
      },
    ],
  },
  {
    region: "fatick",
    departments: [
      {
        department: "fatick",
        communes: [
          "Fatick",
          "Diofior",
          "Diaoule",
          "Mbelacadiao",
          "Ndiob",
          "Thiar Ndialgui",
          "Fimela",
          "Loul-Sessene",
          "Palmarin Facao",
          "Djilasse",
          "Ngayokheme",
          "Niakhar",
          "Patar",
          "Diarere",
          "Diouroup",
          "Tattaguine",
        ],
      },
      {
        department: "foundiougne",
        communes: [
          "Foundiougne",
          "Sokone",
          "Passy",
          "Karang Poste",
          "Soum",
          "Djilor",
          "Diossong",
          "Diagne Barka",
          "Mbam",
          "Niassene",
          "Bassoul",
          "Dionewar",
          "Djirnda",
          "Keur S.Diane",
          "Keur Samba Gueye",
          "Nioro Alassane Tall",
          "Toubacouta",
        ],
      },
      {
        department: "gossas",
        communes: [
          "Gossas",
          "Mbar",
          "Colobane",
          "Ndiene Lagane",
          "Ouadiour",
          "Patar Lia",
        ],
      },
    ],
  },
  {
    region: "kaffrine",
    departments: [
      {
        department: "kaffrine",
        communes: [
          "Kaffrine",
          "N'ganda",
          "Boulel",
          "Gniby",
          "Kahi",
          "Diokoul M’belbouck",
          "Kathiote",
          "Medinatoul Salam 2",
          "Diamagadio",
        ],
      },
      {
        department: "birkilane",
        communes: [
          "Birkilane",
          "Keur Mboucki",
          "Touba M'bella",
          "Diamal",
          "Mabo",
          "N'Diognick",
          "Mbeuleup",
          "Ségré Gatta",
        ],
      },
      {
        department: "koungheul",
        communes: [
          "Koungheul",
          "Saly Escal",
          "Fass Thiekene",
          "Ida Mouride",
          "Lour Escale",
          "Ribot Escale",
          "Gainthe Pathé",
          "Maka Yop",
          "Missirah Wadene",
        ],
      },
      {
        department: "malem hodar",
        communes: [
          "Malem Hodar",
          "Darou Miname II",
          "N'dioum N'gainth",
          "Khelcom",
          "Ndiobene Samba Lamo",
          "Dianké Souf",
          "Sagna",
        ],
      },
    ],
  },
  {
    region: "kaolack",
    departments: [
      {
        department: "kaolack",
        communes: [
          "Kaolack",
          "Kahone  ",
          "Gandiaye  ",
          "Ndoffane  ",
          "Sibassor  ",
          "Keur soce  ",
          "Ndiaffate  ",
          "Ndiedieng  ",
          "Latmingue  ",
          "Thiare  ",
          "Keur baka  ",
          "Dya  ",
          "Ndiebel  ",
          "Thiomby",
        ],
      },
      {
        department: "guinguinéo",
        communes: [
          "Guinguineo",
          "Fass",
          "Mboss",
          "Mbadakhoune",
          "Ndiago",
          "Ndiago",
          "Ngathie naoude",
          "Khelcom birame",
          "Gagnick",
          "Nguelou",
          "Ourour",
          "Dara mboss",
          "Panal ouolof",
        ],
      },
      {
        department: "nioro du rip",
        communes: [
          "Nioro",
          "Keur madiabel",
          "Kayemor",
          "Medina-sabakh",
          "Ngayene",
          "Gainte kaye",
          "Porokhane",
          "Taïba niassene",
          "Dabaly",
          "Darou salam",
          "Keur maba diakhou",
          "Ndrame escale",
          "Wack ngouna",
          "K. mandongo",
        ],
      },
    ],
  },
  {
    region: "kédougou",
    departments: [
      {
        department: "kédougou",
        communes: [
          "Kédougou",
          "Bandafassi",
          "Tomboronkoto",
          "Dindifelo",
          "Ninefecha",
          "Dimboli",
          "Fongolembi",
          "Fongolembi",
        ],
      },
      {
        department: "salémata",
        communes: [
          "Salémata",
          "Dakateli",
          "Kevoye",
          "Dar Salam",
          "Ethiolo",
          "Oubadji",
        ],
      },
      {
        department: "saraya",
        communes: [
          "Saraya",
          "Médina Baffé",
          "Bembou",
          "Khossanto",
          "Missirah Sirimana",
          "Sabodola",
        ],
      },
    ],
  },
  {
    region: "kolda",
    departments: [
      {
        department: "kolda",
        communes: [
          "Kolda",
          "Dabo",
          "Salikégné",
          "Saré Yoba Diega",
          "Dioulacolon",
          "Médina El Hadji",
          "Tankantto Escale",
          "Guiro Yero Bocar",
          "Bagadadji",
          "Coumbacara",
          "Mampatim",
          "Dialambere",
          "Médina Cherif",
          "Saré Bidji",
          "Thietty",
        ],
      },
      {
        department: "médina yoro foulah",
        communes: [
          "Médina Yoro Foulah",
          "Pata",
          "Fafacourou",
          "Badion",
          "Ndorna",
          "Bignarabe",
          "Bourouco",
          "Koulinto",
          "Dinguiraye",
          "Kerewane",
          "Niaming",
          "Niaming",
        ],
      },
      {
        department: "vélingara",
        communes: [
          "Vélingara",
          "Diaoube-Kabendou",
          "Kounkané",
          "Bonconto",
          "Linkering",
          "Médina Gounass",
          "Sinthing Koundara",
          "Ouassadou",
          "Paroumba",
          "Pakour",
          "Kandia",
          "Saré Coly Sallé",
          "Nemataba",
          "Kandiaye",
        ],
      },
    ],
  },
  {
    region: "louga",
    departments: [
      {
        department: "louga",
        communes: [
          "Ndiagne",
          "Coki",
          "Pete ouarack",
          "Thiamene cayor",
          "Guet ardo",
          "Gande",
          "K.momar sarr",
          "Nguer mala",
          "Syer",
          "Kelle gueye",
          "Mbediene",
          "Niomre",
          "Leona",
          "Ngueune sarr",
          "Sakal",
        ],
      },
      {
        department: "kébémer",
        communes: [
          "Gueoul",
          "Darou marnane",
          "Darou mousty",
          "Mbadiane",
          "Ndoyene",
          "Sam yabal",
          "Touba merina",
          "Mbacke cadior",
          "Badegne ouolof",
          "Diokoul diawrigne",
          "Kab gaye",
          "Ndande",
          "Thieppe",
          "Kanene ndiob",
          "Loro",
          "Sagatta gueth",
          "Thiolom fall",
          "Ngourane ouolof",
        ],
      },
      {
        department: "linguère",
        communes: [
          "Linguere",
          "Dahra",
          "Mbeuleukhe",
          "Barkedji",
          "Gassane",
          "Thiargny",
          "Thiel",
          "Dodji",
          "Labgar",
          "Ouarkhoh",
          "Kamb",
          "Mboula",
          "Tessekre forage",
          "Yang yang",
          "Boulal",
          "Deali",
          "Sagatta djolof",
          "Thiamene djolof",
          "Affe djoloff",
        ],
      },
    ],
  },
  {
    region: "matam",
    departments: [
      {
        department: "matam",
        communes: [
          "Matam",
          "Ourossogui",
          "Thilogne",
          "Nguidilogne",
          "Agnam-civol",
          "Orefonde",
          "Dabia",
          "Bokidiawe",
          "Nabadji-civol",
          "Ogo",
        ],
      },
      {
        department: "kanel",
        communes: [
          "Kanel",
          "Semmé",
          "Dembancane",
          "Hamady Ounaré",
          "Sinthiou bamanbe-banadji",
          "Odobéré",
          "Bokiladji",
          "Orkadieré",
          "Aouré",
          "Ndendory",
          "Ouro Sidy",
          "Ouro Sidy",
        ],
      },
      {
        department: "ranérou-ferlo",
        communes: [
          "Ranérou",
          "Lougré Thioly",
          "Velingara",
          "Oudalaye",
          "Oudalaye",
        ],
      },
    ],
  },
  {
    region: "saint-louis",
    departments: [
      {
        department: "saint-louis",
        communes: [
          "Saint-Louis",
          "Gandon",
          "Mpal",
          "Fass Ngom",
          "N'diebene Gandiole",
        ],
      },
      {
        department: "dagana",
        communes: [
          "Dagana",
          "Richard-Toll",
          "Ross-Béthio",
          "Gae",
          "Ndombo Sandjiry",
          "Mbane",
          "Bokhol",
          "Diama",
          "Ngnith",
          "Ronkh",
        ],
      },
      {
        department: "podor",
        communes: [
          "Podor",
          "Aéré Lao",
          "Ndioum",
          "Ndiandane",
          "Bodé Lao",
          "Démette",
          "Galoya Toucouleur",
          "Guédé Chantier",
          "Mboumba",
          "Aéré Lao",
          "Pété",
          "Walaldé",
          "Médina Ndiathbé",
          "Dounga Lao",
          "Mery",
          "Boké Dialloubé",
          "Mbolo Birane",
          "Fanaye",
          "Ndiayene Pendao",
          "Dodel",
          "Gamadji Saré",
          "Guédé Village",
        ],
      },
    ],
  },
  {
    region: "sédhiou",
    departments: [
      {
        department: "sédhiou",
        communes: [
          "Sedhiou",
          "Marsassoum",
          "Dianah malary",
          "Diende",
          "Sakar",
          "Diannah ba",
          "Koussy",
          "Oudoucar",
          "Sama kanta peulh",
          "Benet- bijini",
          "Sansamba",
          "Djibabouya",
          "Bambali",
          "Djiredji",
        ],
      },
      {
        department: "bounkiling",
        communes: [
          "Bounkiling",
          "Madina wandifa",
          "Ndiamacouta",
          "Boghal",
          "Tankon",
          "Djinany",
          "Ndiamalathiel",
          "Bona",
          "Diacounda",
          "Inor",
          "Kandion mangana",
          "Diaroume",
          "Diambaty",
          "Faoune",
        ],
      },
      {
        department: "goudomp",
        communes: [
          "Goudomp",
          "Diattacounda",
          "Samine",
          "Tanaff",
          "Djibanar",
          "Kaour",
          "Mangaroungou santo",
          "Simbadi Balanté",
          "Yarang Balanté",
          "Karantaba",
          "Kolibantang",
          "Niagha",
          "Simbandi Brassou",
          "Baghere",
          "Diouboudou",
        ],
      },
    ],
  },
  {
    region: "tambacounda",
    departments: [
      {
        department: "tambacounda",
        communes: [
          "Tambacounda",
          "Koussanar",
          "Sinthiou Malem",
          "Makacoulibatang",
          "N'doga Babacar",
          "Niani Toucouleur",
          "Dialacoto",
          "Missirah",
          "Nette Boulou",
        ],
      },
      {
        department: "bakel",
        communes: [
          "Bakel",
          "Diawara",
          "Kidira",
          "Gathiary",
          "Madina foulbe",
          "Sadatou",
          "Toumboura",
          "Bele",
          "Sinthiou-fissa",
          "Ballou",
          "Gabou",
          "Moudery",
        ],
      },
      {
        department: "goudiry",
        communes: [
          "Goudiry",
          "Bala",
          "Goumbayel",
          "Koar",
          "Dougue",
          "Boynguel Bamba",
          "Koussan",
          "Sinthiou Mamadou Boubou",
          "Bani Israel",
          "Boutoucoufara",
          "Dianke Makha",
          "Komoti",
          "Koulor",
          "Sinthiou Bocar Ali",
        ],
      },
      {
        department: "koumpentoum",
        communes: [
          "Koumpentoum",
          "Malem niani",
          "Bamba thialene",
          "Kahene",
          "Mereto",
          "N’dame",
          "Kouthia gaydi",
          "Kouthiaba wolof",
          "Pass koto",
          "Payar",
        ],
      },
    ],
  },
  {
    region: "thiès",
    departments: [
      {
        department: "thiès",
        communes: [
          "Khombole",
          "pout",
          "Notto",
          "Tassette",
          "N’dieyene sirakh",
          "N’goundiane",
          "Thienaba",
          "Touba toul",
          "Diender guedji",
          "Fandene",
          "Keur moussa",
          "Thies nord",
          "Thies est",
          "Thies ouest",
        ],
      },
      {
        department: "mbour",
        communes: [
          "Joal- fadiouth",
          "M’bour",
          "Guekokh",
          "N’gaparou",
          "Popoguine",
          "Saly portudal",
          "Somone",
          "Fissel",
          "N’diaganiao",
          "N’gueniene",
          "Sandiara",
          "Sessene",
          "Malicounda",
          "Diass",
          "Sindia",
        ],
      },
      {
        department: "tivaouane",
        communes: [
          "Tivaouane",
          "Mékhé",
          "Kayar",
          "Mboro",
          "Meouane",
          "Taiba Ndiaye",
          "Darou Khoudoss",
          "Koul",
          "Merina Dakhar",
          "Pekesse",
          "Mbayene",
          "N'gandiouf",
          "Niakhene",
          "Thilmakha",
          "Cherif Lô",
          "Mont-Rolland",
          "Notto Gouye Diama",
          "Pire Goureye",
          "Pambal",
        ],
      },
    ],
  },
  {
    region: "ziguinchor",
    departments: [
      {
        department: "ziguinchor",
        communes: [
          "Ziguinchor",
          "Adeane",
          "Boutoupa camara",
          "Niaguis",
          "Enampore",
          "Nyassia",
        ],
      },
      {
        department: "bignona",
        communes: [
          "Bignona",
          "Thionck-essyl",
          "Diouloulou",
          "Djibidione",
          "Oulampane",
          "Sindian",
          "Suelle",
          "Balingore",
          "Diegoune",
          "Karthiack",
          "Mangagoulack",
          "Mlomp",
          "Coubalan",
          "Niamone",
          "Ouonck",
          "Tenghory",
          "Djinaki",
          "Kafountine",
          "Kataba i",
        ],
      },
      {
        department: "oussouye",
        communes: [
          "Oussouye",
          "Djembering",
          "Santhiaba manjacque",
          "Mlomp",
          "Oukout",
        ],
      },
    ],
  },
];
