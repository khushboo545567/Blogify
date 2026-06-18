import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

const PostBlog = () => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link,
      Image,
    ],
    content: "",
  });
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/catogery/get-catogery",
          {
            withCredentials: true,
          },
        );

        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch categories",
        );
      }
    };

    fetchCategories();
  }, []);
  const handleSubmit = async () => {
    try {
      if (!title.trim()) {
        return toast.error("Title is required");
      }

      if (!categoryId) {
        return toast.error("Please select a category");
      }

      if (!editor?.getText().trim()) {
        return toast.error("Description is required");
      }

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", editor.getHTML());

      images.forEach((image) => {
        formData.append("postImage", image);
      });

      setLoading(true);

      const { data } = await axios.post(
        `http://localhost:3000/api/v1/post/post-article/${categoryId}`,
        formData,
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        toast.success(data.message);

        setTitle("");
        setCategoryId("");
        setImages([]);

        editor.commands.clearContent();
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to create article");
    } finally {
      setLoading(false);
    }
  };

  if (!editor) return null;

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 py-10">
      <div className="max-w-5xl mx-auto px-5">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          What's on your mind?
        </h1>

        <div className="bg-white dark:bg-gray-900 rounded-lg space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold dark:text-white">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white outline-none"
            />
          </div>

          {/* Toolbar */}
          <div className="flex gap-2 flex-wrap border-b border-gray-300 dark:border-gray-700 pb-3">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              <b>B</b>
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="px-3 py-1 bg-gray-200 rounded italic"
            >
              I
            </button>

            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className="px-3 py-1 bg-gray-200 rounded"
            >
              H1
            </button>

            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className="px-3 py-1 bg-gray-200 rounded"
            >
              H2
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              • List
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              1. List
            </button>
          </div>

          {/* Editor */}
          <div>
            <label className="block mb-2 font-semibold dark:text-white">
              Tell your story
            </label>

            <div className="min-h-[300px] rounded-lg bg-gray-100 dark:bg-gray-800 p-4 dark:text-white">
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block mb-2 font-semibold dark:text-white">
              Upload Images (Max 5)
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages([...e.target.files])}
              className="w-full dark:text-white"
            />

            {images.length > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                {images.length} image(s) selected
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold dark:text-white">
              Category
            </label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.catogeryName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
            >
              {loading ? "Publishing..." : "Publish Article"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBlog;
