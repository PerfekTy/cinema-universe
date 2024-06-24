import { Navigation } from "@/components/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <main className="md:container ">
      <Navigation />
      <ThemeSwitcher />
    </main>
  );
}
