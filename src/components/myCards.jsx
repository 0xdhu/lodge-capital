import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/20/solid'
import ExampleFF from "@/components/footer.jsx"
const people = [
  {
    name: 'Beehive Lock',
    title: 'Locked till 19th Of May 2023',
    role: 'Eligible for Airdrop',
   
    imageUrl:
      'https://cdn.discordapp.com/attachments/943951700379721740/1072954605811548171/4865096.png',
  },
  {
    name: 'Beehive Lock',
    title: 'Locked till 19th Of May 2023',
    role: 'Eligible for Airdrop',
    
    imageUrl:
      'https://cdn.discordapp.com/attachments/943951700379721740/1072955053406703696/eye.png',
  },
  {
    name: 'Beehive Lock',
    title: 'Locked till 19th Of May 2023',
    role: 'Eligible for Airdrop',
    
    imageUrl:
      'https://cdn.discordapp.com/attachments/943951700379721740/1072955343728021595/istockphoto-1401160260-612x612.jpg',
  },
  {
    name: 'Beehive Lock',
    title: 'Locked till 19th Of May 2023',
    role: 'Eligible for Airdrop',
    
    imageUrl:
      'https://cdn.discordapp.com/attachments/943951700379721740/1072955343728021595/istockphoto-1401160260-612x612.jpg',
  },
  
  // More people...
]

export default function ExampleCards() {
  return (
    <ul role="list" className="grid grid-cols-1 mb-96    gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-5  justify-content-center  ">
      {people.map((person) => (
        <li
          key={person.name}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-gray-700 text-center shadow   "
        >
          <div className="flex flex-1 flex-col p-8">
            <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={person.imageUrl} alt="" />
            <h3 className="mt-6 text-sm font-medium text-gray-900">{person.name}</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-200">{person.title}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  {person.role}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`#`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-200 hover:text-gray-500"
                >
                  <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Add</span>
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`#`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-200 hover:text-gray-500"
                >
                  <LockOpenIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Withdraw</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
   
  )
  
}
