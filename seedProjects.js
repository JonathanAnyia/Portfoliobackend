// seedProjects.js
require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/projectModels');

const projects = [
  {
    title: "TB Epidemiological Risk Assessment",
    slug: "tb-epidemiological-risk",
    description:
      "Built case-control assignment algorithm utilizing clinical, behavioral, and self-report data from over 50 variables. Implemented Random Forest and Logistic Regression models to predict active tuberculosis progression in 1000+ patients from rural South African clinics.",
    overview:
      "This project evaluates epidemiological and clinical risk factors associated with tuberculosis progression using machine learning approaches.",
    methods:
      "Random Forest and Logistic Regression models were trained on clinical, behavioral, and self-reported patient data.",
    impact:
      "The model improves early TB risk stratification in low-resource clinical settings.",
    imageGalleryTitle: "Epidemiological Analysis",
    imageGallerySubtitle: "Feature importance and risk distribution visualizations",
    technologies: [
      "Python",
      "Random Forest",
      "Logistic Regression",
      "Clinical Data",
      "Epidemiology",
    ],
    images: [],
    githubUrl: "#",
    liveUrl: "https://oyageshio.wixsite.com/oshi-omics/projects",
    status: "planned",
    featured: false
  },

  {
    title: "TB scRNA-seq Immunogenetic Analysis",
    slug: "tb-scrna-seq",
    description:
      "Leading the first-ever single-cell RNA sequencing analysis of a TB case-control cohort using 10X Genomics.",
    overview:
      "This project investigates immune cell heterogeneity and gene expression signatures driving tuberculosis susceptibility.",
    methods:
      "Single-cell RNA sequencing using 10X Genomics followed by downstream analysis in R and Python.",
    impact:
      "Provides insight into immune mechanisms that can guide TB vaccine and therapeutic development.",
    imageGalleryTitle: "Single-cell Visualizations",
    imageGallerySubtitle: "Marker gene expression and clustering results",
    technologies: [
      "scRNA-seq",
      "10X Genomics",
      "Python",
      "R",
      "Immunogenetics",
      "Single Cell",
    ],
    images: [
      "/one.jpg",
      "/five.jpg",
      "/six.jpg",
      "/seven.jpg",
      "/eight.jpg",
      "/nine.jpg",
      "/ten.jpg"
    ],
    githubUrl: "#",
    liveUrl: "https://oyageshio.wixsite.com/oshi-omics/projects",
    status: "planned",
    featured: false
  },

  {
    title: "CAAPA Pathogenic Variant Annotation",
    slug: "caapa-variant-annotation",
    description:
      "Applying variant effect prediction algorithms to a global genetic dataset of 3000+ individuals from 60 populations.",
    overview:
      "This project focuses on functional annotation and population-specific interpretation of genetic variants.",
    methods:
      "Consensus machine learning metrics were applied to variant effect predictors and evolutionary conservation tools.",
    impact:
      "Improves variant interpretation accuracy for African-ancestry populations.",
    imageGalleryTitle: "Genetic Variant Visualizations",
    imageGallerySubtitle: "Allele frequency, FST, and annotation dashboards",
    technologies: [
      "Python",
      "Machine Learning",
      "Variant Analysis",
      "Population Genetics",
      "Bioinformatics",
    ],
    images: [
      "/video1.mp4",
      "/video2.mp4",
      "/video3.mp4"
    ],
    githubUrl: "#",
    liveUrl: "#",
    status: "planned",
    featured: false
  }
];

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI not set in .env");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB — seeding projects...");

  for (const p of projects) {
    try {
      // find existing project
      const existing = await Project.findOne({ slug: p.slug });

      if (!existing) {
        // generate next sequential ID
        const last = await Project.findOne().sort({ id: -1 });
        p.id = last ? String(Number(last.id) + 1) : "1";
      } else {
        // preserve existing ID
        p.id = existing.id;
      }

      const result = await Project.findOneAndUpdate(
        { slug: p.slug },
        { $set: p },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`✅ Upserted: ${result.title} (id=${result.id})`);
    } catch (err) {
      console.error("❌ Failed seeding:", p.slug, err.message);
    }
  }

  console.log("🎉 Seeding complete.");
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
