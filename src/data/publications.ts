import type { Publication } from '../types';

export const publications: Publication[] = [
  {
    slug: 'shrimp-disease-detection-localization',
    title:
      'A Multi-Stage Deep Learning Framework for Automated Detection and Localization of Shrimp Disease',
    authors: 'P. Sarkar, M. T. Hasan, A. Saha, M. M. Siraj, M. M. Abdullah',
    venue: 'Undergraduate Thesis, BRAC University',
    year: 2026,
    type: 'Undergraduate Thesis',
    area: 'Computer Vision',
    repository: 'http://hdl.handle.net/10361/28080',
    abstract:
      'Abstract not provided in the CV source. The CV identifies this as the undergraduate thesis and describes a multi-stage deep learning framework for automated shrimp disease detection and localization.',
    keywords: ['Deep learning', 'Computer vision', 'Disease detection', 'Localization'],
    links: [
      {
        label: 'BRAC University repository',
        href: 'http://hdl.handle.net/10361/28080',
        kind: 'repository',
      },
      {
        label: 'Full paper',
        href: 'https://dspace.bracu.ac.bd/xmlui/bitstream/handle/10361/28080/22101373%2c%2021301441%2c%2024341058%2c%2021301273%2c%2021201600_CSE.pdf?sequence=1&isAllowed=y',
        kind: 'report',
      },
    ],
  },
  {
    slug: 'evapotranspiration-drought-unsupervised-analysis',
    title:
      'Enhanced Unsupervised Machine Learning Analysis on Evapotranspiration and Drought Based on Satellite-Driven Data',
    authors: 'P. Sarkar, T. Paul',
    venue: '3rd International Conference on Big Data, IoT and Machine Learning (BIM 2025)',
    year: 2026,
    presentationDate: 'September 2025',
    type: 'Conference Paper',
    area: 'Geospatial Analysis',
    publisher:
      'Lecture Notes in Networks and Systems, vol. 1800, Cham: Springer, 2026, pp. 507–520',
    doi: 'https://doi.org/10.1007/978-3-032-15764-5_36',
    abstract:
      'Abstract not provided in the CV source. The listed paper concerns unsupervised machine learning analysis of evapotranspiration and drought using satellite-driven data.',
    keywords: [
      'Unsupervised learning',
      'Evapotranspiration',
      'Drought',
      'Satellite data',
      'Geospatial analysis',
    ],
    links: [
      { label: 'DOI', href: 'https://doi.org/10.1007/978-3-032-15764-5_36', kind: 'doi' },
      {
        label: 'Springer record',
        href: 'https://doi.org/10.1007/978-3-032-15764-5_36',
        kind: 'publisher',
      },
    ],
  },
  {
    slug: 'attention-st-cnn-soil-moisture',
    title:
      'A Hybrid Attention-Based ST-CNN and Penman-Monteith Framework for High-Resolution Soil Moisture Recharge Prediction Using Satellite-Driven Data',
    authors: 'T. Paul, P. Sarkar',
    venue: 'IEEE 2nd International Conference on Computing, Applications and Systems (COMPAS 2025)',
    year: 2025,
    presentationDate: 'October 2025',
    type: 'Conference Paper',
    area: 'Time-Series Forecasting',
    publisher:
      'IEEE 2nd International Conference on Computing, Applications and Systems (COMPAS 2025), Islamic University, Kushtia, Bangladesh',
    abstract:
      'Abstract not provided in the CV source. The listed paper describes an attention-based ST-CNN and Penman-Monteith framework for high-resolution soil moisture recharge prediction using satellite-driven data.',
    keywords: ['Attention', 'ST-CNN', 'Penman-Monteith', 'Soil moisture', 'Satellite data'],
    links: [
      {
        label: 'IEEE Xplore',
        href: 'https://ieeexplore.ieee.org/abstract/document/11381752',
        kind: 'publisher',
      },
    ],
  },
  {
    slug: 'wind-energy-resource-mapping',
    title:
      'Nationwide Wind Energy Resource Mapping in Bangladesh Using Self-Organizing Maps (SOM): A Machine Learning-Based Site Suitability Assessment',
    authors: 'T. Paul, P. Sarkar',
    venue: 'International Conference on Big Data, IoT and Machine Learning (BIM 2025)',
    year: 2025,
    presentationDate: 'September 2025',
    type: 'Conference Paper',
    area: 'Geospatial Analysis',
    publisher:
      'International Conference on Big Data, IoT and Machine Learning, Springer, 2025, pp. 415–429',
    abstract:
      'Abstract not provided in the CV source. The listed paper focuses on nationwide wind energy resource mapping in Bangladesh and a Self-Organizing Maps approach for site suitability assessment.',
    keywords: [
      'Self-Organizing Maps',
      'Wind energy',
      'Site suitability',
      'Bangladesh',
      'Geospatial analysis',
    ],
    links: [
      {
        label: 'Springer record',
        href: 'https://link.springer.com/chapter/10.1007/978-3-032-15346-3_29',
        kind: 'publisher',
      },
    ],
  },
];

export const publicationYears = [
  ...new Set(publications.map((publication) => publication.year)),
].sort((a, b) => b - a);
export const publicationAreas = [...new Set(publications.map((publication) => publication.area))];
export const publicationTypes = [...new Set(publications.map((publication) => publication.type))];

export function getPublication(slug: string) {
  return publications.find((publication) => publication.slug === slug);
}
