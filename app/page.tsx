import Button from "@/src/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50">
      <main>
        <Button loading={true} variant="primary">
          button
        </Button>
      </main>
    </div>
  );
}
