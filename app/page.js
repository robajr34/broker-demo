"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import PublicNavbar from "@/components/layout/PublicNavbar";
import PublicFooter from "@/components/layout/PublicFooter";
import ListingSearch from "@/components/listings/ListingSearch";
import ListingGrid from "@/components/listings/ListingGrid";
import SectionHeader from "@/components/common/SectionHeader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useToast } from "@/lib/context/ToastContext";
import {
  Building2,
  Car,
  Home,
  Layers,
  Store,
  PackageCheck,
  Factory,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  FileCheck,
  Users,
  ArrowRight,
  Sparkles,
  Search,
} from "lucide-react";

export default function HomePage() {
  const { language, t } = useLanguage();
  const { listings, isLoading, createInquiry, settings } = useDelala();
  const { addToast } = useToast();

  const [isCtaModalOpen, setIsCtaModalOpen] = useState(false);
  const [customSearchForm, setCustomSearchForm] = useState({
    name: "",
    phone: "",
    budget: "",
    details: "",
  });
  const [isSubmittingCustom, setIsSubmittingCustom] = useState(false);

  // Filter featured listings for homepage
  const featuredListings = listings.filter((l) => l.isFeatured).slice(0, 6);

  // Count items per category (All 6 Categories)
  const counts = {
    importMaterials: listings.filter((l) => l.category === "import-materials").length,
    factories: listings.filter((l) => l.category === "factories").length,
    shopsForRent: listings.filter((l) => l.category === "shops-for-rent").length,
    housesForRent: listings.filter((l) => l.category === "houses-for-rent").length,
    properties: listings.filter((l) => l.category === "properties" || l.category === "house" || l.category === "apartment" || l.category === "land").length,
    vehicles: listings.filter((l) => l.category === "vehicles" || l.category === "car").length,
  };

  const categories = [
    {
      id: "import-materials",
      name: t("categoryImportMaterials"),
      href: "/listings?category=import-materials",
      count: counts.importMaterials,
      subcategoriesCount: 8,
      tagline: language === "am" ? "የግንባታ ዕቃዎች፣ ማሽኖች፣ ኤሌክትሮኒክስ" : "Machinery, Rebar & Electronics",
      icon: PackageCheck,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "factories",
      name: t("categoryFactories"),
      href: "/listings?category=factories",
      count: counts.factories,
      subcategoriesCount: 8,
      tagline: language === "am" ? "ሽያጭ፣ ኪራይ እና የሽርክና እድሎች" : "For Sale, Rent & Partnership",
      icon: Factory,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "shops-for-rent",
      name: t("categoryShopsForRent"),
      href: "/listings?category=shops-for-rent",
      count: counts.shopsForRent,
      subcategoriesCount: 5,
      tagline: language === "am" ? "የችርቻሮ ሱቆች፣ ሞሎችና መጋዘኖች" : "Retail, Malls, Offices & Warehouses",
      icon: Store,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "houses-for-rent",
      name: t("categoryHousesForRent"),
      href: "/listings?category=houses-for-rent",
      count: counts.housesForRent,
      subcategoriesCount: 5,
      tagline: language === "am" ? "ቪላዎች፣ አፓርታማዎችና ነጠላ ክፍሎች" : "Villas, Apartments & Studio Rooms",
      icon: Home,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "properties",
      name: t("categoryProperties"),
      href: "/listings?category=properties",
      count: counts.properties,
      subcategoriesCount: 5,
      tagline: language === "am" ? "የሚሸጡ ቪላዎች፣ አፓርታማዎችና መሬቶች" : "Villas, Apartments, Land & Buildings for Sale",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "vehicles",
      name: t("categoryVehicles"),
      href: "/listings?category=vehicles",
      count: counts.vehicles,
      subcategoriesCount: 6,
      tagline: language === "am" ? "4x4 ኤስዩቪዎች፣ የጭነት መኪኖችና የኤሌክትሪክ መኪኖች" : "SUVs, Dump Trucks, Pickups & EVs",
      icon: Car,
      image: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleCustomSearchSubmit = (e) => {
    e.preventDefault();
    if (!customSearchForm.name || !customSearchForm.phone) {
      addToast(t("fillRequiredFields"), "error");
      return;
    }
    setIsSubmittingCustom(true);
    setTimeout(() => {
      createInquiry({
        customerName: customSearchForm.name,
        phone: customSearchForm.phone,
        message: `Custom Search Request: Budget: ${customSearchForm.budget} ETB. Requirements: ${customSearchForm.details}`,
        listingTitle: "Custom Sourcing Request",
      });
      setIsSubmittingCustom(false);
      setIsCtaModalOpen(false);
      addToast(t("inquirySuccess"), "success");
      setCustomSearchForm({ name: "", phone: "", budget: "", details: "" });
    }, 400);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[620px] lg:min-h-[700px] flex items-center justify-center bg-slate-950 overflow-hidden py-16 sm:py-24">
        {/* Background Image with dark luxury gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury modern property in Ethiopia"
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-8">
          {/* Top Trust Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              {language === "am"
                ? "ፈቃድ ያለው አስተማማኝ የደላላ አገልግሎት"
                : "Licensed & Verified Ethiopian Delala Brokerage"}
            </span>
          </div>

          {/* Hero Headlines */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              {t("heroTitle")}
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t("heroSubtitle")}
            </p>
          </div>

          {/* Search Interface */}
          <div className="pt-2">
            <ListingSearch />
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-slate-300 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="font-extrabold text-amber-400 text-base sm:text-lg block">
                100%
              </span>
              <span>Verified Carta & Libre</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="font-extrabold text-amber-400 text-base sm:text-lg block">
                15+ Years
              </span>
              <span>Addis Ababa Delala Service</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="font-extrabold text-amber-400 text-base sm:text-lg block">
                Direct
              </span>
              <span>Broker Communication</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="font-extrabold text-amber-400 text-base sm:text-lg block">
                ETB
              </span>
              <span>Transparent Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t("category")}
            title={t("browseByCategory")}
            subtitle={t("browseCategoryDesc")}
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 border border-slate-200/80 shadow-sm hover:shadow-2xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-end p-6"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-65 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                  {/* Top Subcategory Pill */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                      {cat.subcategoriesCount} {t("subcategory")}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold mb-3 shadow-lg group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <h3 className="text-lg font-extrabold text-white leading-tight group-hover:text-amber-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium line-clamp-1">
                      {cat.tagline}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-xs text-amber-400 font-semibold">
                      <span>{cat.count} {t("listingsCount")}</span>
                      <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeader
            badge={t("featured")}
            title={language === "am" ? "ተመራጭ ንብረቶችና መኪናዎች" : "Handpicked Featured Listings"}
            subtitle={
              language === "am"
                ? "በአዲስ አበባና በዙሪያዋ የሚገኙ ከፍተኛ ፍላጎት ያላቸው ምርጥ አማራጮች"
                : "Top recommended residential villas, investment plots, and luxury vehicles."
            }
            align="left"
            action={
              <Link href="/listings">
                <Button variant="outline" size="md" icon={ArrowRight} iconPosition="right">
                  {t("viewAll")} ({listings.length})
                </Button>
              </Link>
            }
          />

          <ListingGrid
            listings={featuredListings}
            isLoading={isLoading}
            emptyTitle="No featured listings at this moment."
          />
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            badge="Trust & Credibility"
            title={t("whyChooseUsTitle")}
            subtitle={t("whyChooseUsSubtitle")}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Benefit 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 transition-colors space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {t("benefit1Title")}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("benefit1Desc")}
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 transition-colors space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <FileCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {t("benefit2Title")}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("benefit2Desc")}
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 transition-colors space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {t("benefit3Title")}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("benefit3Desc")}
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 transition-colors space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {t("benefit4Desc")}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("benefit4Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            <Search className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white max-w-2xl mx-auto">
            {t("ctaTitle")}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {t("ctaSubtitle")}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsCtaModalOpen(true)}
              className="w-full sm:w-auto font-bold shadow-xl shadow-amber-600/30 text-sm"
            >
              {t("ctaButton")}
            </Button>

            <a
              href={`https://wa.me/${(settings?.whatsapp || "+251911234567").replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                icon={MessageCircle}
                className="w-full sm:w-auto text-slate-900 border-white/20 bg-white hover:bg-slate-100 font-bold text-sm"
              >
                {t("chatWhatsApp")}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <PublicFooter />

      {/* Custom Search Request Modal */}
      <Modal
        isOpen={isCtaModalOpen}
        onClose={() => setIsCtaModalOpen(false)}
        title={t("ctaButton")}
        subtitle="Submit your requirements directly to Abebe Tadesse (Licensed Delala)."
        size="md"
      >
        <form onSubmit={handleCustomSearchSubmit} className="space-y-4 py-2">
          <Input
            label={t("yourName")}
            required
            placeholder="e.g. Almaz Bekele"
            value={customSearchForm.name}
            onChange={(e) =>
              setCustomSearchForm({ ...customSearchForm, name: e.target.value })
            }
          />

          <Input
            label={t("phoneNumber")}
            required
            placeholder="+251 911 000 000"
            value={customSearchForm.phone}
            onChange={(e) =>
              setCustomSearchForm({ ...customSearchForm, phone: e.target.value })
            }
          />

          <Input
            label="Estimated Target Budget (ETB)"
            placeholder="e.g. 15,000,000 ETB"
            value={customSearchForm.budget}
            onChange={(e) =>
              setCustomSearchForm({ ...customSearchForm, budget: e.target.value })
            }
          />

          <Textarea
            label="Property or Vehicle Specifications"
            rows={3}
            placeholder="Specify preferred neighborhoods (e.g. Bole, CMC), number of bedrooms, or car year/make..."
            value={customSearchForm.details}
            onChange={(e) =>
              setCustomSearchForm({ ...customSearchForm, details: e.target.value })
            }
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsCtaModalOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmittingCustom}
            >
              {t("submitInquiry")}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
