import Link from "next/link";

const Footer = () => {
  return (
    <div className="h-32 mt-5 flex flex-col gap-2 justify-center items-center bg-dark text-light">
      <Link href="/" className="text-light text-2xl font-bold">
        <span className="text-secondary">Quiz</span>
        zical
      </Link>

      <a
        href="https://github.com/mehmetcanaygun"
        target="_blank"
        rel="noopener noreferrer"
        className="text-light text-sm hover:text-secondary transition"
      >
        mca
      </a>
    </div>
  );
};

export default Footer;
