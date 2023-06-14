import { InformationCircleIcon } from '@heroicons/react/20/solid'

export default function ExampleCA() {
  return (
    <div className="rounded-md bg-white p-4 ">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-black" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-black">Every $99 + transaction is eligible for the WildCard contest</p>
          <p className="mt-3 text-sm md:mt-0 md:ml-6">
            <a href="https://discord.com/channels/943756297826889769/1056207297770160138/1066452208712949870" className="whitespace-nowrap font-medium text-black hover:text-gray-600">
              Details
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
