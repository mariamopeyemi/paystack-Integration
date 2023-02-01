import React, { useState } from "react";
import BaseContainer from "./BaseContainer";
import { useRouter } from 'next/router';


const BaseLayout = ({ children }) => {

  const router = useRouter();
  const pages = [
    // { name: "Pop Up", link: `/pop`, },
    // { name: "Our Works", link: `/works`,  },
    // { name: "Get All", link: `/all`,  },
    { name: "Get Transaction", link: `/transactions`,  },
    { name: "My Portfolio", link: `https://www.opeyemi.dev/`,  },
]
  const [showNav, setShowNav] = useState(false);
  return (
    <div>
      <header className=" bg-[#111111] h-20 flex items-center">
        <BaseContainer className=" flex items-center justify-between mx-auto">
          <p className="text-white cursor-pointer" onClick={()=>router.push('/')}>MARIAM STORE</p>
          <nav className="hidden md:block">
            <ul className="flex items-center">
              {pages?.map((page, i) => {
                return (
                  <li key={i} className=" mb-16 md:mb-0 md:mr-16">
                    <a onClick={()=>{router.push(page.link)}} className="link-primary hover:opacity-50">{page.name}</a>
                  </li>
                );
              })}

            </ul>
          </nav>

          {/* Mobile Nav */}
          <nav className={`w-screen h-[30vh] p-[6rem] bg-black z-40 fixed top-[0px] left-0 block md:hidden transition-all duration-300 ${showNav ? " translate-x-0" : " -translate-x-full"}`}>
            <ul className="flex flex-col items-end">
              {pages?.map((page, i) => {
                return (
                  <li key={i} className=" mb-10">
                    <p onClick={()=>{router.push(page.link)}}  className="link-primary text-[16px] font-semibold">{page.name}</p>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            className=" z-50 text-[30px] text-green-900 md:hidden"
            onClick={() => {
              setShowNav(!showNav);
            }}
          >
            ☰
          </button>
        </BaseContainer>
      </header>
      <main>{children}</main>
      <footer>Footer goes here</footer>
    </div>
  );
};

export default BaseLayout;
