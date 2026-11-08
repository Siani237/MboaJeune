import { TalentProfile } from '../../../domain/models/talent.model';
import { DomainInfo, Opportunity } from '../../../domain/models/activity.model';
import { NewsArticle, FaqItem } from '../../../domain/models/news.model';

export const INITIAL_DOMAINS: DomainInfo[] = [
  {
    key: 'mode',
    name: 'Mode et création',
    tagline: 'Stylisme, couture et métiers de la mode',
    description: 'Découvrez les possibilités offertes par la mode, le stylisme, la couture et les métiers associés à la création textile et vestimentaire.',
    icon: 'palette',
    highlights: ['Initiation stylisme', 'Patronage et couture', 'Valorisation des matières locales']
  },
  {
    key: 'musique',
    name: 'Musique et pratiques artistiques',
    tagline: 'DJing, son et expression musicale',
    description: "Explorez l'univers musical, la pratique du DJing et les possibilités d'expression à travers le son, le mix et la création artistique.",
    icon: 'music',
    highlights: ['Initiation DJing', 'Production musicale MAO', 'Scène et performance sonore']
  },
  {
    key: 'radio',
    name: 'Radio et médias',
    tagline: 'Pratiques radiophoniques et podcasts',
    description: "Initiez-vous aux pratiques radiophoniques et découvrez les possibilités d'expression, de production sonore et de communication offertes par les médias.",
    icon: 'radio',
    highlights: ['Techniques d’animation', 'Prise de son et montage', 'Conception de podcast']
  },
  {
    key: 'numerique',
    name: 'Numérique et création digitale',
    tagline: 'Fabrication numérique, 3D et design digital',
    description: "Découvrez des pratiques liées au numérique, au graphisme et aux technologies de fabrication, notamment l'impression 3D et la découpe laser.",
    icon: 'cpu',
    highlights: ['Impression 3D & FabLab', 'Découpe laser & prototypage', 'Design graphique et digital']
  },
  {
    key: 'arts_visuels',
    name: 'Arts visuels',
    tagline: 'Peinture, photographie et arts plastiques',
    description: "Explorez différentes formes d'expression visuelle et développez votre regard créatif à travers des pratiques artistiques contemporaines.",
    icon: 'eye',
    highlights: ['Photographie créative', 'Arts plastiques', 'Expositions et scénographie']
  },
  {
    key: 'sport',
    name: 'Sport et disciplines créatives',
    tagline: 'BMX et cultures urbaines',
    description: 'Découvrez des activités sportives telles que le BMX et d’autres pratiques qui associent apprentissage, expression corporelle et dépassement de soi.',
    icon: 'activity',
    highlights: ['BMX et street sport', 'Cultures urbaines', 'Esprit d’équipe et créativité']
  },
  {
    key: 'evenementiel',
    name: 'Événementiel et initiatives culturelles',
    tagline: 'Régie, production et gestion de projets culturels',
    description: 'Découvrez les coulisses des projets culturels et événementiels, participez à des initiatives concrètes et explorez les possibilités de collaboration.',
    icon: 'calendar',
    highlights: ['Gestion logistique d’événements', 'Régie technique de spectacle', 'Médiation culturelle']
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-mock-01',
    slug: 'atelier-initiation-djing-douala',
    title: 'Atelier découverte DJing & mix sonore',
    domain: 'musique',
    domainLabel: 'Musique et pratiques artistiques',
    summary: 'Session pratique de découverte des bases du mixage et de l’univers DJ.',
    description: 'Cet atelier propose une immersion pratique dans l’art du DJing, la maîtrise des contrôleurs, le calage au tempo et la gestion d’un set musical.',
    city: 'Douala',
    venue: 'Institut français du Cameroun — Douala',
    startDate: '2026-11-20',
    endDate: '2026-11-22',
    registrationStatus: 'open',
    registrationUrl: '/communaute',
    capacity: 15,
    eligibilityNotes: 'Ouvert aux jeunes de 18 à 35 ans résidant à Douala. Débutants acceptés.',
    isMockData: true,
    status: 'open',
    updatedAt: '2026-11-01T10:00:00Z'
  },
  {
    id: 'opp-mock-02',
    slug: 'fablab-initiation-impression-3d-yaounde',
    title: 'Initiation à l’impression 3D et découpe laser',
    domain: 'numerique',
    domainLabel: 'Numérique et création digitale',
    summary: 'Découverte des machines de fabrication numérique et premiers prototypes.',
    description: 'Apprenez à modéliser un objet simple et à le fabriquer avec une imprimante 3D et une découpeuse laser dans un environnement collaboratif.',
    city: 'Yaounde',
    venue: 'Institut français du Cameroun — Yaoundé',
    startDate: '2026-12-05',
    endDate: '2026-12-07',
    registrationStatus: 'soon',
    registrationUrl: '',
    capacity: 12,
    eligibilityNotes: 'Jeunes de 18 à 35 ans. Intérêt pour le numérique ou le design.',
    isMockData: true,
    status: 'upcoming',
    updatedAt: '2026-11-03T14:30:00Z'
  },
  {
    id: 'opp-mock-03',
    slug: 'workshop-stylisme-couture-yaounde',
    title: 'Workshop Stylisme & Upcycling textile',
    domain: 'mode',
    domainLabel: 'Mode et création',
    summary: 'Atelier de création écoresponsable autour des matières textiles locales.',
    description: 'Une session d’exploration pour réinventer les tissus et accessoires à travers des techniques de patronage et de surcyclage créatif.',
    city: 'Yaounde',
    venue: 'Institut français du Cameroun — Yaoundé',
    startDate: '2026-12-12',
    endDate: '2026-12-14',
    registrationStatus: 'soon',
    capacity: 10,
    eligibilityNotes: 'Passionnés de mode et jeunes créateurs de moins de 35 ans.',
    isMockData: true,
    status: 'upcoming',
    updatedAt: '2026-11-04T09:15:00Z'
  }
];

