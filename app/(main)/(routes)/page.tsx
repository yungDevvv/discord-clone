import { ModeToggle } from "@/components/mode-toogle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl">DISCORD CLONE</h1>
      <UserButton afterSignOutUrl="/sign-in" />
      <ModeToggle />
    </div>
  )
}
