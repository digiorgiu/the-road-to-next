import Link from "next/link";

import Heading from "@/components/heading";
import { ticketsPath } from "@/paths";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="HomePage" description="Your place to start" />
      <div className="flex flex-1 flex-col items-center">
        <Link href={ticketsPath()}>Go to tickets page</Link>
      </div>
    </div>
  )
}