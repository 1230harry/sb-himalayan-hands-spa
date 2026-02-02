// Seed script v2 (clean) for Sanity dataset.
const fs = require("fs");
const path = require("path");

function loadEnv() {
  const dotenvPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(dotenvPath)) return;
  const content = fs.readFileSync(dotenvPath, "utf8");
  content.split(/\r?\n/).forEach((line) => {
    line = line.trim();
    if (!line || line.startsWith("#")) return;
    const ps = line.match(/^\$env:([^=]+)=\s*["']?(.*?)["']?$/);
    if (ps) {
      process.env[ps[1]] = ps[2];
      return;
    }
    const idx = line.indexOf("=");
    if (idx === -1) return;
    let key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  });
}

loadEnv();

const sanityClientModule = require("@sanity/client");
const sanityClient = sanityClientModule.createClient || sanityClientModule;

const client = sanityClient({
  projectId:
    process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:
    process.env.SANITY_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

if (!client.config().token) {
  console.error(
    "SANITY_API_TOKEN is required to seed the dataset. Check .env.local or environment variables.",
  );
  process.exit(1);
}

async function seed() {
  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "SB Himalayan Healing Hands",
    headerText: "Rebalance • Restore • Revive",
    contact: {
      email: "info@himalayanhealing.com",
      phone: "+1 (555) 123-4567",
      address: "123 Wellness Way, Mountain City",
    },
    hero: {
      heading: "Holistic Spa & Healing",
      subheading: "Signature treatments crafted for body and mind",
    },
    about: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "SB Himalayan Healing Hands is a boutique spa specializing in therapeutic massage and holistic healing. Our practitioners focus on individualized care to promote balance and vitality.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "We offer a curated selection of treatments including prenatal therapy, deep tissue work, lymphatic drainage, and specialized programs for athletes.",
          },
        ],
      },
    ],
  };

  console.log("Creating siteSettings...");
  await client.createOrReplace(siteSettings);

  const services = [
    {
      title: "Prenatal Therapy",
      slug: "prenatal-therapy",
      excerpt:
        "Supportive massage for expecting mothers to relieve tension and improve comfort.",
      duration: 50,
      price: 80,
    },
    {
      title: "Deep Tissue Massage",
      slug: "deep-tissue-massage",
      excerpt:
        "Firm-pressure massage focused on chronic muscle tension and knots.",
      duration: 60,
      price: 95,
      featured: true,
    },
    {
      title: "Lymphatic Drainage Massage",
      slug: "lymphatic-drainage-massage",
      excerpt:
        "Light, rhythmic strokes to support lymph flow and reduce swelling.",
      duration: 45,
      price: 85,
    },
    {
      title: "Swedish Massage",
      slug: "swedish-massage",
      excerpt:
        "Relaxing flowing strokes to increase circulation and ease stress.",
      duration: 50,
      price: 70,
    },
    {
      title: "Four Hands Holistic Massage",
      slug: "four-hands-holistic-massage",
      excerpt:
        "Two therapists working in harmony for a deeply balanced experience.",
      duration: 60,
      price: 180,
    },
    {
      title: "Foot Reflexology",
      slug: "foot-reflexology",
      excerpt:
        "Therapeutic footwork to rebalance the nervous system and improve wellbeing.",
      duration: 30,
      price: 50,
    },
    {
      title: "Cellulite Treatment",
      slug: "cellulite-treatment",
      excerpt:
        "Targeted treatments to stimulate circulation and support connective tissue.",
      duration: 45,
      price: 90,
    },
    {
      title: "Sports Massage",
      slug: "sports-massage",
      excerpt:
        "Targeted therapy designed for athletic recovery and injury prevention.",
      duration: 45,
      price: 85,
    },
  ];

  for (const s of services) {
    const doc = {
      _type: "service",
      title: s.title,
      slug: { current: s.slug },
      excerpt: s.excerpt,
      duration: s.duration,
      price: s.price,
      featured: !!s.featured,
    };
    console.log("Creating service:", s.title);
    await client.create(doc);
  }

  // Upload images
  const imageUrls = [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=80",
  ];

  const uploaded = [];
  for (let i = 0; i < imageUrls.length; i++) {
    try {
      console.log("Uploading", imageUrls[i]);
      // @ts-ignore
      const asset = await client.assets.upload("image", imageUrls[i], {
        filename: `sample-${i + 1}.jpg`,
      });
      uploaded.push(asset);
    } catch (e) {
      console.warn("Upload failed", e && e.message ? e.message : e);
    }
  }

  const posts = [
    {
      title: "The Benefits of Lymphatic Drainage",
      slug: "benefits-of-lymphatic-drainage",
      excerpt:
        "How gentle lymphatic work can support immunity, reduce swelling, and restore energy.",
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Lymphatic drainage massage is a gentle therapy that supports the body’s natural detox processes.",
            },
          ],
        },
      ],
    },
    {
      title: "Preparing for Your First Deep Tissue Massage",
      slug: "preparing-for-deep-tissue-massage",
      excerpt:
        "Tips to make your deep tissue session more effective and comfortable.",
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Drink water, arrive rested, and communicate pressure preferences with your therapist.",
            },
          ],
        },
      ],
    },
    {
      title: "Self-care Tips After a Massage",
      slug: "self-care-after-massage",
      excerpt: "Simple practices to extend the benefits of your treatment.",
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Hydrate well, rest, and use gentle stretches to maintain mobility.",
            },
          ],
        },
      ],
    },
  ];

  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    const doc = {
      _type: "blogPost",
      title: p.title,
      slug: { current: p.slug },
      excerpt: p.excerpt,
      publishDate: new Date().toISOString(),
      body: p.body,
    };
    if (uploaded[i]) {
      doc.coverImage = { _type: "image", asset: { _ref: uploaded[i]._id } };
    }
    console.log("Creating post", p.title);
    await client.create(doc);
  }

  console.log("Done seeding");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
