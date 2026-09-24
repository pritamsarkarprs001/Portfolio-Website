/**
 * Plain-text LaTeX source supplied in the project brief.
 * This string is displayed as text only. It is never passed to an evaluator,
 * shell, browser runtime, or LaTeX compiler.
 *
 * Update: replace this value with the exact CV source if a newer revision is
 * supplied. Keep backticks and template-literal delimiters escaped if needed.
 */
export const cvSourceAvailable = true;

function rawTemplate(strings: TemplateStringsArray) {
  return strings.raw[0].replaceAll('\\`', '`');
}

export const cvSource = rawTemplate`%-------------------------
% ATS-Optimized CV for Pritam Sarkar
%-------------------------

\documentclass[11pt,a4paper]{article}

\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.7in, top=0.45in, bottom=0.45in]{geometry}
\usepackage{hyperref}
\usepackage{enumitem}
\usepackage{titlesec}
\usepackage{parskip}
\usepackage{xcolor}
\usepackage{tabularx}
\usepackage{array}
\usepackage{multicol}

\hypersetup{
    colorlinks=true,
    urlcolor=black,
    linkcolor=black,
    pdfauthor={Pritam Sarkar},
    pdftitle={Pritam Sarkar - CV},
    pdfsubject={Curriculum Vitae},
    pdfkeywords={Machine Learning, AI, Data Science, Computer Science}
}

\titleformat{\section}
  {\large\bfseries\uppercase}{}{0em}{}[\titlerule]
\titlespacing{\section}{0pt}{5pt}{2pt}

\setlength{\parindent}{0pt}
\setlist[itemize]{noitemsep, topsep=2pt, leftmargin=1.2em}

\newcommand{\cvheading}[1]{\textbf{#1}}
\newcommand{\cventry}[4]{%
  \textbf{#1} \hfill \textit{#2} \\
  \textit{#3} \hfill #4 \\
}

\begin{document}

\begin{center}
  {\LARGE \textbf{PRITAM SARKAR}}\\[4pt]
  Rampura, Dhaka, Bangladesh \\[2pt]
  \href{mailto:pritamsarkar.prs@gmail.com}{pritamsarkar.prs@gmail.com} \quad | \quad
  +880 1937030596 \\[2pt]
  \href{https://www.linkedin.com/in/pritam-sarkar-5aba07212/}{linkedin.com/in/pritam-sarkar-5aba07212} \quad | \quad
  \href{https://github.com/pritamsarkarprs001}{GitHub} \quad | \quad
  \href{https://scholar.google.com/citations?user=7gBgU5MAAAAJ&hl=en}{Google Scholar} \quad | \quad
  ORCID: \href{https://orcid.org/0009-0006-1297-4760}{0009-0006-1297-4760}
\end{center}

\vspace{2pt}

\section{Professional Summary}

Fresh Computer Science undergraduate from BRAC University seeking entry-level and internship opportunities across multiple sectors. Strong foundation in machine learning, data analysis, and software development, with hands-on experience in geospatial, time-series, and multimodal data processing. Technical skills include Python, PyTorch, TensorFlow, SQL, data analysis, and end-to-end MLOps pipelines, with practical experience in cloud deployment and full-stack development. Published researcher (IEEE, Springer) with experience in model development, evaluation, and technical documentation. Demonstrates strong communication, teamwork, problem-solving, and organizational skills. Adaptable, detail-oriented, and committed to delivering high-quality work in both technical and general professional roles. Open to diverse job functions and industries, with a focus on continuous learning and professional growth.

\section{Work Experience}

\textbf{Information Technology Intern} \hfill \textit{Aug 2026 -- Present} \\
\textit{Modhumoti Bank PLC.} \hfill Internship $\cdot$ Gulshan, Dhaka, Bangladesh (On-site)
\begin{itemize}
  \item Provide technical support and troubleshoot hardware, software, and system-related issues.
  \item Assist with IT infrastructure, network monitoring, and system maintenance and configuration.
  \item Support documentation and routine IT security procedures.
  \item Collaborate with the IT team to ensure smooth daily operations.
\end{itemize}

\vspace{3pt}

\textbf{Undergraduate Researcher (Thesis \& Independent Research)} \hfill \textit{Jan 2025 -- Jan 2026} \\
\textit{BRAC University, Dhaka, Bangladesh}
\begin{itemize}
  \item Led development of a multi-stage deep learning framework for automated detection and localization of shrimp disease as part of undergraduate thesis research.
  \item Co-authored three additional peer-reviewed papers on satellite-driven evapotranspiration/drought analysis, soil moisture recharge prediction, and wind energy resource mapping, published/presented via IEEE and Springer.
  \item Presented research findings at three international conferences (IEEE COMPAS 2025; BIM 2025; RAAICON 2026).
\end{itemize}

\section{Education}

\textbf{Bachelor of Science (B.Sc.) in Computer Science} \hfill Jan 2022 -- Apr 2026 \\
BRAC University, Dhaka, Bangladesh \hfill

\vspace{3pt}

\textbf{Higher Secondary Certificate (HSC) -- Science} \hfill Jul 2018 -- Dec 2020 \\
Dhaka City College, Dhaka, Bangladesh \hfill GPA: 5.00 / 5.00

\vspace{3pt}

\textbf{Secondary School Certificate (SSC) -- Science} \hfill Jan 2013 -- Apr 2018 \\
Motijheel Government Boys' High School, Dhaka, Bangladesh \hfill GPA: 5.00 / 5.00

\section{Research \& Publications}

\textbf{A Multi-Stage Deep Learning Framework for Automated Detection and Localization of Shrimp Disease} \\
\textbf{P. Sarkar}, M. T. Hasan, A. Saha, M. M. Siraj, M. M. Abdullah \\
\textit{Undergraduate Thesis, BRAC University, January 2026} \\
Repository: \href{http://hdl.handle.net/10361/28080}{http://hdl.handle.net/10361/28080} \quad | \quad
\href{https://dspace.bracu.ac.bd/xmlui/bitstream/handle/10361/28080/22101373\%2c\%2021301441\%2c\%2024341058\%2c\%2021301273\%2c\%2021201600_CSE.pdf?sequence=1&isAllowed=y}{Full Paper}

\vspace{3pt}

\textbf{Enhanced Unsupervised Machine Learning Analysis on Evapotranspiration and Drought Based on Satellite-Driven Data} \\
\textbf{P. Sarkar}, T. Paul \\
\textit{3rd International Conference on Big Data, IoT and Machine Learning (BIM 2025), Dhaka International University, Bangladesh, September 2025} \\
\textit{Lecture Notes in Networks and Systems, vol. 1800, Cham: Springer, 2026, pp. 507--520} \\
DOI: \href{https://doi.org/10.1007/978-3-032-15764-5_36}{https://doi.org/10.1007/978-3-032-15764-5\_36} \quad | \quad
\href{https://link.springer.com/chapter/10.1007/978-3-032-15764-5_36}{Publisher Page}

\vspace{3pt}

\textbf{A Hybrid Attention-Based ST-CNN and Penman-Monteith Framework for High-Resolution Soil Moisture Recharge Prediction Using Satellite-Driven Data} \\
T. Paul, \textbf{P. Sarkar} \\
\textit{IEEE 2nd International Conference on Computing, Applications and Systems (COMPAS 2025), Islamic University, Kushtia, Bangladesh, October 2025} \\
\href{https://ieeexplore.ieee.org/abstract/document/11381752}{https://ieeexplore.ieee.org/abstract/document/11381752}

\vspace{3pt}

\textbf{Nationwide Wind Energy Resource Mapping in Bangladesh Using Self-Organizing Maps (SOM): A Machine Learning-Based Site Suitability Assessment} \\
T. Paul, \textbf{P. Sarkar} \\
\textit{International Conference on Big Data, IoT and Machine Learning, Springer, 2025 (pp. 415--429)} \\
\href{https://link.springer.com/chapter/10.1007/978-3-032-15346-3_29}{https://link.springer.com/chapter/10.1007/978-3-032-15346-3\_29}

\section{Conferences \& Presentations}

\textbf{Presenter}

\begin{itemize}

  \item \`\`A Multi-Stage Deep Learning Framework for Automated Detection and Localization of Shrimp Disease,'' IEEE 5th International Conference on Robotics, Automation, Artificial-Intelligence and Internet-of-Things (RAAICON 2026), Jashore University of Science and Technology, Jashore, Bangladesh, September 2026.
  \href{https://drive.google.com/file/d/1Dea0825SqY5pq62OYisFWQ7V2dkWoHKl/view?usp=sharing}{[Certificate]}

  \item \`\`A Hybrid Attention-Based ST-CNN and Penman-Monteith Framework for High-Resolution Soil Moisture Recharge Prediction Using Satellite-Driven Data,'' IEEE 2nd International Conference on Computing, Applications and Systems (COMPAS 2025), Islamic University, Kushtia, Bangladesh, October 2025.
  \href{https://drive.google.com/file/d/11yMvAQymkmGxdQEAppDO2fKwtEN9WSpH/view?pli=1}{[Certificate]}

  \item \`\`Nationwide Wind Energy Resource Mapping in Bangladesh Using Self-Organizing Maps (SOM): A Machine Learning-Based Site Suitability Assessment,'' 3rd International Conference on Big Data, IoT and Machine Learning (BIM 2025), Dhaka International University, Bangladesh, September 2025.
  \href{https://drive.google.com/file/d/1sKDz83z-fTfuYY8O1Gqqh6m3cYbIdyFp/view}{[Certificate]}

  \item \`\`Enhanced Unsupervised Machine Learning Analysis on Evapotranspiration and Drought Based on Satellite-Driven Data,'' 3rd International Conference on Big Data, IoT and Machine Learning (BIM 2025), Dhaka International University, Bangladesh, September 2025.
  \href{https://drive.google.com/file/d/1xA6Lj45We5X-fxS70xCck7c1aAy_KHLH/view}{[Certificate]}

\end{itemize}

\section{Projects}

\textbf{DeepResearch AI} \hfill \href{https://github.com/pritamsarkarprs001/-DeepResearch-AI}{GitHub Repository} \\
\textit{Multi-Agent Systems $\cdot$ LangGraph $\cdot$ RAG $\cdot$ ChromaDB $\cdot$ LLM Tool Use $\cdot$ Streamlit} \\
Built a full-stack AI research assistant using a 4-agent pipeline (Planner $\to$ Researcher $\to$ Critic $\to$ Synthesizer) orchestrated with LangGraph. The system accepts any research topic, retrieves context from uploaded PDF documents via RAG (ChromaDB and Sentence Transformers) as well as the live web (Wikipedia and DuckDuckGo), self-critiques its findings, and generates a fully written, cited research report with one-click PDF download -- powered entirely by free tools including Groq's Llama 3.1 and Streamlit. Demonstrates proficiency in RAG pipelines, multi-agent state machines, vector databases, LLM tool use, and production UI deployment on Streamlit Cloud, with full local usability.

\vspace{3pt}

\textbf{AutoRecruiter -- Local AI Recruitment Automation Agent} \hfill \href{https://github.com/pritamsarkarprs001/Auto-Recruiter}{GitHub Repository} \\
\textit{OCR $\cdot$ Local LLMs (Ollama) $\cdot$ ChromaDB $\cdot$ Semantic Search $\cdot$ Streamlit} \\
Developed a fully local AI-powered recruitment automation platform that parses resumes (PDF, DOCX, and scanned images), extracts structured candidate information using OCR and local LLMs, and ranks applicants through semantic similarity, skills matching, and AI-based evaluation. Generates customized interview questions per candidate and stores profiles in a searchable ChromaDB vector database. Built with Python, Streamlit, Ollama, Tesseract OCR, and ChromaDB, ensuring complete data privacy by eliminating reliance on cloud APIs.

\vspace{3pt}

\textbf{Agri-Scan AI} \hfill \href{https://lnkd.in/dGxv5mt5}{GitHub Repository} \quad | \quad \href{https://lnkd.in/dJgjMDhX}{Live Demo} \\
\textit{Deep Learning $\cdot$ Computer Vision $\cdot$ EfficientNet-B0 $\cdot$ ONNX $\cdot$ Streamlit} \\
Intelligent agricultural diagnostic web application that detects 22 crop disease phenotypes across Cashew, Cassava, Maize, and Tomato. Utilizes a fine-tuned EfficientNet-B0 architecture optimized for edge deployment via ONNX. Pipeline incorporates CLAHE-based image normalization and aggressive geometric augmentation for robustness in diverse field conditions. Demonstrates end-to-end MLOps proficiency from automated data sanitization and model optimization to a live, user-centric web interface hosted on Streamlit Cloud.

\vspace{3pt}

\textbf{Air Touch Control System} \hfill \href{https://github.com/pritamsarkarprs001/air-touch-control-system}{GitHub Repository} \\
\textit{Computer Vision $\cdot$ MediaPipe $\cdot$ OpenCV $\cdot$ Python $\cdot$ HCI} \\
Real-time touchless desktop interaction system using hand gesture recognition via OpenCV and MediaPipe's 21-point hand tracking. Key engineering contributions include: an Exponential Moving Average (EMA) filter ($\alpha = 0.25$) to eliminate camera jitter with sub-15ms latency; a state-machine-based drag-and-drop engine to prevent click-looping; and a virtual joystick scroll/zoom mechanism using a mid-air coordinate anchor to mitigate hand fatigue. Supports precision cursor control, left/right click, continuous scroll, and pinch-to-zoom. Packaged as a standalone Windows executable via PyInstaller for zero-dependency deployment.

\vspace{3pt}

\textbf{Audio-Lyrics Clustering} \hfill \href{https://github.com/Pritam-Sark/CSE425-Audio-Lyrics-Clustering}{GitHub Repository} \quad | \quad \href{https://drive.google.com/file/d/14J31Uf4gOnc8m37_-I5ODra8JDz4VHIy/view}{Project Report} \\
\textit{Deep Learning $\cdot$ Multimodal Fusion $\cdot$ Python $\cdot$ PyTorch / TensorFlow} \\
Implemented a deep learning pipeline to cluster music tracks by fusing Audio Spectrograms with Lyrics embeddings. Applied multimodal feature extraction -- mel-spectrograms for audio and transformer-based encoders for lyric text -- followed by joint representation learning and unsupervised clustering. Demonstrates expertise in multimodal AI, signal processing, and NLP applied to real-world unstructured data.

\section{Technical Skills}

\textbf{Programming Languages} \\
Python (Advanced), JavaScript (ES6+), C++, SQL, Bash / Shell Scripting, HTML, CSS

\vspace{2pt}
\textbf{AI \& Deep Learning} \\
CNNs (ResNet, EfficientNet, ConvNeXt-Tiny), RNNs, LSTMs, GRUs; Computer Vision (Image Classification, Object Detection, Semantic Segmentation, Grad-CAM); Spatiotemporal Forecasting; Explainable AI / XAI (SHAP, LIME, Integrated Gradients); Multi-Agent Systems (LangGraph), Retrieval-Augmented Generation (RAG); PyTorch, TensorFlow, Keras, Scikit-learn

\vspace{2pt}
\textbf{Data Science \& Statistical Analysis} \\
Exploratory Data Analysis (EDA), Feature Engineering, Hypothesis Testing, ANOVA, Bayesian Inference, Regression (Linear / Logistic / Polynomial), SMOTE; NASA POWER weather data processing, Geospatial \& Remote Sensing analysis; Pandas, NumPy, SciPy, Matplotlib, Seaborn, Plotly

\vspace{2pt}
\textbf{Data Analytics Software} \\
Jupyter Notebook, Google Colab, Microsoft Excel (Advanced -- PivotTables, VLOOKUP, data modelling), Tableau, Power BI

\vspace{2pt}
\textbf{MLOps \& Pipelines} \\
ETL pipelines, Data Ingestion \& Validation; Git, DVC, MLflow; Docker, Flask, FastAPI; Apache Airflow (Basic), Prefect, GitHub Actions; AWS S3, Heroku, Netlify; CI/CD for ML

\vspace{2pt}
\textbf{Data Engineering} \\
PostgreSQL, MySQL, MongoDB, ChromaDB, Pinecone (Vector Databases); Advanced SQL, Query Optimization, Data Warehousing concepts; RESTful API development

\vspace{2pt}
\textbf{Software Engineering \& Web Development} \\
MERN Stack (MongoDB, Express.js, React.js, Node.js); OOP, MVC Architecture, Microservices; Agile / Scrum, Test-Driven Development (TDD); Git, GitHub, Bitbucket, Docker, Postman, PyCharm, VS Code

\vspace{2pt}
\textbf{Networking \& Cybersecurity} \\
TCP/IP Suite, OSI Model, DNS, DHCP, Subnetting, Routing \& Switching; Firewalls, VPNs, SSL/TLS, SSH, Encryption Standards; Cisco Packet Tracer, Wireshark, GNS3; AWS (Basic)

\vspace{2pt}
\textbf{Operating Systems} \\
Linux / Ubuntu (CLI, Bash Scripting, system administration), Windows 10/11

\vspace{2pt}
\textbf{General Computer \& Productivity Skills} \\
Microsoft Office Suite (Word, Excel, PowerPoint), Google Workspace (Docs, Sheets, Slides, Drive, Colab), LaTeX (Technical Document Preparation), Overleaf, Notion; Technical Report Writing, Research Documentation, Presentation Design

\section{Certifications}

\begin{itemize}

  \item \textbf{IELTS Academic -- Overall Band Score: 7.0 (C1)} \\
  British Council $\cdot$ Candidate ID: A03330405 \\
  Listening: 8.0 $\cdot$ Reading: 7.0 $\cdot$ Writing: 6.5 $\cdot$ Speaking: 6.0 \\
  \href{https://drive.google.com/file/d/1RE05ZUYJ7RSF6LgRDxKRYeidip1FEwZr/view?usp=sharing}{View Certificate}

  \item \textbf{Associate AI Engineer for Data Scientists} \\
  DataCamp $\cdot$ Jun 2026 $\cdot$ Credential ID: 8144b1e39d1cbb09b26c2328234401d640132c94 \\
  \href{https://www.datacamp.com/completed/statement-of-accomplishment/track/8144b1e39d1cbb09b26c2328234401d640132c94}{Verify Certificate}

  \item \textbf{Supervised Machine Learning: Regression and Classification} \\
  DeepLearning.AI \& Stanford University $\cdot$ Aug 2025 $\cdot$ Credential ID: YAEE0TZCOZOT \\
  \href{https://www.coursera.org/account/accomplishments/verify/YAEE0TZCOZOT}{Verify Certificate}

  \item \textbf{Connect and Protect: Networks and Network Security} \\
  Google $\cdot$ Nov 2024 $\cdot$ Credential ID: PS20M704EGZI \\
  \href{https://www.coursera.org/account/accomplishments/verify/PS20M704EGZI}{Verify Certificate}

  \item \textbf{Google AI Essentials} \\
  Google $\cdot$ Nov 2024 $\cdot$ Credential ID: 0K6PNPZ35RX9 \\
  \href{https://www.coursera.org/account/accomplishments/verify/0K6PNPZ35RX9}{Verify Certificate}

  \item \textbf{Databases and SQL for Data Science with Python (with Honors)} \\
  IBM $\cdot$ Nov 2024 $\cdot$ Credential ID: UDJERO3UMJ71 \\
  \href{https://www.coursera.org/account/accomplishments/verify/UDJERO3UMJ71}{Verify Certificate}

  \item \textbf{Play It Safe: Manage Security Risks} \\
  Google $\cdot$ May 2024 $\cdot$ Credential ID: 92DQW62K5DJX \\
  \href{https://www.coursera.org/account/accomplishments/verify/92DQW62K5DJX}{Verify Certificate}

  \item \textbf{Foundations of Cybersecurity} \\
  Google $\cdot$ May 2024 $\cdot$ Credential ID: QNNS7VZR384S \\
  \href{https://www.coursera.org/account/accomplishments/verify/QNNS7VZR384S}{Verify Certificate}

\end{itemize}

\section{Languages}

\begin{tabular}{ll}
  Bengali  & Native / Bilingual \\
  English  & Professional Working Proficiency -- IELTS Band 7.0 / C1 \href{https://drive.google.com/file/d/1RE05ZUYJ7RSF6LgRDxKRYeidip1FEwZr/view?usp=sharing}{[Certificate]} \\
  Hindi    & Conversational \\
  German   & Elementary (A1 -- Currently Learning) \\
\end{tabular}

\section{Hobbies \& Interests}

Vocal performance and appreciation of diverse musical genres, encompassing both classical and contemporary compositions. Avid reader of literary fiction, non-fiction, and academic literature spanning technology, science, and social sciences. Enthusiast of international television series and cinematic productions, with a particular interest in narrative storytelling, character development, and cross-cultural perspectives.

\section{Personal Information}

\begin{tabular}{ll}
  Nationality: & Bangladeshi \\
  Date of Birth: & 29 December 2002 \\
\end{tabular}

\end{document}
`;

export const cvSourceWarning =
  'This source preview may contain personal information. It is rendered as plain text and is not executed in the browser.';
