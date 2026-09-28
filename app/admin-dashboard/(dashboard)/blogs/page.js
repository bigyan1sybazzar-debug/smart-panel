"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    title: "",
    slug: "",
    category: "Seismic Safety",
    author: "Bimal Raj Gosai",
    authorRole: "CEO, Prefab Panel Nepal Pvt. Ltd.",
    readTime: "5 min read",
    publishedDate: new Date().toISOString().split("T")[0],
    status: "Published",
    image: "/images/prefab-house.webp",
    excerpt: "",
    tags: "Seismic Safety, Smart Panel Nepal, EPS Sandwich Panel",
    content: "",
  };

  const [form, setForm] = useState(initialForm);

  async function loadBlogs() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/collection/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.items || []);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  function generateSlug(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(val) {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: editingId ? prev.slug : generateSlug(val),
    }));
  }

  async function handleFileUpload(file) {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "blogs");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        setForm((prev) => ({ ...prev, image: data.url }));
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title || !form.slug || !form.excerpt || !form.content) {
      setError("Please fill out all required fields (Title, Slug, Excerpt, Content).");
      return;
    }

    const payload = {
      ...form,
      tags: typeof form.tags === "string" ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : form.tags,
    };

    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...payload, id: editingId } : payload;

    try {
      const res = await fetch("/api/admin/collection/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to save blog post");
      }

      setSuccess(editingId ? "Blog post updated successfully!" : "New blog post published!");
      setForm(initialForm);
      setEditingId(null);
      loadBlogs();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  }

  function startEdit(blog) {
    setEditingId(blog.id);
    setForm({
      title: blog.title || "",
      slug: blog.slug || generateSlug(blog.title || ""),
      category: blog.category || "Seismic Safety",
      author: blog.author || "Bimal Raj Gosai",
      authorRole: blog.authorRole || "CEO, Prefab Panel Nepal Pvt. Ltd.",
      readTime: blog.readTime || "5 min read",
      publishedDate: blog.publishedDate || new Date().toISOString().split("T")[0],
      status: blog.status || "Published",
      image: blog.image || "/images/prefab-house.webp",
      excerpt: blog.excerpt || "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
      content: blog.content || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/admin/collection/blogs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccess("Blog post deleted successfully.");
        loadBlogs();
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Could not delete blog post.");
    }
  }

  const filteredBlogs = blogs.filter(
    (b) =>
      (b.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.category || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.author || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-blue-dark">Blog &amp; Article Manager</h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, edit, and optimize SEO articles for Smart Panel Nepal.
          </p>
        </div>
        <div className="text-xs font-bold bg-blue-50 text-brand-blue px-3 py-1.5 rounded-lg border border-blue-100 self-start sm:self-auto">
          Total Posts: {blogs.length}
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-xs text-red-700 rounded shadow-sm">
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 text-xs text-emerald-700 rounded shadow-sm">
          ✓ {success}
        </div>
      )}

      {/* Add / Edit Form Card */}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="font-display font-bold text-lg text-brand-blue-dark">
            {editingId ? "✏️ Edit Blog Post" : "➕ Create New Blog Post"}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-xs font-bold text-gray-500 hover:text-gray-800 underline"
            >
              Cancel Editing
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Article Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 5 Reasons EPS Sandwich Panels Are Best for Earthquake Safety"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="article-url-slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-mono"
              />
              <button
                type="button"
                onClick={() => setForm({ ...form, slug: generateSlug(form.title) })}
                className="px-3 py-2 text-[11px] font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg whitespace-nowrap"
              >
                Auto Generate
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none bg-white"
            >
              <option value="Seismic Safety">Seismic Safety &amp; Resilience</option>
              <option value="Cost & Efficiency">Cost &amp; Building Efficiency</option>
              <option value="Government & Policy">Government &amp; District Rate</option>
              <option value="Green Building">Green Building &amp; Thermal Insulation</option>
              <option value="Product Guide">Product &amp; Installation Guide</option>
            </select>
          </div>

          {/* Author Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Author Name</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>

          {/* Author Role */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Author Title / Role</label>
            <input
              type="text"
              value={form.authorRole}
              onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>

          {/* Published Date */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Published Date</label>
            <input
              type="date"
              value={form.publishedDate}
              onChange={(e) => setForm({ ...form, publishedDate: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>

          {/* Read Time & Status */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Read Time</label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none bg-white font-bold"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Featured Image */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">Featured Cover Image</label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {form.image && (
                <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-50">
                  <Image src={form.image} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <input
                type="text"
                placeholder="/images/prefab-house.webp"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none font-mono"
              />
              <label className="cursor-pointer bg-brand-blue text-white text-xs font-bold py-2.5 px-4 rounded-lg hover:bg-brand-blue-dark transition-colors whitespace-nowrap shrink-0">
                {uploading ? "Uploading..." : "Upload File"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          {/* Tags */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">Tags / Keywords (comma separated)</label>
            <input
              type="text"
              placeholder="Seismic Safety, Smart Panel Nepal, EPS Sandwich Panel"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>

          {/* Excerpt */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Short Excerpt / SEO Meta Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              placeholder="Brief summary that appears in search results and blog listing cards..."
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none leading-relaxed"
            />
          </div>

          {/* Full Content */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-gray-700">
                Full Article Content (HTML / Text) <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-gray-400">Supports &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;strong&gt;, etc.</span>
            </div>
            <textarea
              required
              rows={12}
              placeholder="Write or paste your article content here in HTML or structured text..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full text-xs p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none font-mono leading-relaxed"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="btn-primary text-xs py-2.5 px-6 font-bold shadow-md"
          >
            {editingId ? "Save Changes" : "Publish Article"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="btn-outline text-xs py-2.5 px-4"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Blogs List Table */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="font-display font-bold text-lg text-brand-blue-dark">Published &amp; Draft Articles</h2>
          <input
            type="text"
            placeholder="Search by title, category, author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none w-full sm:w-64"
          />
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-gray-500 animate-pulse">Loading articles...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-12 text-center text-xs text-gray-500 border border-dashed border-gray-200 rounded-xl">
            No blog posts found. Create your first article above!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Article</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Author</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBlogs.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-3 font-semibold text-gray-900 max-w-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-9 rounded overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                          <Image src={b.image || "/images/prefab-house.webp"} alt={b.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="line-clamp-2 leading-snug">{b.title}</p>
                          <span className="text-[10px] text-gray-400 font-mono">/blog/{b.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="bg-blue-50 text-brand-blue font-semibold text-[10px] px-2 py-0.5 rounded">
                        {b.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-gray-600">{b.author || "Smart Panel"}</td>
                    <td className="py-3 px-3 whitespace-nowrap text-gray-500">{b.publishedDate}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      {b.status === "Published" ? (
                        <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200">
                          ✓ Published
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-800 font-bold text-[10px] px-2 py-0.5 rounded-full border border-amber-200">
                          ✎ Draft
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => startEdit(b)}
                        className="text-xs font-bold text-brand-blue hover:text-brand-orange mr-3 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="text-xs font-bold text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
