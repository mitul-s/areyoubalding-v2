import ProgressBar from "@/components/progress-bar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex px-2 pt-2 gap-x-1">
        <button className="bg-ramen text-white rounded-l-[10px] rounded-r-md px-8 font-semibold leading-none h-10 border-2 border-ramen hover:text-ramen hover:bg-cream transition">
          Back
        </button>
        <ProgressBar />
      </div>
      <div className="flex justify-center w-full">{children}</div>
    </>
  );
};

export default Layout;
