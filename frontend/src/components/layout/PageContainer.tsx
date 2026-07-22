interface Props {
  children: React.ReactNode;
}

function PageContainer({ children }: Props) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
}

export default PageContainer;