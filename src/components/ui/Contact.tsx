import { useState } from "react";
import { Mail, MapPin } from "lucide-react";
import { db } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      ...formData,
      timeStamp: new Date().toISOString(),
    };

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
    <section className="h-fit bg-[#150e2269] text-white px-6 py-12 md:px-18 flex flex-col md:flex-row items-center justify-center gap-16">
      {/* Left: Info */}
      <div className="space-y-8 max-w-md">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-[#5bece5] via-[#ff4ecd] to-[#ffce00] bg-clip-text text-transparent animate-gradient">
          Let's Talk
        </h2>
        <p className="text-lg text-gray-300">
          Feel free to reach out for collaborations, questions or just to say hi!
        </p>
        <div className="space-y-4 text-gray-400 text-base">
          <p className="flex items-center gap-3">
            <Mail className="text-[#5bece5]" /> blockchaindevabhishek@example.com
          </p>
          {/* <p className="flex items-center gap-3">
            <Phone className="text-[#ffce00]" /> +123 456 7890
          </p> */}
          <p className="flex items-center gap-3">
            <MapPin className="text-[#ff4ecd]" /> Delhi, India
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl min-w-[60%]  max-w-4xl space-y-6"
      >
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#5bece5]"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#ff4ecd]"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#ffce00]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#5bece5] via-[#ff4ecd] to-[#ffce00] rounded-lg font-bold text-black hover:opacity-90 transition"
        >
          Send Message
        </button>
      </form>



      <style>{`
        @keyframes gradientBackground {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientBackground 6s ease infinite;
        }
      `}</style>
    </section>
  );
}
