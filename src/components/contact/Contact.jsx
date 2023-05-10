import { CURRENTLINE, ORANGE, PURPLE, CYAN, RED } from "../../helpers/color";
const Contactt = ({ contact }) => {
  return (
    <div className="col-md-6">
      <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            <div className="col-md-4">
              <img
                src={contact.phot}
                alt={contact.fullName}
                style={{ border: `1px solid ${PURPLE}` }}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-7">
              <ul className="list-group">
                <li className="list-group-item list-group-item-dark">
                  نام و نام خانوادگی:{" "}
                  <span className="fw-bold">{contact.fullName}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  شماره مبایل: <span className="fw-bold">{contact.phone}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  آدرس ایمیل: <span className="fw-bold">{contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-1 d-flex flex-column align-items-center">
              <button className="btn my-1" style={{ backgroundColor: ORANGE }}>
                <i className="fa fa-eye"></i>
              </button>
              <button className="btn my-1" style={{ backgroundColor: CYAN }}>
                <i className="fa fa-pen"></i>
              </button>
              <button className="btn my-1" style={{ backgroundColor: RED }}>
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contactt;
