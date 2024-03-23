"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [navBarData, setNavBarData] = useState([]);
  useEffect(() => {
    const fetchData = fetch("http://localhost:3001/api/auth/navbar");
    fetchData
      .then((res) => res.json())
      .then((data) => setNavBarData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex justify-between items-center  max-w-4xl mx-auto">
        <Link href="/" className="text-white text-2xl font-bold">
          PRISMA.IO
        </Link>

        {navBarData?.navBar?.map((item: any, index: number) => {
          return (
            <Link
              href={`/${item?.url}`}
              key={index}
              className="text-white text-2xl font-bold"
            >
              {item?.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
