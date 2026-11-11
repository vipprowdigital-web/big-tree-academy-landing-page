import PolicyView from "@/components/PolicyView";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

async function getPolicy(slug) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/policy/public/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const result = await res.json();
    return result?.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const policy = await getPolicy(slug);
  return { title: policy?.title || "Policy" };
}

export default async function PolicyPage({ params }) {
  const { slug } = await params;
  return <PolicyView slug={slug} />;
}
