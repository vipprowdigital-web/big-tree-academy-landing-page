import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Big Tree Beauty Academy Admin Console" },
    { name: "description", content: "Welcome to The Big Tree Beauty Academy!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1b0717] p-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8 rounded-2xl border border-[#c9a86a]/40 bg-white px-8 py-10 shadow-2xl">
        <header className="w-full">
          <div className="mx-auto w-full max-w-60 aspect-6/5 overflow-hidden">
            <img
              src="/logo/the-big-tree-logo.png"
              alt="The Big Tree Academy"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </header>

        <div className="h-px w-16 bg-[#c9a86a]" />

        <div className="flex flex-col items-center justify-center w-full">
          <Button
            onClick={() => navigate("/sign-in")}
            className="w-full max-w-sm bg-[#1b0717] text-[#f7e9df] text-md hover:bg-[#2a0b1f] font-bold cursor-pointer"
          >
            Login to Console
          </Button>
        </div>
      </div>
    </main>
  );
}
