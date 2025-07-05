type PageProps = {
  params: {
    id: string;
  };
};

export default function TeamPage({ params }: PageProps) {
  return (
    <div className="flex justify-center items-center text-neutral-100">
      {params.id}
    </div>
  );
}
