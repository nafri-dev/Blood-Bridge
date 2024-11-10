import { VelocityScroll } from "./components/ui/scroll-based-velocity";

export function ScrollBasedVelocityDemo() {
  return (
    <VelocityScroll
      text="Donate Blood . Save Life"
      default_velocity={3}
      className="font-mono text-center text-2xl font-bold tracking-[-0.02em] text-red-600 drop-shadow-sm dark:text-white md:text-5xl md:leading-[5rem]"
    />
  );
}
