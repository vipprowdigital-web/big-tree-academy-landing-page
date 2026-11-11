import ArticleView from "@/components/ArticleView";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

async function getArticle(id) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/blog/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const result = await res.json();
    return result?.data && result.data.isActive !== false ? result.data : null;
  } catch {
    return null;
  }
}

// The SEO title, description and keywords written in the console drive the page's metadata.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) return { title: "Article not found" };

  const title = article.seo?.metaTitle || article.title;
  const description =
    article.seo?.metaDescription || article.short_description || undefined;
  const keywords = article.seo?.metaKeywords?.length
    ? article.seo.metaKeywords
    : undefined;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      images: article.thumbnail ? [article.thumbnail] : undefined,
    },
    twitter: {
      card: article.thumbnail ? "summary_large_image" : "summary",
      title,
      description,
      images: article.thumbnail ? [article.thumbnail] : undefined,
    },
  };
}

export default async function ArticlePage({ params }) {
  const { id } = await params;
  return <ArticleView id={id} />;
}
