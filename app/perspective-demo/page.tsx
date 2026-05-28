import { Perspective, Highlight } from "@/components/ui/perspective-highlight";

export default function DemoOne() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <Perspective>
        <article className="text-[15px] leading-[1.75] text-muted-foreground">
          <p className="mb-[1.1em]">
            <Highlight color="red">Three nested wrappers</Highlight>, each with
            one job.
          </p>
          <p className="mb-[1.1em]">
            <Highlight color="purple">
              The whole effect rides on CSS perspective.
            </Highlight>
          </p>
          <p>
            <Highlight color="green">
              The card tilts toward wherever your cursor goes.
            </Highlight>
          </p>
        </article>
      </Perspective>
    </div>
  );
}
