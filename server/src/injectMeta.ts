export const getMetaTags = (
  url: URL,
  description: string = "Rank your favorite games in 1 vs 1 battles.",
  imageUrl?: string,
) => {
  if (imageUrl === undefined) {
    imageUrl = `${url.origin}/app/title`;
  }

  return `
		<!-- HTML Meta Tags -->
		<title>Games Head-To-Head</title>
		<meta name="description" content="${description}">
		
		<!-- Open Graph Meta Tags -->
		<meta property="og:url" content="${url.origin}">
		<meta property="og:type" content="website">
		<meta property="og:title" content="Games Head-To-Head">
		<meta property="og:description" content="${description}">
		<meta property="og:image" content="${imageUrl}">
		<meta property="og:image:width"" content="528">
		<meta property="og:image:height"" content="352">
		
		<!-- Twitter Meta Tags -->
		<meta name="twitter:card" content="summary_large_image">
		<meta property="twitter:domain" content="${url.host}">
		<meta property="twitter:url" content="${url.origin}">
		<meta name="twitter:title" content="Games Head-To-Head">
		<meta name="twitter:description" content="${description}">
		<meta name="twitter:image" content="${imageUrl}">
		
		<!-- Meta Tags Generated via https://opengraph.dev -->
  `;
};
