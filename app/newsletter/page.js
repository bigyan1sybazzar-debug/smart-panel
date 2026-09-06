import PageHero from "@/components/PageHero";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata = { title: "Newsletter" };

export default function NewsletterPage() {
  return (
    <div>
      <PageHero crumb="Stay Connected" title="Newsletter" subtitle="Subscribe to receive company news, notices, product updates and investor announcements directly in your inbox." />
      <div className="container-page py-16 max-w-xl">
        <NewsletterForm />
      </div>
    </div>
  );
}
