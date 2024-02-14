const { Link } = require("react-router-dom");

const NavBar = () => {
    return (
        <nav>
            <ul className="list-none hidden sm:flex flex-row justify-center gap-10 font-medium">
                <li className="text-[16px] hover:text-color-blue font-semibold">
                    <a href="/">Instruments</a>
                </li>
                <li className="text-[16px] hover:text-color-blue font-semibold">
                    <a href="/planning">Albums</a>
                </li>
                <li className="text-[16px] hover:text-color-blue font-semibold">
                    <a href="/catalogue">Tracks</a>
                </li>
            </ul>
      
        </nav>
    );
}

export default NavBar;