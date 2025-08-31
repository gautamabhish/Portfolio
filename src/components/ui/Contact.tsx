import { useState } from "react";
import { Mail, MapPin } from "lucide-react";
import { db } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useGUITheme } from "../../providers/GUITheme";

export default function ContactPage() {
  const { theme } = useGUITheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = { ...formData, timeStamp: new Date().toISOString() };
    try {
      await addDoc(collection(db, "contacts"), data);
      alert("Message sent! 🚀");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Firestore error:", err);
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <section
      className={`h-fit px-6 py-12 md:px-18 flex flex-col md:flex-row items-center justify-center gap-16 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Left: Info */}
      <div className="space-y-8 max-w-md">
        <h2 className="text-5xl font-bold">Let's Talk</h2>
        <p className="text-lg">
          Feel free to reach out for collaborations, questions, or just to say hi!
        </p>
        <div className="space-y-4 text-base">
          <a href="mailto:blockchaindevabhishek@gmail.com" className="flex items-center gap-3">
            <Mail className={isDark ? "text-white" : "text-black"} /> blockchaindevabhishek@gmail.com
          </a>
          <p className="flex items-center gap-3">
            <MapPin className={isDark ? "text-white" : "text-black"} /> Delhi, India
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <form
        onSubmit={handleSubmit}
        className={`p-8 rounded-2xl shadow-xl min-w-[60%] max-w-4xl space-y-6 ${
          isDark
            ? "bg-gray-900 border border-gray-700"
            : "bg-gray-100 border border-gray-300"
        }`}
      >
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg ${
              isDark
                ? "bg-black text-white border border-gray-700 focus:ring-white"
                : "bg-white text-black border border-gray-300 focus:ring-black"
            } focus:outline-none focus:ring-2`}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg ${
              isDark
                ? "bg-black text-white border border-gray-700 focus:ring-white"
                : "bg-white text-black border border-gray-300 focus:ring-black"
            } focus:outline-none focus:ring-2`}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className={`w-full px-4 py-3 rounded-lg ${
              isDark
                ? "bg-black text-white border border-gray-700 focus:ring-white"
                : "bg-white text-black border border-gray-300 focus:ring-black"
            } focus:outline-none focus:ring-2`}
          ></textarea>
        </div>
        <button
  type="submit"
  className={`w-full py-3 rounded-lg font-bold text-black hover:opacity-90 transition ${
    isDark
      ? "bg-gradient-to-r from-white/90 via-white/70 to-white/90"
      : "bg-gradient-to-r from-black/90 via-black/70 to-black/90 text-white"
  }`}
>
  Send Message
</button>

      </form>
    </section>
  );
}