export const INITIAL_TALENTS: TalentProfile[] = [
  {
    id: 'tal-demo-001',
    firstName: 'Amina',
    lastName: 'Ewane (Fictif)',
    birthDate: '2001-04-12',
    email: 'amina.ewane.fictif@example.cm',
    phone: '+237 600 00 00 11',
    city: 'Douala',
    currentSituation: 'student',
    educationLevel: 'Licence 2 Arts du spectacle',
    background: 'Étudiante passionnée de création textile et de stylisme contemporain.',
    interests: ['mode', 'arts_visuels'],
    skillsAndExperience: 'Dessin de mode, couture de base sur machine domestique, initiation patronage.',
    motivation: 'Souhaite perfectionner ses techniques de stylisme et intégrer des ateliers collectifs.',
    learningGoals: 'Maîtriser la coupe à plat et découvrir la valorisation des textiles locaux.',
    availability: 'Temps partiel (après-midis et week-ends)',
    status: 'new',
    consent: {
      granted: true,
      noticeVersion: 'v1.0-2026-11-cameroun-2024-017',
      acceptedAt: '2026-11-02T14:22:10Z'
    },
    createdAt: '2026-11-02T14:22:10Z',
    updatedAt: '2026-11-02T14:22:10Z'
  },
  {
    id: 'tal-demo-002',
    firstName: 'Cédric',
    lastName: 'Mbarga (Fictif)',
    birthDate: '1998-09-24',
    email: 'cedric.mbarga.fictif@example.cm',
    phone: '+237 600 00 00 22',
    city: 'Yaounde',
    currentSituation: 'graduate',
    educationLevel: 'Master Informatique',
    background: 'Jeune diplômé spécialisé en développement web et modélisation 3D.',
    interests: ['numerique', 'evenementiel'],
    skillsAndExperience: 'Blender, Three.js, impression 3D FDM basique, programmation Arduino.',
    motivation: 'Partager ses compétences avec d’autres jeunes créateurs et animer des ateliers tech.',
    learningGoals: 'Découvrir la découpe laser et la régie technique lumière/son interactive.',
    availability: 'Disponible immédiatement',
    status: 'to_review',
    consent: {
      granted: true,
      noticeVersion: 'v1.0-2026-11-cameroun-2024-017',
      acceptedAt: '2026-11-03T11:05:40Z'
    },
    createdAt: '2026-11-03T11:05:40Z',
    updatedAt: '2026-11-04T08:30:00Z'
  },
  {
    id: 'tal-demo-003',
    firstName: 'Flore',
    lastName: 'Kamdem (Fictif)',
    birthDate: '2000-01-15',
    email: 'flore.kamdem.fictif@example.cm',
    phone: '+237 600 00 00 33',
    city: 'Douala',
    currentSituation: 'entrepreneur',
    educationLevel: 'BTS Communication',
    background: 'Créatrice d’une petite web-radio associative locale.',
    interests: ['radio', 'musique'],
    skillsAndExperience: 'Animation micro, montage Audacity/Reaper, diffusion de flux live.',
    motivation: 'Professionnaliser sa démarche de production de podcast culturel.',
    learningGoals: 'Techniques d’interview journalistique et habillage sonore professionnel.',
    availability: 'Soirées et fins de semaine',
    status: 'pending',
    consent: {
      granted: true,
      noticeVersion: 'v1.0-2026-11-cameroun-2024-017',
      acceptedAt: '2026-11-04T16:45:00Z'
    },
    createdAt: '2026-11-04T16:45:00Z',
    updatedAt: '2026-11-05T10:12:00Z'
  },
  {
    id: 'tal-demo-004',
    firstName: 'Junior',
    lastName: 'Tchinda (Fictif)',
    birthDate: '2003-07-08',
    email: 'junior.tchinda.fictif@example.cm',
    phone: '+237 600 00 00 44',
    city: 'Yaounde',
    currentSituation: 'student',
    educationLevel: 'Baccalauréat C',
    background: 'Pratiquant passionné de BMX street et passionné de montage vidéo sur smartphone.',
    interests: ['sport', 'arts_visuels'],
    skillsAndExperience: 'Figures street BMX, cadrage vidéo dynamique, montage CapCut.',
    motivation: 'Participer aux démonstrations urbaines et monter un collectif de jeunes riders.',
    learningGoals: 'Organisation d’événements sportifs et prise de vue reflex/gimbal.',
    availability: 'Mercredis après-midis et week-ends',
    status: 'selected',
    consent: {
      granted: true,
      noticeVersion: 'v1.0-2026-11-cameroun-2024-017',
      acceptedAt: '2026-11-05T09:20:00Z'
    },
    createdAt: '2026-11-05T09:20:00Z',
    updatedAt: '2026-11-06T15:00:00Z'
  },
  {
    id: 'tal-demo-005',
    firstName: 'Béatrice',
    lastName: 'Ndjomo (Fictif)',
    birthDate: '1996-11-30',
    email: 'beatrice.ndjomo.fictif@example.cm',
    phone: '+237 600 00 00 55',
    city: 'Other',
    cityOther: 'Bafoussam',
    currentSituation: 'other',
    currentSituationOther: 'En reconversion professionnelle',
    educationLevel: 'Licence Lettres modernes',
    background: 'Intérêt marqué pour la régie d’expositions et la médiation dans les musées.',
    interests: ['arts_visuels', 'evenementiel'],
    skillsAndExperience: 'Rédaction de cartels, accueil du public lors de festivals scolaires.',
    motivation: 'Acquérir des méthodes rigoureuses de montage d’expositions artistiques.',
    learningGoals: 'Scénographie et gestion logistique des œuvres.',
    availability: 'Disponible pour des résidences courtes à Yaoundé ou Douala',
    status: 'to_review',
    consent: {
      granted: true,
      noticeVersion: 'v1.0-2026-11-cameroun-2024-017',
      acceptedAt: '2026-11-06T13:10:00Z'
    },
    createdAt: '2026-11-06T13:10:00Z',
    updatedAt: '2026-11-06T13:10:00Z'
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-demo-01',
    slug: 'lancement-du-programme-mboa-jeunes-creatifs',
    title: 'Lancement du programme Mboa Jeunes Créatifs à Yaoundé et Douala',
    summary: 'L’Institut français du Cameroun déploie une initiative majeure pour dynamiser la créativité des jeunes de moins de 35 ans.',
    content: `Porté par l’Institut français du Cameroun et financé par le Fonds Équipe France de l’Ambassade de France au Cameroun, le programme Mboa Jeunes Créatifs a été officiellement initié.

Il s'adresse aux jeunes de moins de 35 ans et vise à favoriser leur expression, leur formation et leur créativité dans sept domaines clés des industries culturelles et créatives : mode, musique, radio, numérique, arts visuels, sport et événementiel.

À travers des ateliers, des rencontres et des opportunités pratiques, le programme offre un espace d'apprentissage et d'expérimentation stimulant.`,
    publishedAt: '2026-11-01',
    category: 'Institutionnel',
    author: 'Équipe Mboa Jeunes Créatifs',
    isMockData: true
  },
  {
    id: 'news-demo-02',
    slug: 'ouverture-du-pool-de-talents-demonstration',
    title: 'Mise en ligne de la plateforme de démonstration du Pool de talents',
    summary: 'Découvrez en avant-première l’interface permettant de simuler l’inscription et la gestion des profils créatifs.',
    content: `Dans le cadre de la préparation des futurs appels à candidatures, la plateforme web Mboa Jeunes Créatifs présente en démonstration le fonctionnement de son Pool de talents.

Cette démonstration permet aux futurs candidats d'explorer les formulaires et aux équipes d'évaluer le système de suivi et de filtrage des compétences.`,
    publishedAt: '2026-11-05',
    category: 'Plateforme',
    author: 'Cellule Numérique',
    isMockData: true
  }
];

