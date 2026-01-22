import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBlog } from "../api/blogs"
import { Button } from "@/components/ui/button"


const CreateBlog = () => {
  const queryClient = useQueryClient()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [coverImage, setCoverImage] = useState("")

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      setTitle("")
      setCategory("")
      setDescription("")
      setContent("")
      setCoverImage("")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    mutation.mutate({
      title,
      category: category.split(",").map((c) => c.trim()),
      description,
      content,
      coverImage,
      date: new Date().toISOString(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 border-b">
      <h3 className="font-semibold">Create Blog</h3>

      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        placeholder="Categories (comma separated)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        placeholder="Cover Image URL"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Content"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <Button type="submit" disabled={mutation.isPending}>
  {mutation.isPending ? "Creating..." : "Create Blog"}
</Button>

    </form>
  )
}

export default CreateBlog
