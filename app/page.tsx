import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 !text-white">
      <h1 className="text-4xl font-bold text-center">Are you balding?</h1>
      <Link href="/q">Start quiz</Link>
    </main>
  );
}
