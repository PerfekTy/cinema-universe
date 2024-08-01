import { ThemeSwitcher } from "@/components/theme-switcher";

export default async function Home() {
  return (
    <main className="lg:container">
      <ThemeSwitcher />
    </main>
  );
}
