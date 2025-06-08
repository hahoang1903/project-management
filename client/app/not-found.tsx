import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex size-full flex-col items-center pt-20 dark:text-white">
      <Image
        src="/images/404_error.png"
        alt="logo"
        width={350}
        height={350}
        className="h-auto"
      />

      <div className="px-24 pt-6 text-center">
        <h1 className="text-2xl font-bold">
          Oops! We can’t seem to find that resource.
        </h1>
        <p className="pt-3 pb-6 text-base">
          It looks like the resource you’re looking for has gone on an
          unexpected detour. Don’t worry—we’re sending out a search party to
          round it up. In the meantime, you can head back to the homepage to
          regroup while we track it down.
        </p>
      </div>

      <Link href="/" className="try-again-btn rounded-lg px-8 py-2 text-lg">
        Home Sweet Home
      </Link>
    </div>
  );
}
