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
    image: 'images/mode-creatif-1.jpg',
    highlights: ['Initiation stylisme', 'Patronage et couture', 'Valorisation des matières locales']
  },
  {
    key: 'musique',
    name: 'Musique et pratiques artistiques',
    tagline: 'DJing, son et expression musicale',
    description: "Explorez l'univers musical, la pratique du DJing et les possibilités d'expression à travers le son, le mix et la création artistique.",
    icon: 'music',
    image: 'images/musique-guitare.jpg',
    highlights: ['Initiation DJing', 'Production musicale MAO', 'Scène et performance sonore']
  },
  {
    key: 'radio',
    name: 'Radio et médias',
    tagline: 'Pratiques radiophoniques et podcasts',
    description: "Initiez-vous aux pratiques radiophoniques et découvrez les possibilités d'expression, de production sonore et de communication offertes par les médias.",
    icon: 'radio',
    image: 'images/radio-podcast-studio.jpg',
    highlights: ['Techniques d’animation', 'Prise de son et montage', 'Conception de podcast']
  },
  {
    key: 'numerique',
    name: 'Numérique et création digitale',
    tagline: 'Fabrication numérique, 3D et design digital',
    description: "Découvrez des pratiques liées au numérique, au graphisme et aux technologies de fabrication, notamment l'impression 3D et la découpe laser.",
    icon: 'cpu',
    image: 'images/numerique-developpeur.jpg',
    highlights: ['Impression 3D & FabLab', 'Découpe laser & prototypage', 'Design graphique et digital']
  },
  {
    key: 'arts_visuels',
    name: 'Arts visuels',
    tagline: 'Peinture, photographie et arts plastiques',
    description: "Explorez différentes formes d'expression visuelle et développez votre regard créatif à travers des pratiques artistiques contemporaines.",
    icon: 'eye',
    image: 'images/arts-visuels-artiste.jpg',
    highlights: ['Photographie créative', 'Arts plastiques', 'Expositions et scénographie']
  },
  {
    key: 'sport',
    name: 'Sport et disciplines créatives',
    tagline: 'BMX et cultures urbaines',
    description: 'Découvrez des activités sportives telles que le BMX et d’autres pratiques qui associent apprentissage, expression corporelle et dépassement de soi.',
    icon: 'activity',
    image: 'images/sport-urbain.jpg',
    highlights: ['BMX et street sport', 'Cultures urbaines', 'Esprit d’équipe et créativité']
  },
  {
    key: 'evenementiel',
    name: 'Événementiel et initiatives culturelles',
    tagline: 'Régie, production et gestion de projets culturels',
    description: 'Découvrez les coulisses des projets culturels et événementiels, participez à des initiatives concrètes et explorez les possibilités de collaboration.',
    icon: 'calendar',
    image: 'images/evenementiel-culturel.jpg',
    highlights: ['Gestion logistique d’événements', 'Régie technique de spectacle', 'Médiation culturelle']
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-01',
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
    image: 'images/musique-guitare.jpg',
    eligibilityNotes: 'Ouvert aux jeunes de 18 à 35 ans résidant à Douala. Débutants acceptés.',
    isMockData: false,
    status: 'open',
    updatedAt: '2026-11-01T10:00:00Z'
  },
  {
    id: 'opp-02',
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
    registrationUrl: '/communaute',
    capacity: 12,
    image: 'images/numerique-developpeur.jpg',
    eligibilityNotes: 'Jeunes de 18 à 35 ans. Intérêt pour le numérique ou le design.',
    isMockData: false,
    status: 'upcoming',
    updatedAt: '2026-11-03T14:30:00Z'
  },
  {
    id: 'opp-03',
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
    image: 'images/mode-creatif-1.jpg',
    eligibilityNotes: 'Passionnés de mode et jeunes créateurs de moins de 35 ans.',
    isMockData: false,
    status: 'upcoming',
    updatedAt: '2026-11-04T09:15:00Z'
  }
];

