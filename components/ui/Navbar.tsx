import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <div className="h-16 mb-5 flex justify-between items-center px-4 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 shadow-lg">
      <Link href="/" className="text-light text-xl md:text-2xl font-bold">
        <span className="text-secondary">Quiz</span>
        zical
      </Link>

      <nav className="flex gap-3">
        <Link
          href="/"
          className="text-light font-bold hover:text-secondary transition flex items-center gap-1"
        >
          {path === "/" && (
            <span className="w-1 h-4 bg-secondary rounded inline-block animate-slideDown"></span>
          )}
          Home
        </Link>

        <Link
          href="/create"
          className="text-light font-bold hover:text-secondary transition flex items-center gap-1"
        >
          {path === "/create" && (
            <span className="w-1 h-4 bg-secondary rounded inline-block animate-slideDown"></span>
          )}
          Create a quiz
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
