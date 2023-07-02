import { LayoutComponent } from "@/types/next";

export const PublicLayout: LayoutComponent = ({ title, children }) => {
  return (
    <div className=" flex min-h-screen flex-col items-center justify-start py-2  ">
      {children}
    </div>
  );
};
