import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center flex-col text-center -mt-32">
        <h1 className="leading-none text-center text-royal uppercase font-black">
          <span className="text-3xl">Are you</span>
          <br />
          <span className="text-[calc(16px+14vw)] tracking-tighter md:tracking-[-0.425rem]">
            balding?
          </span>
        </h1>
        <p className="text-xl max-w-xl text-royal/75 font-semibold">
          Culpa amet proident eiusmod proident excepteur mollit mollit labore
          pariatur pariatur irure laboris labore.
        </p>
      </div>
      <div className="px-2 pb-2 w-full absolute bottom-0">
        <Link
          className="rounded-[10px] bg-cherry text-white h-48 w-full flex items-center justify-center leading-none font-semibold uppercase text-2xl mt-auto border-2 border-transparent hover:bg-cream transition hover:border-cherry hover:text-cherry"
          href="/q"
        >
          Start
        </Link>
      </div>
    </>
  );
}