export const INITIAL_FAQ: FaqItem[] = [
  {
    id: 'faq-01',
    question: "Qu'est-ce que Mboa Jeunes Créatifs ?",
    answer: "Mboa Jeunes Créatifs est un programme de l'Institut français du Cameroun financé par le Fonds Équipe France de l'Ambassade de France au Cameroun. Il vise à favoriser l'expression, la formation et la créativité des jeunes dans les industries culturelles et créatives."
  },
  {
    id: 'faq-02',
    question: "À qui s'adresse le programme ?",
    answer: "Principalement aux jeunes de moins de 35 ans, qu'ils soient étudiants, passionnés, débutants ou déjà engagés dans une pratique créative."
  },
  {
    id: 'faq-03',
    question: "Dans quelles villes le programme est-il déployé ?",
    answer: "Le programme a été lancé à Yaoundé et à Douala. Certaines opportunités spécifiques peuvent s'ouvrir à d'autres localités selon les projets."
  },
  {
    id: 'faq-04',
    question: "Quels sont les domaines concernés ?",
    answer: "Le programme couvre sept domaines : la mode et création, la musique et pratiques artistiques, la radio et médias, le numérique et création digitale, les arts visuels, le sport et disciplines créatives, et l'événementiel et initiatives culturelles."
  },
  {
    id: 'faq-05',
    question: "Les activités sont-elles gratuites ?",
    answer: "Les conditions précises (gratuité, prise en charge ou sélection sur dossier) sont spécifiées pour chaque activité dans l'agenda des opportunités. L'accès aux informations du site est entièrement libre."
  },
  {
    id: 'faq-06',
    question: "Comment s'inscrire à une activité ?",
    answer: "Consultez la rubrique « Opportunités », sélectionnez l'activité souhaitée et suivez les modalités d'inscription indiquées lorsque la session est ouverte. L'inscription au Pool de talents vous permet également d'être identifié lors des prochains appels."
  },
  {
    id: 'faq-07',
    question: "Faut-il déjà avoir de l'expérience professionnelle ?",
    answer: "Non, il n'est pas nécessaire d'être un professionnel aguerri. De nombreuses sessions s'adressent aux débutants et aux personnes souhaitant découvrir un nouveau domaine créatif."
  },
  {
    id: 'faq-08',
    question: "Comment contacter l'équipe du programme ?",
    answer: "Vous pouvez nous joindre à l'Institut français du Cameroun (127 Avenue du Président Ahmadou Ahidjo, Yaoundé), par téléphone (+237 222 22 09 44 / +237 690 261 970) ou par e-mail (info.yde@ifcameroun.com). Coordonnées soumises à validation officielle."
  }
];
