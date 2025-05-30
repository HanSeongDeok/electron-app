import { Button } from "@/images/components/ui/button";
import { NavLink } from "react-router-dom";

const Test = () => {
    return (
        <div className="p-12 bg-blue-500 text-white text-xl">
            <NavLink to="/" className="fixed top-[25px] right-[10px]">
                <Button>Go to Home</Button>
            </NavLink>
            Tailwind 적용 성공!
        </div>
    );
}

export default Test;