import React, { useState } from 'react';
import { Transition } from '@headlessui/react'

import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "../components/myHeader.jsx";
import Header1 from "../components/Header.jsx";
import YouTube from 'react-youtube';

const inter = Inter({ subsets: ["latin"] });


const navigation = [
    {
      name: "Twitter",
      href: "https://twitter.com/lodgecapital",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Discord",
      href: "https://discord.gg/lodgecapital",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 16 16 " {...props}>
          {" "}
          <path
            fillRule="evenodd"
            d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"
            clipRule="evenodd"
          ></path>{" "}
        </svg>
      ),
    },
    {
      name: "Telegram",
      href: "https://t.me/lodgecapital",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 16 16 " {...props}>
          {" "}
          <path
            fillRule="evenodd"
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"
            clipRule="evenodd"
          ></path>{" "}
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@lodgecapital",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 22 22" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];
function Modal() {
  const [showModal, setShowModal] = useState(true);
  const [isShowing, setIsShowing] = useState(false)
  const handleClick = () => {
    setShowModal(!showModal);
  }

  const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };


    const optsm = {
      height: '190',
      width: '340',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };


    

  return (
    <div>
    
       (
         <Transition
         show={showModal}
         enter="transition-opacity duration-75"
         enterFrom="opacity-0"
         enterTo="opacity-100"
         leave="transition-opacity ease-in duration-1000"
         leaveFrom="opacity-100"
         leaveTo="opacity-0"
       >
        

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  fixed  left-0 w-full h-full bg-black  z-50 ">
        <div className="font-lodge bg-transparent  text-white text-6xl self-center origin-center object-center  text-center pt-10 sm:pt-56 animate-fade-out">
        
          <img
            className="self-center origin-center object-center bg-transparent  text-center  inline-flex flex-auto"
            src="https://cdn.discordapp.com/attachments/943951700379721740/1066617951454756936/level-icon.png"
          ></img>
          
         
          
        </div>
        
        
         
        <div className="center flex flex-col justify-center items-center text-center">
        
      <div>
    
          <a
            className="inline-flex items-center rounded border bg-transparent text-white   px-9 py-3 text-base font-medium border-white shadow-sm hover:bg-black hover:text-white transition duration-300 ease-in-out hover:scale-110 hover:border-white hover:border-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 mx-1"
            href="https://lodgedocs.gitbook.io/lodge-capital/"
          >
            DOCS
          </a>
          <button
            className="inline-flex items-center rounded border bg-transparent text-white   px-6 py-3 text-base font-medium border-white shadow-sm hover:bg-black hover:text-white transition duration-300 ease-in-out hover:scale-110 hover:border-white hover:border-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 mx-1"
            onClick={handleClick}
          >
            PRESALE
          </button>
          </div>
          <div className='flex h-96'>
          <iframe
      className='flex-auto h-96'
        style={{
          paddingBottom: "56.25%" /* 16:9 */,
        paddingTop: 25,
          width: "50%",
          height: "100%"
        }}
        src={`https://www.youtube.com/embed/bnmcstEhykQ`}
        frameBorder="0"
      />
          </div>
          <div>
            <div className="inline-flex items-center m-10 space-x-6 md:order-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-400"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon
                    className="h-6 w-6 hover:animate-spin-slower"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

                 
        </div>
        </div></Transition>
      ) 
    </div>
  );
  
}

export default Modal;