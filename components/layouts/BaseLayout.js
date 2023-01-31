import React, { useState } from "react";
import BaseContainer from "./BaseContainer";
import { useRouter } from 'next/router';


const BaseLayout = ({ children }) => {

  const router = useRouter();
  const navs = ["PopUp", "Verify", "Career", "Blog"];
  const pages = [
    { name: "Pop Up", link: `/pop`, },
    // { name: "Our Works", link: `/works`,  },
    { name: "Get All", link: `/all`,  },
    { name: "Get Each", link: `/each`,  },
    { name: "My Portfolio", link: `https://www.opeyemi.dev/`,  },
]
  const [showNav, setShowNav] = useState(false);
  return (
    <div>
      <header className=" bg-[#111111] h-20 flex items-center">
        <BaseContainer className=" flex items-center justify-between mx-auto">
          {/* <img src="/yebox-tech-logo.svg"></img> */}
          <p className="text-white cursor-pointer" onClick={()=>router.push('/')}>MILADE STORE</p>
          <nav className="hidden md:block">
            <ul className="flex items-center">
              {pages?.map((page, i) => {
                return (
                  <li key={i} className=" mb-16 md:mb-0 md:mr-16">
                    <p onClick={()=>{router.push(page.link)}} className="link-primary hover:opacity-50">{page.name}</p>
                  </li>
                );
              })}

              <li>
                <button className=" btn-primary">Talk to us</button>
              </li>
            </ul>
          </nav>

          {/* Mobile Nav */}
          <nav className={`w-screen h-screen bg-black z-40 fixed top-0 left-0 block md:hidden transition-all duration-300 ${showNav ? " translate-x-0" : " -translate-x-full"}`}>
            <ul className="flex flex-col items-center">
              {pages?.map((page, i) => {
                return (
                  <li key={i} className=" mb-16">
                    <a onClick={()=>{router.push(page.link)}}  className="link-primary text-4xl font-semibold">{page.name}</a>
                  </li>
                );
              })}
{/* <Typography 
                  className='text-sm' 
                  onClick={()=>{router.push(page.link)}} 
                  textAlign="center">{page.name}</Typography> */}
              <li>
                <button className=" btn-primary">Talk to us</button>
              </li>
            </ul>
          </nav>

          <button
            className=" z-50 bg-red-200 md:hidden"
            onClick={() => {
              setShowNav(!showNav);
            }}
          >
            Open nav
          </button>
        </BaseContainer>
      </header>
      <main>{children}</main>
      <footer>Footer goes here</footer>
    </div>
  );
};

export default BaseLayout;
