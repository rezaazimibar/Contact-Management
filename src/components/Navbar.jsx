import SearchContact from "./contact/searchContact";

import { PURPLE, BACKGROUND } from "../helpers/color";
const Navbar = () => {
  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-lg"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="container ">
        <div className="row w-100">
          <div className="col-6">
            <div className="navbar-brand">
              <i className="fas fa-id-badge" style={{ color: PURPLE }}></i> وب
              اپلیکیشن مدیرت <span style={{ color: PURPLE }}>مخاطبین</span>
            </div>
          </div>
          <div className="col">
            <SearchContact/>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
