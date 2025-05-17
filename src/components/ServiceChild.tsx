import React, { useState, useCallback } from "react";
import type { ChangeEvent as CE, FormEvent as FE } from "react";
import { CheckCircle, PlusCircle } from "lucide-react";
import { db } from "../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
const websiteTypes = [
    "Discord Bot",
  "Personal Portfolio",
  "Business Website",
  "E-commerce Store",
  "Blog or Magazine",
  "Landing Page",
  "Custom Web App",
] as const;

const designStyles = ["Modern", "Minimal", "Bold", "Classic"] as const;

const featuresList = [
  "Contact Form",
  "Chatbot",
  "Booking System",
  "Payment Gateway",
  "Blog Integration",
  "Admin Panel",
  "User Authentication",
  "SEO Optimization",
] as const;

const pagesList = ["Home", "About Us", "Services / Products", "Contact Us"] as const;

type WebsiteType = typeof websiteTypes[number];
type DesignStyle = typeof designStyles[number];
type Feature = typeof featuresList[number];
type Page = typeof pagesList[number];

export default function BuildYourPerfectSite() {
  const [websiteType, setWebsiteType] = useState<WebsiteType | "">("");
  const [designStyle, setDesignStyle] = useState<DesignStyle | "">("");
  const [colorPalette, setColorPalette] = useState<string>("");
  const [inspirationLinks, setInspirationLinks] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
  const [selectedPages, setSelectedPages] = useState<Page[]>([]);
  const [customPages, setCustomPages] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const basePrice = 9.99;
  const pageCost = 8.99;
  const featureCost = 14.99;
             // guaranteed ≥ 0
 

  // Generic toggleSelection memoized with useCallback
  const toggleSelection = useCallback(
    <T,>(item: T, list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => {
      setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
    },
    []
  );

  const totalPages = selectedPages.length + (customPages.trim() ? 1 : 0);
  const totalFeatures = selectedFeatures.length;
//   const totalPrice = (
//     basePrice + totalPages * pageCost + totalFeatures * featureCost
//   ).toFixed(2);
   // right after you compute totalPages and totalFeatures
   const rawTotal = basePrice + totalPages * pageCost + totalFeatures * featureCost;
   const discountAmount = rawTotal >= 80 ? 20 : rawTotal>10?((5/100)*rawTotal):0;           // only give $20 off if subtotal ≥ $20
   const finalTotal = rawTotal - discountAmount;  

  // File validation (max 5MB)
  const onFileChange = (e: CE<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (f) {
      if (f.size > 5 * 1024 * 1024) {
        setFileError("File size exceeds 5MB limit.");
        setFile(null);
        return;
      }
      setFileError(null);
      setFile(f);
    } else {
      setFile(null);
      setFileError(null);
    }
  };

  // Email format validation
  const validateEmail = (email: string) => {
    if (!email) return true; // allow empty since phone can be provided
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Phone format validation (simple digits, +, -, spaces)
  const validatePhone = (phone: string) => {
    if (!phone) return true; // allow empty since email can be provided
    const re = /^[+\d\s\-()]{7,}$/;
    return re.test(phone);
  };

  const onEmailChange = (e: CE<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    setEmailError(validateEmail(val) ? null : "Invalid email format");
  };

  const onPhoneChange = (e: CE<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    setPhoneError(validatePhone(val) ? null : "Invalid phone number");
  };

  // Validation for form enablement
  const isFormValid =
    websiteType !== "" &&
    designStyle !== "" &&
    name.trim() !== "" &&
    (email.trim() !== "" || phone.trim() !== "") &&
    !emailError &&
    !phoneError &&
    !fileError;

  const onSubmit = async (e: FE<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    // submit logic here
    const data = {
      websiteType,
      designStyle,
      colorPalette,
      inspirationLinks,
      selectedFeatures,
      selectedPages,
      customPages,
      budget,
      deliveryDate,
      name,
      email,
      phone,
      fileName: file?.name ?? null,
      finalTotal,
      timeStamp: new Date().toISOString(),
    };
    try {
      await addDoc(collection(db, "services"), data);
      alert("Message sent! 🚀");
      
    } catch (err) {
      console.error("Firestore error:", err);
      alert("Error sending message. Please try again.");
    }
   
  };

  // File preview URL for images
  const filePreviewUrl =
    file && file.type.startsWith("image/") ? URL.createObjectURL(file) : null;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #0e0e0e, #463168, #361f5c)" }}
    >
      <div
        className="max-w-3xl w-full p-8 rounded-2xl shadow-2xl text-white"
        role="main"
        aria-labelledby="main-heading"
      >
        <h1 id="main-heading" className="text-4xl font-extrabold text-center mb-4">
          Build Your Perfect Site
        </h1>
        <p className="text-center text-purple-200 mb-8">
          Customize your dream website — starting at <strong>$9.99</strong>
        </p>

        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          {/* Website Type */}
          <fieldset>
            <legend className="block mb-2 text-lg font-semibold">
               Website Type
            </legend>
            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Website Type">
              {websiteTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  role="radio"
                  aria-checked={websiteType === type}
                  onClick={() => setWebsiteType(type)}
                  tabIndex={websiteType === type ? 0 : -1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-400 ${
                    websiteType === type
                      ? "bg-[#5a3ec4] border-[#5a3ec4]"
                      : "bg-[#3a335f] border-[#4a426f] hover:bg-[#4f4180]"
                  }`}
                >
                  {websiteType === type ? (
                    <CheckCircle size={16} className="text-green-400" />
                  ) : (
                    <PlusCircle size={16} className="text-gray-300" />
                  )}
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Design Preferences */}
          <fieldset>
            <legend className="block mb-2 text-lg font-semibold">
               Design Preferences
            </legend>
            <div className="grid grid-cols-2 gap-3 mb-3" role="radiogroup" aria-label="Design Style">
              {designStyles.map((style) => (
                <button
                  key={style}
                  type="button"
                  role="radio"
                  aria-checked={designStyle === style}
                  onClick={() => setDesignStyle(style)}
                  tabIndex={designStyle === style ? 0 : -1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-400 ${
                    designStyle === style
                      ? "bg-[#5a3ec4] border-[#5a3ec4]"
                      : "bg-[#3a335f] border-[#4a426f] hover:bg-[#4f4180]"
                  }`}
                >
                  {designStyle === style ? (
                    <CheckCircle size={16} className="text-green-400" />
                  ) : (
                    <PlusCircle size={16} className="text-gray-300" />
                  )}
                  <span>{style}</span>
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Color Palette"
              aria-label="Color Palette"
              value={colorPalette}
              onChange={(e) => setColorPalette(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#3a335f] border border-[#4a426f] focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="url"
              placeholder="Inspiration Links (optional)"
              aria-label="Inspiration Links"
              value={inspirationLinks}
              onChange={(e) => setInspirationLinks(e.target.value)}
              className="w-full mt-2 px-4 py-2 rounded-lg bg-[#3a335f] border border-[#4a426f] focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </fieldset>

          {/* Features */}
          <fieldset>
            <legend className="block mb-2 text-lg font-semibold"> Features</legend>
            <div className="grid grid-cols-2 gap-3" role="group" aria-label="Features">
              {featuresList.map((feature) => (
                <button
                  key={feature}
                  type="button"
                  aria-pressed={selectedFeatures.includes(feature)}
                  onClick={() =>
                    toggleSelection(feature, selectedFeatures, setSelectedFeatures)
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-400 ${
                    selectedFeatures.includes(feature)
                      ? "bg-[#5a3ec4] border-[#5a3ec4]"
                      : "bg-[#3a335f] border-[#4a426f] hover:bg-[#4f4180]"
                  }`}
                >
                  {selectedFeatures.includes(feature) ? (
                    <CheckCircle size={16} className="text-green-400" />
                  ) : (
                    <PlusCircle size={16} className="text-gray-300" />
                  )}
                  <span>{feature}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Pages */}
          <fieldset>
            <legend className="block mb-2 text-lg font-semibold"> Pages</legend>
            <div className="grid grid-cols-2 gap-3 mb-3" role="group" aria-label="Pages">
              {pagesList.map((page) => (
                <button
                  key={page}
                  type="button"
                  aria-pressed={selectedPages.includes(page)}
                  onClick={() => toggleSelection(page, selectedPages, setSelectedPages)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-400 ${
                    selectedPages.includes(page)
                      ? "bg-[#5a3ec4] border-[#5a3ec4]"
                      : "bg-[#3a335f] border-[#4a426f] hover:bg-[#4f4180]"
                  }`}
                >
                  {selectedPages.includes(page) ? (
                    <CheckCircle size={16} className="text-green-400" />
                  ) : (
                    <PlusCircle size={16} className="text-gray-300" />
                  )}
                  <span>{page}</span>
                </button>
              ))}
            </div>
            <input
              type="text"
              aria-label="Custom Pages"
              placeholder="Custom Pages (comma-separated)"
              value={customPages}
              onChange={(e) => setCustomPages(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#3a335f] border border-[#4a426f] focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </fieldset>

          {/* Budget and Timeline */}
          <fieldset className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="budget" className="block mb-1 font-semibold">
                Budget
              </label>
              <input
                id="budget"
                type="text"
                placeholder="Your budget"
                aria-label="Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#3a335f] border border-[#4a426f] focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label htmlFor="deliveryDate" className="block mb-1 font-semibold">
                 Desired Delivery Date
              </label>
              <input
                id="deliveryDate"
                type="date"
                aria-label="Desired Delivery Date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#3a335f] border border-[#4a426f] focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </fieldset>

          {/* Contact Info */}
          <fieldset>
            <legend className="block mb-2 text-lg font-semibold"> Contact Info</legend>
            <input
              type="text"
              placeholder="Your Name"
              aria-label="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mb-3 px-4 py-2 rounded-lg bg-[#3a335f] border border-[#4a426f] focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="email"
              placeholder="Email (optional if phone is given)"
              aria-label="Email"
              value={email}
              onChange={onEmailChange}
              className={`w-full mb-3 px-4 py-2 rounded-lg bg-[#3a335f] border ${
                emailError ? "border-red-500" : "border-[#4a426f]"
              } focus:outline-none focus:ring-2 focus:ring-purple-400`}
              aria-invalid={!!emailError}
              aria-describedby="email-error"
            />
            {emailError && (
              <p id="email-error" className="text-red-500 text-sm mb-3">
                {emailError}
              </p>
            )}
            <input
              type="tel"
              placeholder="Phone (optional if email is given)"
              aria-label="Phone"
              value={phone}
              onChange={onPhoneChange}
              className={`w-full mb-3 px-4 py-2 rounded-lg bg-[#3a335f] border ${
                phoneError ? "border-red-500" : "border-[#4a426f]"
              } focus:outline-none focus:ring-2 focus:ring-purple-400`}
              aria-invalid={!!phoneError}
              aria-describedby="phone-error"
            />
            {phoneError && (
              <p id="phone-error" className="text-red-500 text-sm mb-3">
                {phoneError}
              </p>
            )}
          </fieldset>

          {/* File Upload */}
          <fieldset>
            <legend className="block mb-2 text-lg font-semibold"> Upload Files</legend>
            <input
              type="file"
              onChange={onFileChange}
              aria-describedby="file-error"
              className="w-full text-sm text-gray-300 file:bg-[#5a3ec4] file:border-0 file:rounded file:px-4 file:py-2 file:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
              accept="image/*,application/pdf"
            />
            {fileError && (
              <p id="file-error" className="text-red-500 text-sm mt-1">
                {fileError}
              </p>
            )}
            {filePreviewUrl && (
              <img
                src={filePreviewUrl}
                alt="Preview"
                className="mt-4 max-h-48 rounded-md shadow-lg object-contain"
                onLoad={() => URL.revokeObjectURL(filePreviewUrl)} // free memory after load
              />
            )}
          </fieldset>

       {/* Price */}
<div
  aria-live="polite"
  className="mt-6 w-full max-w-md mx-auto bg-[#2d254b] rounded-xl shadow-lg p-5 text-gray-200"
>
  <h3 className="text-xl font-bold mb-4 border-b border-[#4a426f] pb-2">
     Quote Breakdown
  </h3>

  <ul className="text-sm mb-3 space-y-2">
    <li className="flex justify-between">
      <span>Base Price</span>
      <span>${basePrice.toFixed(2)}</span>
    </li>

    {totalFeatures > 0 && (
      <li className="flex justify-between">
        <span>
          {totalFeatures} Feature
          {totalFeatures > 1 ? "s" : ""}
        </span>
        <span>${(totalFeatures * featureCost).toFixed(2)}</span>
      </li>
    )}

    {selectedPages.length > 0 && (
      <li className="flex justify-between">
        <span>
          {selectedPages.length} Page
          {selectedPages.length > 1 ? "s" : ""}
        </span>
        <span>${(selectedPages.length * pageCost).toFixed(2)}</span>
      </li>
    )}

    {customPages.trim() && (
      <li className="flex justify-between">
        <span>Custom Pages</span>
        <span>${(customPages.length * pageCost).toFixed(2)}</span>
      </li>
    )}

    {/* Conditional Fake Discount */}
    {discountAmount > 0 && (
      <li className="flex justify-between text-green-400 font-semibold">
        <span>💸 Special Discount</span>
        <span>- ${discountAmount.toFixed(2)}</span>
      </li>
    )}
  </ul>

  <div className="border-t border-[#4a426f] pt-3 flex justify-between text-lg font-bold">
    <span>Total Estimate</span>
    <span className="text-green-400">
      ${finalTotal.toFixed(2)}
    </span>
  </div>

  {/* Disclaimer */}
  <p className="text-[11px] text-gray-400 mt-2 italic text-center">
    *This is an estimated quote. Final pricing may vary depending on complexity and timeline.
  </p>
</div>


          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full mt-6 py-3 rounded-lg font-bold tracking-wide transition ${
              isFormValid
                ? "bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500"
                : "bg-gray-600 cursor-not-allowed"
            }`}
            aria-disabled={!isFormValid}
          >
            Submit Your Quote Request
          </button>
        </form>
      </div>
    </div>
  );
}
