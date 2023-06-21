import { ConnectButton } from "web3uikit"
import Image from 'next/image'
const logo=require("../images/lodge-crest-1.png")
export default function Header() {
    return (
        <nav className=" text-white   border-b-2 border-t-2 flex flex-wrap  justify-content-center ">
             
            <a className="text-white  py-4 px-4 font-bold text-xl flex-auto ml-20 " href="/DashBoard"> DashBoard</a>
            <a className=" text-white py-4 px-4 font-bold text-xl flex-auto" href="/Beehive"> Beehive</a>
            {/* <a className=" text-white py-4 px-4 font-bold text-xl flex-auto" href="/FarmLands"> FarmLands</a> */}
            <a className=" text-white py-4 px-4 font-bold text-xl flex-auto" href="/Masonry"> Masonry</a>
            
            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={false}/>
            </div>
        </nav>
    )
}