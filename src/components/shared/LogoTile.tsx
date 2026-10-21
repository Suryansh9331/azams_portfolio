type Props = {
  name: string;
  src?: string;
};

export function LogoTile({ name, src }: Props) {
  return (
    <div className="group relative flex aspect-4/3 items-center justify-center rounded-sm bg-white px-1.5 py-1 shadow-sm transition-transform duration-300 hover:scale-[1.02] sm:aspect-16/10 sm:px-4 sm:py-3">
      {src ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-center text-xs leading-tight font-semibold tracking-wide text-neutral-800 sm:text-sm md:text-base">
          {name}
        </span>
      )}
    </div>
  );
}
