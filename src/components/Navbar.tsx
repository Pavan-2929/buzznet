import React from "react";
import UserButton from "./UserButton";
import SearchBar from "./SearchBar";

const Navbar = () => {
    return (
        <div className="bg-card">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-4 px-5 py-3 sm:gap-y-0">
                <div className="text-2xl font-bold text-primary">
                    <p>BuzzNet</p>
                </div>
                <SearchBar className="order-3  sm:order-2  " />
                <UserButton className="order-2 ms-auto sm:order-3" />
            </div>
        </div>
    );
};

export default Navbar;
