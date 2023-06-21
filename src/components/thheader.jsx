import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon,Cog6ToothIcon,WalletIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import WalletModal from './walletmodal';
const logo=require("../images/lodge-crest-1.png")

const navigation = [
  { name: 'Dashboard', href: '/DashBoard', current: false },
  
  // { name: 'Farmlands', href: '/FarmLands', current: false },
  { name: 'Masonry', href: '/Masonry', current: false },
  { name: 'WildCards', href: '/WildCards', current: false },
  { name: 'Farmlands', href: '/Genesis', current: false },

  { name: 'Presale', href: '/Presale', current: false },
  { name: 'Wildroom', href: '/WildRoom', current: false },
  { name: 'Zapper', href: '/Zapper', current: false },
  { name: 'Claim', href: '/Claim', current: false },
  { name: 'Liquidity', href: '/Liquidity', current: false },

]
const userNavigation = [{name: 'Docs', href: 'https://lodgedocs.gitbook.io/lodge-capital/', current: false },{name: 'Youtube', href: 'https://www.youtube.com/@lodgecapital/featured', current: false},{name: 'Twitter', href: 'https://twitter.com/lodgecapital', current: false},{name: 'Discord', href: 'https://discord.gg/lodgecapital', current: false },];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ExampleHeader() {
  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="mx-auto  px-4 sm:px-6 lg:px-8 ">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center 2xl:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center font-lodge text-white text-xl">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src={"https://cdn.discordapp.com/attachments/943951700379721740/1072891751452381214/leve-icon.png"}
                    alt="LODGE"
                  />
                  <img
                    className="hidden h-12 w-auto lg:block mr-2"
                    src="https://cdn.discordapp.com/attachments/943951700379721740/1072891751452381214/leve-icon.png"
                    alt="Your Company"
                  />
                </div>
               
                <div className="hidden md:hidden md:ml-6 xl:hidden 2xl:flex  md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white font-lodge text-lg',
                        'px-3 py-2 rounded-md text-sm font-calibri'
                      )} 
                      aria-current={item.current ? 'page' : undefined} 
                     
                    >
                      {item.name}
                    </a>
                  ))}
                   <button
        type="button"
        className="inline-flex lg:hidden xl:visible items-center rounded-md border border-transparent bg-indigo-500 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Book an AMA
      </button>
                </div>
              </div>
              <div className="flex items-center">
                
                <div className="flex-shrink-0">
                  
                <ConnectButton />
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                <WalletModal/>

                  {/* Profile dropdown */}
                  
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="2xl:hidden ">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white font-calibri text-lg text-center ',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                 
                </div>
                <div className="ml-3">
                
                </div>
               <WalletModal/>
              </div>
              
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
