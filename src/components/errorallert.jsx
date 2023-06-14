import { InformationCircleIcon } from '@heroicons/react/20/solid'

export default function ExampleCAR() {
  return (
    <div className="rounded-md bg-red-500 p-4 ">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-white">Warning! This dapp is connected to the mainnet and we are testing the responsiveness!By executing a transaction, you are using your own funds.</p>
          <p className="mt-3 text-sm md:mt-0 md:ml-6">
            
          </p>
        </div>
      </div>
    </div>
  )
}
