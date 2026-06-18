// import React, { useState } from "react";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";
// import Image from "@tiptap/extension-image";

// const PostBlog = () => {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: { levels: [1, 2, 3] },
//       }),
//       Link,
//       Image,
//     ],
//     content: "",
//   });

//   // 🔹 Image upload handler
//   const handleImageUpload = async (file) => {
//     if (!file) return;

//     try {
//       setUploading(true);

//       const formData = new FormData();
//       formData.append("image", file);

//       const res = await fetch("http://localhost:5000/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       // insert image into editor
//       editor.chain().focus().setImage({ src: data.url }).run();
//     } catch (error) {
//       console.error("Image upload failed", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = () => {
//     const htmlContent = editor.getHTML();

//     console.log({
//       title,
//       content: htmlContent,
//       category,
//     });
//   };

//   if (!editor) return null;

//   return (
//     <div className="w-full h-full bg-white dark:bg-gray-900 pt-16">
//       <div className="">
//         <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
//           What’s going on your mind?
//         </h1>

//         <div className="bg-white dark:bg-gray-900  p-10 space-y-6">
//           {/* Title */}
//           <label htmlFor="" className="font-semibold dark:text-white">
//             Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             placeholder="Enter title..."
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 mt-3 dark:text-gray-200"
//           />

//           {/* Toolbar */}
//           <div className="flex gap-2 flex-wrap border-b border-gray-300 dark:border-gray-700 pb-3">
//             <button
//               onClick={() => editor.chain().focus().toggleBold().run()}
//               className="editor-btn"
//             >
//               <span className="font-bold bg-gray-300 px-2 rounded-full">B</span>
//             </button>

//             <button
//               onClick={() => editor.chain().focus().toggleItalic().run()}
//               className="editor-btn"
//             >
//               <span className="font-italic bg-gray-300 px-2 rounded-full">
//                 I
//               </span>{" "}
//             </button>

//             <button
//               onClick={() =>
//                 editor.chain().focus().toggleHeading({ level: 1 }).run()
//               }
//               className="editor-btn"
//             >
//               <span className="font-italic bg-gray-300 px-2 rounded-full">
//                 H1
//               </span>
//             </button>

//             <button
//               onClick={() =>
//                 editor.chain().focus().toggleHeading({ level: 2 }).run()
//               }
//               className="editor-btn"
//             >
//               <span className="font-italic bg-gray-300 px-2 rounded-full">
//                 H2
//               </span>
//             </button>

//             <button
//               onClick={() => editor.chain().focus().toggleBulletList().run()}
//               className="editor-btn"
//             >
//               <span className="font-italic bg-gray-300 px-2 rounded-full">
//                 • List
//               </span>
//             </button>

//             <button
//               onClick={() => editor.chain().focus().toggleOrderedList().run()}
//               className="editor-btn"
//             >
//               <span className="font-italic bg-gray-300 px-2 rounded-full">
//                 1. List
//               </span>
//             </button>

//             {/* Image Upload */}
//             <label className="editor-btn cursor-pointer bg-gray-300 px-2 rounded-full">
//               {uploading ? "Uploading..." : "🖼 Image"}
//               <input
//                 type="file"
//                 accept="image/*"
//                 hidden
//                 onChange={(e) => handleImageUpload(e.target.files[0])}
//               />
//             </label>
//           </div>

//           {/* Editor */}
//           <div className="font-semibold dark:text-white">Tell your story</div>
//           <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 min-h-[200px]">
//             <EditorContent editor={editor} />
//           </div>

//           {/* Category */}
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
//           >
//             <option value="">Select category</option>
//             <option value="tech">Technology</option>
//             <option value="education">Education</option>
//             <option value="food">Food</option>
//           </select>

//           {/* Submit */}
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-2 rounded-lg bg-black dark:bg-white dark:text-black text-white"
//           >
//             Create Post
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostBlog;

import React, { useState } from "react";
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

              {/* Replace these IDs with your actual MongoDB category IDs */}

              <option value="CATEGORY_ID_1">Technology</option>

              <option value="CATEGORY_ID_2">Education</option>

              <option value="CATEGORY_ID_3">Food</option>
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
