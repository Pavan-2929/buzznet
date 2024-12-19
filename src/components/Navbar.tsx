import React from "react";
import UserButton from "./UserButton";
import SearchBar from "./SearchBar";
import ThemeToggler from "./ThemeToggler";

const Navbar = () => {
    return (
        <div className="bg-card sticky top-0 left-0 z-50">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-4 px-5 py-3 sm:gap-y-0">
                <div className="text-2xl font-bold text-primary">
                    <p>BuzzNet</p>
                </div>
                <SearchBar className="order-3 sm:order-2 w-full sm:w-auto max-w-[400px] mx-auto sm:mx-0" />
                <div className="order-2 ms-auto sm:order-3 flex items-center">
                    <ThemeToggler />
                    <UserButton />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
