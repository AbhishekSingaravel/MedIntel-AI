interface Props {
  title: string;
  subtitle: string;
}

function SectionTitle({ title, subtitle }: Props) {
  return (
    <div className="mb-8">
      <h2 className="text-4xl font-bold text-gray-900">
        {title}
      </h2>

      <p className="mt-2 text-lg text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}

export default SectionTitle;