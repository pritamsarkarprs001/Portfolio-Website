export const profile = {
  name: 'Pritam Sarkar',
  initials: 'PS',
  role: 'Computer Science Graduate | Machine Learning Engineer | AI Researcher | Data Scientist',
  location: 'Rampura, Dhaka, Bangladesh',
  shortLocation: 'Dhaka, Bangladesh',
  email: 'pritamsarkar.prs@gmail.com',
  // Kept for controlled/private use; not rendered in prominent public sections.
  phone: '+880 1937030596',
  availability: 'Open to opportunities',
  availabilityNote: 'Open to research, engineering, and data-focused opportunities.',
  cvPdfAvailable: true,
  tagline:
    'Building practical AI systems and research-driven machine learning solutions across computer vision, multimodal learning, geospatial analysis, and intelligent automation.',
  bio: [
    'Fresh Computer Science undergraduate from BRAC University seeking entry-level and internship opportunities across multiple sectors. I bring a foundation in machine learning, data analysis, and software development, with hands-on experience in geospatial, time-series, and multimodal data processing.',
    'My work also includes Python, PyTorch, TensorFlow, SQL, data analysis, and end-to-end MLOps pipelines, with practical experience in cloud deployment and full-stack development. I am a published researcher with experience in model development, evaluation, and technical documentation.',
    'I am adaptable, detail-oriented, and committed to continuous learning and professional growth across technical and general professional roles.',
  ],
  thesisTitle:
    'A Multi-Stage Deep Learning Framework for Automated Detection and Localization of Shrimp Disease',
  currentWork: 'Information Technology Intern at Modhumoti Bank PLC.',
  photo: {
    src: `${import.meta.env.BASE_URL}assets/profile/pritam-sarkar.jpg`,
    alt: 'Portrait of Pritam Sarkar',
    width: 864,
    height: 1152,
    available: true,
    objectPosition: 'center top',
    replacementNote:
      'The supplied portrait is stored at public/assets/profile/pritam-sarkar.jpg. Replace it with an approved image and update src when needed.',
  },
  secondaryPhoto: {
    src: `${import.meta.env.BASE_URL}assets/profile/pritam-sarkar-formal.jpg`,
    alt: 'Formal portrait of Pritam Sarkar',
    width: 1536,
    height: 1536,
    available: true,
    objectPosition: 'center top',
    replacementNote:
      'The supplied formal portrait is stored at public/assets/profile/pritam-sarkar-formal.jpg.',
  },
  photoLabels: {
    standard: 'Standard portrait',
    researcher: 'Researcher card',
    technical: 'Technical profile',
    formal: 'Formal portrait',
    openTo: 'Open to opportunities',
    currentBuilding: 'building with care',
    researcherDescription:
      'Researcher card · computer vision, geospatial analysis, and applied machine learning.',
    technicalDescription:
      'Technical profile · data pipelines, model workflows, and reliable software.',
    formalDescription: 'Formal portrait · a clean academic and professional profile view.',
  },
  languagesIntro: 'Languages I use in research, study, and everyday communication.',
  interests:
    'Vocal performance, diverse musical genres, literary and academic reading, technology and science literature, international television series, cinema, narrative storytelling, character development, and cross-cultural perspectives.',
} as const;

export const supportedStats = [
  { value: 4, label: 'research publications & thesis works', detail: 'Listed in the CV' },
  { value: 4, label: 'conference presentations', detail: 'Across four entries' },
  { value: 5, label: 'featured projects', detail: 'Selected portfolio work' },
  { value: 4, label: 'languages listed', detail: 'Bengali, English, Hindi, German' },
];

export const cvPath = `${import.meta.env.BASE_URL}assets/Pritam-Sarkar-CV.pdf`;
