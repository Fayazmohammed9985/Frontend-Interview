import { useQuery } from "@tanstack/react-query"
import { getBlogs } from "../api/blogs"
import BlogCard from "./BlogCard"

interface BlogListProps {
  onSelect: (id: number) => void
}

const BlogList = ({ onSelect }: BlogListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  })

  if (isLoading) return <div className="p-4">Loading blogs...</div>
  if (error) return <div className="p-4 text-red-500">Failed to load blogs</div>

  return (
    <div className="p-4 space-y-3">
      {data?.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export default BlogList
