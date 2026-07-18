import { Button, Input } from "@/src/components/ui";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50">
      main
      <main>
        <Button loading={true} variant="muted">
          button
        </Button>
        <Input placeholder="your name" />
      </main>
    </div>
  );
}