export const INITIAL_TALENTS: TalentProfile[] = [
  {
    id: 'tal-001',
    firstName: 'Amina',
    lastName: 'Ewane',
    birthDate: '2001-04-12',
    email: 'amina.ewane@mboacreatifs.cm',
    phone: '+237 690 12 34 56',
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
    id: 'tal-002',
    firstName: 'Cédric',
    lastName: 'Mbarga',
    birthDate: '1998-09-24',
    email: 'cedric.mbarga@mboacreatifs.cm',
    phone: '+237 670 23 45 67',
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
    id: 'tal-003',
    firstName: 'Flore',
    lastName: 'Kamdem',
    birthDate: '2000-01-15',
    email: 'flore.kamdem@mboacreatifs.cm',
    phone: '+237 699 34 56 78',
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
    id: 'tal-004',
    firstName: 'Junior',
    lastName: 'Tchinda',
    birthDate: '2003-07-08',
    email: 'junior.tchinda@mboacreatifs.cm',
    phone: '+237 655 45 67 89',
    city: 'Yaounde',
    currentSituation: 'student',
    educationLevel: 'Baccalauréat C',
    background: 'Pratiquant passionné de BMX street et passionné de montage vidéo sur smartphone.',
    interests: ['sport', 'arts_visuels'],
    skillsAndExperience: 'Figures street BMX, cadrage vidéo dynamique, montage CapCut.',
    motivation: 'Participer aux activités urbaines et monter un collectif de jeunes riders.',
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
    id: 'tal-005',
    firstName: 'Béatrice',
    lastName: 'Ndjomo',
    birthDate: '1996-11-30',
    email: 'beatrice.ndjomo@mboacreatifs.cm',
    phone: '+237 677 56 78 90',
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
    id: 'news-01',
    slug: 'lancement-du-programme-mboa-jeunes-creatifs',
    title: 'Lancement du programme Mboa Jeunes Créatifs à Yaoundé et Douala',
    summary: 'L’Institut français du Cameroun déploie une initiative majeure pour dynamiser la créativité des jeunes de moins de 35 ans.',
    content: `Porté par l’Institut français du Cameroun et financé par le Fonds Équipe France de l’Ambassade de France au Cameroun, le programme Mboa Jeunes Créatifs est officiellement lancé.

Il s'adresse aux jeunes de moins de 35 ans et vise à favoriser leur expression, leur formation et leur créativité dans sept domaines clés des industries culturelles et créatives : mode, musique, radio, numérique, arts visuels, sport et événementiel.

À travers des ateliers, des rencontres et des opportunités concrètes, le programme offre un espace d'apprentissage et d'expérimentation stimulant accessible à tous.`,
    publishedAt: '12 Novembre 2026',
    category: 'Institutionnel',
    author: 'Institut français du Cameroun',
    image: 'images/equipe-collaboration.jpg',
    isMockData: false
  },
  {
    id: 'news-02',
    slug: 'ouverture-du-pool-de-talents',
    title: 'Ouverture officielle du Pool de talents Mboa Jeunes Créatifs',
    summary: 'Les jeunes créateurs, artistes, techniciens et étudiants peuvent désormais s’enregistrer pour participer aux ateliers.',
    content: `La plateforme Mboa Jeunes Créatifs ouvre officiellement son Pool de talents aux jeunes de Yaoundé, Douala et de tout le Cameroun.

Ce dispositif permanent permet d'identifier les compétences émergentes, de qualifier les projets et de proposer des parcours de renforcement sur mesure avec des mentors reconnus des industries culturelles et créatives.`,
    publishedAt: '15 Novembre 2026',
    category: 'Opportunité',
    author: 'Direction du Programme',
    image: 'images/atelier-creation.jpg',
    isMockData: false
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
    answer: "Principalement aux jeunes de moins de 35 ans résidant au Cameroun, qu'ils soient étudiants, passionnés, débutants ou déjà engagés dans une pratique créative."
  },
  {
    id: 'faq-03',
    question: "Dans quelles villes le programme est-il déployé ?",
    answer: "Le programme est déployé à Yaoundé et à Douala. Certaines opportunités spécifiques peuvent s'ouvrir à d'autres localités selon les projets."
  },
  {
    id: 'faq-04',
    question: "Quels sont les domaines concernés ?",
    answer: "Le programme couvre sept domaines : la mode et création, la musique et pratiques artistiques, la radio et médias, le numérique et création digitale, les arts visuels, le sport et disciplines créatives, et l'événementiel et initiatives culturelles."
  },
  {
    id: 'faq-05',
    question: "Les activités sont-elles gratuites ?",
    answer: "Oui, la majorité des ateliers et formations proposés dans le cadre du programme sont entièrement pris en charge. Les conditions précises sont indiquées sur chaque fiche d'activité."
  },
  {
    id: 'faq-06',
    question: "Comment s'inscrire à une activité ?",
    answer: "Consultez la rubrique « Opportunités », sélectionnez l'activité souhaitée et postulez directement en ligne. L'inscription au Pool de talents vous permet également d'être prioritairement contacté lors des prochains appels."
  },
  {
    id: 'faq-07',
    question: "Faut-il déjà avoir de l'expérience professionnelle ?",
    answer: "Non, il n'est pas nécessaire d'être un professionnel aguerri. De nombreuses sessions s'adressent aux débutants et aux personnes souhaitant découvrir un nouveau domaine créatif."
  },
  {
    id: 'faq-08',
    question: "Comment contacter l'équipe du programme ?",
    answer: "Vous pouvez nous joindre à l'Institut français du Cameroun (127 Avenue du Président Ahmadou Ahidjo, Yaoundé), par téléphone (+237 222 22 09 44 / +237 690 261 970) ou par e-mail (info.yde@ifcameroun.com)."
  }
];
