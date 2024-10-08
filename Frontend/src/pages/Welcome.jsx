import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
export default function Welcome() {
    return (
        <div>
            <div className="max-w-md mx-auto min-h-screen bg-primary">
                <div className="flex flex-col mx-[20px] items-center">
                    <div className="mt-[130px]">
                        <img src={logo} alt="TenTon Logo" />
                    </div>
                    <h1 className="text-white font-bold text-center text-6xl mt-2">TenTon</h1>
                    <p className="text-center font-light text-white mt-8">
                        Join the ultimate hub for Web3 professionals—where talent meets opportunity, projects find success, and communities grow. Create a free TenTon Account Today.</p>

                    <Link to="/signup" className="w-full">
                        <button className="w-full rounded-md py-2 bg-[#0D0D0D] text-white mt-[120px] mb-[10px]">Create account</button>
                    </Link>
                    <Link to="/signin" className="w-full">
                        <button className="w-full rounded-md py-2 bg-[#0D0D0D] text-white mt-[10px] mb-[30px]">Sign In</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}