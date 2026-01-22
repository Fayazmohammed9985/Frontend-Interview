import { useState } from "react"
import BlogList from "./components/BlogList"
import BlogDetail from "./components/BlogDetail"
import CreateBlog from "./components/CreateBlog"

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null)

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <div className="w-1/3 border-r overflow-y-auto">
        <CreateBlog />
        <BlogList onSelect={setSelectedBlogId} />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 overflow-y-auto">
        <BlogDetail blogId={selectedBlogId} />
      </div>
    </div>
  )
}

export default App
