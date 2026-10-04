import PageHero from "@/components/PageHero";
import GalleryClient from "@/components/GalleryClient";
import { readDB } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  const { gallery } = readDB();
  return (
    <div>
      <PageHero crumb="Our Work" title="Gallery" subtitle="A look at our factory, installations and completed projects across Nepal." />
      <GalleryClient gallery={gallery} />
    </div>
  );
}
