import { PURPLE } from "../../helpers/color";
const SearchContact = () => {
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        style={{ backgroundColor: PURPLE }}
        id="basic-addon1"
      >
        <i className="fas fa-search"></i>
      </span>
      <input 
        dir="rtl"
        type="text"
        className=" form-control "
        placeholder="جست و جوی مخاطب"
        aria-label="search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};
export default SearchContact;
