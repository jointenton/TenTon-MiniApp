import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
export default function Welcome() {
    return (
        <div>
            <div className="max-w-md sm:mx-auto min-h-screen bg-primary">
                <div className="flex flex-col mx-[20px] items-center">
                    <div className="mt-[200px]">
                        <img src={logo} alt="TenTon Logo" />
                    </div>
                    <h1 className="text-white font-bold text-center text-6xl mt-2">TenTon</h1>
                    <p className="text-center font-light text-white mt-8">TenTon is a telegram mini-app <br />
                        that helps grow a web3 community, <br />
                        host events, hunt bounties and lots <br />
                        more. <br />
                        Explore to see full features</p>

                    <Link to="/signup" className="w-full">
                        <button className="w-full rounded-md py-2 bg-[#0D0D0D] text-white mt-[150px]">Create account</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}