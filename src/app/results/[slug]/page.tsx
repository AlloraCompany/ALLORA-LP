import { Cursor } from "@/components/cursor";
import { Header } from "@/components/header";
import Lenis from "@/components/lenis";
import getCases from "@/sanity/get-cases";
import ResultContent from "./result-content";
import { SanityDocument } from "next-sanity";
import Footer from "@/components/footer";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const result = (await getCases({ slug })) as SanityDocument;

  return (
    <Lenis>
      <main className="bg-black ">
        <Cursor />
        <Header />
        <ResultContent result={result} />
        <Footer />
      </main>
    </Lenis>
  );
}
