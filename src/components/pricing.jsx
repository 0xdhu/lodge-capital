/* This example requires Tailwind CSS v3.0+ */
import { useState } from 'react'

import { CheckIcon,EllipsisVerticalIcon,EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

import Modal1 from "@/components/dmodal.jsx"

const frequencies = [
  { value: 'monthly', label: 'Mystery Box', priceSuffix: '/box' },
  { value: 'annually', label: 'WildCard', priceSuffix: '/year' },
]
const tiers = [
  {
    name: '1st Degree - Entered Apprentice⏳',
    id: 'tier-freelancer',
    href: '#',
    price: { monthly: '$111', annually: '$144' },
    description: 'Start to see the power of Lodge NFT',
    features: [ '3% APR BOOST FOR LIFE',
    '10% OFF SALES TAX FOR LIFE',
    '30% OFF BUY TAX FOR LIFE','EARLY MASONRY EXIT (1 TIME)','LEVEL 1 ORACLE (EXTRA ANALYTICS)',
    'EARLY MASONRY EXIT EVERY 12 \xa0 \xa0 \xa0 \xa0 \xa0 DAYS  FOR LIFE'
    ],
    mostPopular: false,
  },
  {
    name: `2nd Degree - Lucifer's Special 😈`,
    id: 'tier-startup',
    href: '#',
    price: { monthly: '$222', annually: '$288' },
    description: 'The Morning Star. Clever utilities.',
    features: [
      '6% APR BOOST FOR LIFE',
    '20% OFF SALES TAX FOR LIFE',
    '60% OFF BUY TAX FOR LIFE','EARLY MASONRY EXIT (1 TIME)','LEVEL 2 ORACLE (EXTRA ANALYTICS)',
    'EARLY MASONRY EXIT EVERY 6 DAYS  \xa0 FOR LIFE'
    ],
    mostPopular: true,
  },
  {
    name: `3rd Degree${" "} - ${" "} Master Mason${" "}  \xa0 \xa0   🛠`,
    id: 'tier-enterprise',
    href: '#',
    price: { monthly: '$333', annually: '$576' },
    description: 'Utilities of Providence. The best in The Lodge..',
    features: [
      '9% APR BOOST FOR LIFE',
    '20% OFF SALES TAX FOR LIFE',
    '90% OFF BUY TAX FOR LIFE','EARLY BEEHIVE EXIT (3 TIMES)','LEVEL 3 ORACLE (EXTRA ANALYTICS)',
    'EARLY MASONRY EXIT EVERY      3 DAYS  \xa0 FOR LIFE'
    ],
    mostPopular: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <div className=" bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
           Mystery Boxes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
        Unlike Wildcards EVERY Mystery Box contains a powerful Utility NFT that stays with you for life and the 3 Degrees represent the 3 levels of power contained in each Box ✅ 
        </p>
        <p className="mx-auto  max-w-2xl text-center text-lg leading-8 text-gray-300">50% of all Mystery Box sales are wrapped into liquidity and burned 🔥</p>
        <div className="mt-16 flex justify-center">
         
        </div>   <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
        The maximum number of Mystery Boxes a user may own is three. One Mystery Box per degree.
        </p>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div class=" card inline-block animate-border rounded-3xl bg-white bg-gradient-to-r from-black via-gray-500 to-white bg-[length:400%_400%] p-1 shadow-lg transition focus:outline-none focus:ring">
            <div
              key={tier.id}
              className={classNames(
                 ' bg-black h-full',
                'rounded-3xl p-8 xl:p-10'
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3 id={tier.id} className="text-lg font-semibold leading-8 text-white">
                  {tier.name}
                </h3>
                
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-300">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">{tier.price[frequency.value]}</span>
                <span className="text-sm font-semibold leading-6 text-gray-300">{frequency.priceSuffix}</span>
              </p>
            
             
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10 ">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
                
              </ul>
              <EllipsisHorizontalIcon className="h-6 w-5 flex-none text-white" aria-hidden="true"/>
               <Modal1 tier={tier.name} price={tier.price.monthly}/>
            </div>
            
            </div>
           
          ))}
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
        In order to own a 3° Mystery Box you must first own both a 1° & a 2° Mystery Box. To purchase a 2° Mystery Box you must own a 1° Mystery Box. Enjoy the utilities.
        </p>
    </div>
  )
}
