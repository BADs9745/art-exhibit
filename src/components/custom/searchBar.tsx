import { kreon } from "@/fonts/font";
import SearchIcon from "@/icons/search";

export default function SearchBar() {
	return (
		<div className="flex *:text-space-4 relative items-center group">
			<div className="absolute left-2 group-focus-within:*:scale-0 group-focus-within:*:opacity-0 *:duration-300">
				<SearchIcon className="fill-space-4" />
			</div>
			<input
				type="text"
				className={`${kreon.className} w-96 rounded p-2 pl-10 text-lg focus:pl-2 duration-300 placeholder:italic bg-space-4 bg-opacity-10`}
				placeholder="Search..."
			/>
		</div>
	);
}
