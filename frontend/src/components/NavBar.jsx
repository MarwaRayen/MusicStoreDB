

const NavBar = () => {
    return (
        <nav >
            <div className="flex flex-row justify-center items-center align-center">
            <ul className="mt-6 list-none hidden sm:flex flex-row justify-center gap-10 font-medium">
                <li className="text-[16px] hover:text-color-blue font-semibold">
                    <a href="/">Instruments</a>
                </li>
                <li className="text-[16px] hover:text-color-blue font-semibold">
                    <a href="/albums">Albums</a>
                </li>
                <li className="text-[16px] hover:text-color-blue font-semibold">
                    <a href="/tracks">Tracks</a>
                </li>
            </ul>
            </div>
            
      
        </nav>
    );
}

export default NavBar;