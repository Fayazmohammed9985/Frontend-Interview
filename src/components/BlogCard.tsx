import type { Blog } from "../types/blog"

interface BlogCardProps {
  blog: Blog
  onSelect: (id: number) => void
}

const BlogCard = ({ blog, onSelect }: BlogCardProps) => {
  return (
    <div
      className="border rounded p-4 cursor-pointer hover:bg-gray-100 transition"
      onClick={() => onSelect(blog.id)}
    >
      <div className="text-xs text-gray-500 mb-1">
        {blog.category.join(", ")}
      </div>
      <h3 className="font-semibold">{blog.title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        {blog.description}
      </p>
    </div>
  )
}

export default BlogCard
