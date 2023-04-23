import {
  CURRENTLINE,
  ORANGE,
  PURPLE,
  CYAN,
  RED,
} from "../../helpers/color";
const Contactt = () => {
  return (
    <div className="col-md-6">
      <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            <div className="col-md-4">
              <img
                src="https://placekitten.com/640/360"
                alt=""
                style={{ border: `1px solid ${PURPLE}` }}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-7">
              <ul className="list-group">
                <li className="list-group-item list-group-item-dark">
                  نام و نام خانوادگی: <span className="fw-bold">رضا عظیمی</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  شماره مبایل: <span className="fw-bold">01915815445</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  آدرس ایمیل: <span className="fw-bold">www.gmail.com</span>
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
