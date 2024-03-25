import Image from "next/image";
import Mortage from "@/app/components/Mortage";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between ">
      <Mortage />
    </main>
  );
}
