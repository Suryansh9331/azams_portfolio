type Props = {
  name: string;
};

export function LogoTile({ name }: Props) {
  return (
    <div className="group relative flex aspect-[16/10] items-center justify-center rounded-sm bg-white px-3 py-2 shadow-sm transition-transform duration-300 hover:scale-[1.02] sm:px-4 sm:py-3">
      <span className="text-center text-xs leading-tight font-semibold tracking-wide text-neutral-800 sm:text-sm md:text-base">
        {name}
      </span>
    </div>
  );
}
