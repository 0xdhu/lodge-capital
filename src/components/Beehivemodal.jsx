import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    MapPinIcon,LockClosedIcon
  } from '@heroicons/react/20/solid'
  function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
    const days = [
        { date: '2021-12-27' },
        { date: '2021-12-28' },
        { date: '2021-12-29' },
        { date: '2021-12-30' },
        { date: '2021-12-31' },
        { date: '2022-01-01', isCurrentMonth: true },
        { date: '2022-01-02', isCurrentMonth: true },
        { date: '2022-01-03', isCurrentMonth: true },
        { date: '2022-01-04', isCurrentMonth: true },
        { date: '2022-01-05', isCurrentMonth: true },
        { date: '2022-01-06', isCurrentMonth: true },
        { date: '2022-01-07', isCurrentMonth: true },
        { date: '2022-01-08', isCurrentMonth: true },
        { date: '2022-01-09', isCurrentMonth: true },
        { date: '2022-01-10', isCurrentMonth: true },
        { date: '2022-01-11', isCurrentMonth: true },
        { date: '2022-01-12', isCurrentMonth: true, isToday: true },
        { date: '2022-01-13', isCurrentMonth: true },
        { date: '2022-01-14', isCurrentMonth: true },
        { date: '2022-01-15', isCurrentMonth: true },
        { date: '2022-01-16', isCurrentMonth: true },
        { date: '2022-01-17', isCurrentMonth: true },
        { date: '2022-01-18', isCurrentMonth: true },
        { date: '2022-01-19', isCurrentMonth: true },
        { date: '2022-01-20', isCurrentMonth: true },
        { date: '2022-01-21', isCurrentMonth: true },
        { date: '2022-01-22', isCurrentMonth: true, isSelected: true },
        { date: '2022-01-23', isCurrentMonth: true },
        { date: '2022-01-24', isCurrentMonth: true },
        { date: '2022-01-25', isCurrentMonth: true },
        { date: '2022-01-26', isCurrentMonth: true },
        { date: '2022-01-27', isCurrentMonth: true },
        { date: '2022-01-28', isCurrentMonth: true },
        { date: '2022-01-29', isCurrentMonth: true },
        { date: '2022-01-30', isCurrentMonth: true },
        { date: '2022-01-31', isCurrentMonth: true },
        { date: '2022-02-01' },
        { date: '2022-02-02' },
        { date: '2022-02-03' },
        { date: '2022-02-04' },
        { date: '2022-02-05' },
        { date: '2022-02-06' },
      ]
export default function LevelModal() {
  const [open, setOpen] = useState(false)
  let [ValueOrder, setValueOrder] = useState(0);
  function handleOpen(){
    setOpen(true);
  }

  const cancelButtonRef = useRef(null)

  return (
    <> <button
    type="button"
    onClick={handleOpen}
    className="inline-flex m-5 fixed top-20 sm:bottom-52 sm:top-auto right-0 float z-50   rounded-lg  border-white border-2 bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2  "
  >
  <LockClosedIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
      
      Create Lock
  </button>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity" />
        </Transition.Child>
        
        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className='card relative transform overflow-hidden sm:overflow-visible     inline-block animate-border rounded-3xl  bg-gradient-to-r from-teal-500 via-blue-500 to-purple-900 bg-[length:400%_400%] p-1 shadow-lg transition focus:outline-none focus:ring m'>
               <div className="relative transform overflow-hidden rounded-3xl bg-gray-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all  sm:w-full sm:max-w-md sm:p-6"> <div className=' text-center font-extrabold text-xl'>🔒LOCK YOUR DUES🔒</div> 
                <div>
                <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <div className="flex items-center text-gray-200 text-base">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto font-semibold">January</div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-500 text-sm shadow ring-1 ring-gray-200">
            {days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  'py-1.5 hover:bg-gray-400   focus:z-10',
                  day.isCurrentMonth ? 'bg-gray-800' : 'bg-gray-700',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  day.isSelected && 'text-white',
                  !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-200',
                  !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-300',
                  day.isToday && !day.isSelected && 'text-indigo-600',
                  dayIdx === 0 && 'rounded-tl-lg',
                  dayIdx === 6 && 'rounded-tr-lg',
                  dayIdx === days.length - 7 && 'rounded-bl-lg',
                  dayIdx === days.length - 1 && 'rounded-br-lg'
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-gray-900'
                  )}
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </time>
              </button>
            ))}
          </div>
          </div> <div>
                  
                  <div className="mt-3 text-center sm:mt-5">
                    
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Select any amount of DUES to lock.
                      </p>
                      <div className='flex gap-2'>
                     </div>
                      <div className='flex gap-2 '> <input
            className="bg-red-500 text-red-400 flex-auto "
            type="range"
            
            w-full="true"
            min="0"
            max={100}
            step="0.01"
            value={ValueOrder}
            onChange={(event) => {
              setValueOrder(event.target.value);
            }}
            list="tickmarks1"
          /><input className="flex-auto rounded-lg my-1"
          type="number" // change the type to "number"
          style={{ maxWidth : "35%",borderColor :"#fff",cursor:"zoom-in" }}
          value={ValueOrder} // bind the value of the input field to the same value as the slider
          max={100}
          onChange={(event) => {
            setValueOrder(event.target.value); // update the value of the slider when the input field value changes
          }}
        /></div><p className='text-base text-gray-200'>
        Youll get ≈ {ValueOrder/180} veDUES </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:from-gray-900 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Lock $ {ValueOrder} DUES
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div></div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root></>
  )
}
