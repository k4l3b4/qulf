export function FeatureCard({
  icon,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="group flex flex-col gap-6 bg-neutral-950 p-8 transition-colors duration-200 hover:bg-neutral-900/50 lg:p-10">
      <div>
        <div className="mb-4 text-neutral-600 transition-colors duration-200 group-hover:text-red-500">
          {icon}
        </div>
        <p className="text-base font-display font-semibold text-white">
          {title}
        </p>
        <p className="mt-1.5 text-sm leading-6 text-neutral-400">{desc}</p>
      </div>
      {children}
    </div>
  );
}
