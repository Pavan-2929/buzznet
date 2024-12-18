"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = searchValue.trim();
    if (!value) return;

    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className={cn("relative w-[300px]", className)}>
      <form onSubmit={handleSubmit}>
        <Input
          className="pe-10"
          value={searchValue}
          placeholder="Search..."
          onChange={handleSearch}
        />
        <SearchIcon className="absolute right-3 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
      </form>
    </div>
  );
};

export default SearchBar;
