import { useQuery } from "@tanstack/react-query"
import type { Blog } from "../types/blog"
import { getBlogById } from "../api/blogs"

interface BlogDetailProps {
  blogId: number | null
}

const BlogDetail = ({ blogId }: BlogDetailProps) => {
  const { data, isLoading, error } = useQuery<Blog>({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(blogId as number),
    enabled: !!blogId,
  })

  if (!blogId) {
    return <div style={{ padding: 20 }}>Select a blog to view details</div>
  }

  if (isLoading) {
    return <div style={{ padding: 20 }}>Loading blog...</div>
  }

  if (error) {
    return <div style={{ padding: 20 }}>Failed to load blog</div>
  }

  return (
    <div style={{ padding: 20 }}>
      {/* IMAGE — HEIGHT INCREASED */}
      {data?.coverImage && (
        <div
          style={{
            width: "100%",
            height: "260px", // ✅ increased height
            overflow: "hidden",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <img
            src={data.coverImage}
            alt={data.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      )}

      <h2 style={{ fontSize: "22px", fontWeight: 600, marginBottom: 8 }}>
        {data?.title}
      </h2>

      <div style={{ color: "#666", fontSize: "13px", marginBottom: 12 }}>
        {data?.category.join(", ")}
      </div>

      <p style={{ lineHeight: 1.6 }}>
        {data?.content}
      </p>
    </div>
  )
}

export default BlogDetail
