import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50">
      main
      <main>
        <Button loading={true} variant="primary">
          button
        </Button>
        <Input placeholder="your name" />
      </main>
    </div>
  );
}
