import { useState } from "react";
import logo from "../../assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Navbar: React.FC = () => {
	const { user, handleLogout } = useAuth();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
				<div className="px-3 py-3 lg:px-5">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<button
								type="button"
								className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
								onClick={() => setSidebarOpen(prev => !prev)}
							>
								<span className="sr-only">Abrir barra lateral</span>
								<MenuIcon className="w-6 h-6" />
							</button>
							<Link to="/" className="flex items-center ms-2">
								<img src={logo} className="h-8 me-3" alt="Logo" />
							</Link>
						</div>
						<div className="relative">
							<button
								type="button"
								className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
								onClick={() => setDropdownOpen(prev => !prev)}
							>
								<span className="sr-only">Menu</span>
								<img className="w-9 h-9 rounded-full" src="https://img.freepik.com/premium-vector/person-icon_109161-4674.jpg" alt="user photo" />
							</button>

							{dropdownOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-sm shadow-lg z-50 dark:bg-gray-700 dark:divide-gray-600">
									<div className="px-4 py-3">
										<p className="text-sm text-gray-900 dark:text-white">{user?.name}</p>
										<p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">{user?.email}</p>
									</div>
									<ul className="py-1">
										<Link to="/profile"><li className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-white">Perfil</li></Link>
										<Link to="/configs"><li className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-white">Configurações</li></Link>
										<li className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-white cursor-pointer" onClick={handleLogout}>Sair</li>
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>
			<aside
				className={`fixed top-0 left-0 z-40 w-48 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
				aria-label="Sidebar"
			>
				<div className="h-full px-3 pb-4 overflow-y-auto">
					<ul className="space-y-2 font-medium">
						<li>
							<Link to={"/"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
								<HomeIcon className="w-d h-6 mr-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
								Posts
							</Link>
						</li>
						<li>
							<Link to={"/explore"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
								<SearchIcon className="w-d h-6 mr-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
								Explorar
							</Link>
						</li>
						<li>
							<Link to={"/books"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
								<BookIcon className="w-d h-6 mr-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
								Livros
							</Link>
						</li>
					</ul>
				</div>
			</aside>
		</>
	);
};