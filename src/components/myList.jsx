const people = [
    { name: 'Lock', title: '10 DUES', email: '0x301414578ff9a16C7e39778f7be274Dc6DC06a2e', role: 'https://bscscan.com/tx/0x4fca35efbecbfdf3350426f1713e0c52fed23ef09ed13ea1b260b489229648e7' },
    { name: 'Lock', title: '10 DUES', email: '0x301414578ff9a16C7e39778f7be274Dc6DC06a2e', role: 'https://bscscan.com/tx/0x4fca35efbecbfdf3350426f1713e0c52fed23ef09ed13ea1b260b489229648e7' },
    { name: 'Lock', title: '10 DUES', email: '0x301414578ff9a16C7e39778f7be274Dc6DC06a2e', role: 'https://bscscan.com/tx/0x4fca35efbecbfdf3350426f1713e0c52fed23ef09ed13ea1b260b489229648e7' },
    { name: 'Lock', title: '10 DUES', email: '0x301414578ff9a16C7e39778f7be274Dc6DC06a2e', role: 'https://bscscan.com/tx/0x4fca35efbecbfdf3350426f1713e0c52fed23ef09ed13ea1b260b489229648e7' },
    { name: 'Lock', title: '10 DUES', email: '0x301414578ff9a16C7e39778f7be274Dc6DC06a2e', role: 'https://bscscan.com/tx/0x4fca35efbecbfdf3350426f1713e0c52fed23ef09ed13ea1b260b489229648e7' },
    { name: 'Lock', title: '10 DUES', email: '0x301414578ff9a16C7e39778f7be274Dc6DC06a2e', role: 'https://bscscan.com/tx/0x4fca35efbecbfdf3350426f1713e0c52fed23ef09ed13ea1b260b489229648e7' },
    { name: 'Lock', title: '10 DUES', email: '0x301414578ff9a16C7e39778f7be274Dc6DC06a2e', role: 'https://bscscan.com/tx/0x4fca35efbecbfdf3350426f1713e0c52fed23ef09ed13ea1b260b489229648e7' },
    { name: 'Lock', title: '10 DUES', email: '0x301414578ff9a16C7e39778f7be274Dc6DC06a2e', role: 'https://bscscan.com/tx/0x4fca35efbecbfdf3350426f1713e0c52fed23ef09ed13ea1b260b489229648e7' },
    
    // More people...
  ]
  
  export default function Example2() {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-200">Recent Events</h1>
            <p className="mt-2 text-sm text-gray-200">
              A list of all the recent events in the beehive
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-opacity-100">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-6">
                        Type
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100">
                        Amount
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100">
                        Address
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100">
                        explorer
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600 bg-opacity-100">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-100 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-100">{person.title}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-100">{person.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-100">{person.role}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-white hover:text-gray-300">
                          {"->"}<span className="sr-only">, {person.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  