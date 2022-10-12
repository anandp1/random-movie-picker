interface MainBodyProps {
  children: React.ReactNode;
}

const MainBody: React.FC<MainBodyProps> = ({ children }: MainBodyProps) => {
  return (
    <div className="grow h-full">
      <div className="container mx-auto flex max-w-7xl flex-col px-8 py-4">
        {children}
      </div>
    </div>
  );
};

export default MainBody;
