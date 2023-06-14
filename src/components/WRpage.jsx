/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
    ],
  }
  ```
*/
import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  AcademicCapIcon,
  BanknotesIcon,
  Bars3Icon,
  BellIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const user = {
  name: 'Chelsea Hagon',
  email: 'chelsea.hagon@example.com',
  role: 'Human Resources Manager',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Profile', href: '#', current: false },
  { name: 'Resources', href: '#', current: false },
  { name: 'Company Directory', href: '#', current: false },
  { name: 'Openings', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const stats = [
  { label: 'Vacation days left', value: 12 },
  { label: 'Sick days left', value: 4 },
  { label: 'Personal days left', value: 2 },
]
const actions = [
  {
    icon:"https://cdn-icons-png.flaticon.com/512/6662/6662936.png",
    name: 'Mystery boxes',
    href: '/MysteryBoxes',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/6891/6891617.png",
    name: 'WildCards',
    href: '/WildCards',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/5052/5052139.png",
    name: 'Lodge Raffle',
    href: '#',
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/13/13973.png",
    name: 'WildGames',
    href: '#',
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/5256/5256508.png",
    name: 'Lodge Wheel',
    href: '#',
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-cyan-50',
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1633/1633308.png",
    name: 'Burn Wars',
    href: '#',
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-red-50',
  },
  
]
const recentHires = [
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Floyd Miles',
    handle: 'floydmiles',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Emily Selman',
    handle: 'emilyselman',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Kristin Watson',
    handle: 'kristinwatson',
    imageUrl:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
]
const announcements = [
  {
    id: 1,
    title: 'Office closed on July 2nd',
    href: '#',
    preview:
      'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.',
  },
  {
    id: 2,
    title: 'New password policy',
    href: '#',
    preview:
      'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.',
  },
  {
    id: 3,
    title: 'Office closed on July 2nd',
    href: '#',
    preview:
      'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ExamplePage() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      
        
       
          <div className="mx-auto m-1  px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Profile</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-3">
                

                {/* Actions panel */}
                <section aria-labelledby="quick-links-title " className=''>
                  <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
                    <h2 className="sr-only" id="quick-links-title">
                      Quick links
                    </h2>
                    {actions.map((action, actionIdx) => (
                      <div
                        key={action.name}
                        className={classNames(
                          actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                          actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                          actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                          actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none '  : '',
                          'relative group bg-white p-6 hover:ring-2 hover:ring-inset hover:ring-black  transition duration-300 ease-in-out '
                        )}
                      >
                        <div>
                          <span
                            className={classNames(
                              action.iconBackground,
                              action.iconForeground,
                              'rounded-lg inline-flex p-3 ring-4 ring-white'
                            )}
                          >
                            <img className="h-6 w-6" src={action.icon} />
                          </span>
                        </div>
                        <div className="mt-8">
                          <h3 className="text-lg font-medium">
                            <a href={action.href} className="focus:outline-none">
                              {/* Extend touch target to entire panel */}
                              <span className="absolute inset-0" aria-hidden="true" />
                              {action.name}
                            </a>
                          </h3>
                          <p className="mt-2 text-sm text-gray-500">
                            Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at
                            blanditiis et quo et molestiae.
                          </p>
                        </div>
                        <span
                          className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                          aria-hidden="true"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                          </svg>
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              
            </div>
          </div>
        
       
     
    </>
  )
}
