import ProgressBar from "@/components/progress-bar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex px-2 pt-2 gap-x-1">
        <ProgressBar />
      </div>
      <div className="flex justify-center w-full">{children}</div>
    </>
  );
};

export default Layout;
