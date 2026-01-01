// seedProjects.js
require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/projectModels'); // adjust path if different

const projects = [
  {
    id: "1",
    title: "TB Epidemiological Risk Assessment",
    description:
      "Built case-control assignment algorithm utilizing clinical, behavioral, and self-report data from over 50 variables. Implemented Random Forest and Logistic Regression models to predict active tuberculosis progression in 1000+ patients from rural South African clinics.",
    technologies: [
      "Python",
      "Random Forest",
      "Logistic Regression",
      "Clinical Data",
      "Epidemiology",
    ],
    githubUrl: "#",
    liveUrl: "https://oyageshio.wixsite.com/oshi-omics/projects",
    status: "planned",
    slug: "tb-epidemiological-risk",
    featured: false,
    images: []
  },
  {
    id: "2",
    title: "TB scRNA-seq Immunogenetic Analysis",
    description:
      "Leading the first-ever single-cell RNA sequencing analysis of a TB case-control cohort using 10X Genomics. Profiling gene expression and cell surface protein markers in PBMCs to identify novel genetic variants and immune mechanisms driving TB progression.",
    technologies: [
      "scRNA-seq",
      "10X Genomics",
      "Python",
      "R",
      "Immunogenetics",
      "Single Cell",
    ],
    githubUrl: "#",
    liveUrl: "https://oyageshio.wixsite.com/oshi-omics/projects",
    status: "planned",
    slug: "tb-scrna-seq",
    featured: false,
    images: [
      "/one.jpg",
      "/five.jpg",
      "/six.jpg",
      "/seven.jpg",
      "/eight.jpg",
      "/nine.jpg",
      "/ten.jpg"
    ]
  },
  {
    id: "3",
    title: "CAAPA Pathogenic Variant Annotation",
    description:
      "Applying variant effect prediction algorithms to a global genetic dataset of 3000+ individuals from 60 populations. Created consensus ML metric for classifying deleterious genetic variants and identified correlations with evolutionary conservation tools.",
    technologies: [
      "Python",
      "Machine Learning",
      "Variant Analysis",
      "Population Genetics",
      "Bioinformatics",
    ],
    githubUrl: "#",
    liveUrl: "#",
    status: "planned",
    slug: "caapa-variant-annotation",
    featured: false,
    images: [
      "/video1.mp4",
      "/video2.mp4",
      "/video3.mp4"
    ]
  }
];

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!MONGODB_URI) {
    console.error("MONGODB_URI not set in .env");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI, {
    // useNewUrlParser/useUnifiedTopology are ignored in modern drivers
  });

  console.log("Connected to MongoDB — seeding projects...");

  for (const p of projects) {
    try {
      // upsert by slug (prevents duplicates)
      const result = await Project.findOneAndUpdate(
        { slug: p.slug },
        { $set: p },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`Upserted: ${result.slug} (${result._id})`);
    } catch (err) {
      console.error("Failed seeding:", p.slug, err.message);
    }
  }

  console.log("Seeding complete.");
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
