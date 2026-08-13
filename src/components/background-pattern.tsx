export default function BackgroundPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <span className="v-ring -top-41.25 -left-150.5 md:-top-111.5 md:-left-134.75 xl:-top-103.25" />
      <span className="v-ring -right-109.25 -bottom-92.25 hidden xl:block" />
    </div>
  );
}
