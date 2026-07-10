export default function sitemap() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://jordanmontenegrocalla.com";
  const now = new Date();

  // Priority tiers:
  //   0.9 - homepage and primary research pages
  //   0.7 - about, contact, publications, collaborations
  //   0.5 - secondary surfaces (playground)
  //
  // Routes intentionally excluded from the sitemap because they are
  // either incomplete or internal-only:
  //   /og, /og/light, /og-preview, /uses, /notes, /engineering,
  //   /data-dictionary, /research/[slug] dynamic catch
  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/research`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/kallpa`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/research/amoebanator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/research/montenegro-medium`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/research/organelle-targets`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/publications`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/collaborations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/playground`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
