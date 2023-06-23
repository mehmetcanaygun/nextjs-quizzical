import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-16 mb-5 flex justify-between items-center px-4 rounded-lg bg-primary shadow-lg">
      <Link href="/" className="text-light text-2xl font-bold">
        <span className="text-secondary">Quiz</span>
        zical
      </Link>

      <Link
        href="/create"
        className="text-light font-bold hover:text-secondary transition"
      >
        Create a quiz
      </Link>
    </div>
  );
};

export default Navbar;
