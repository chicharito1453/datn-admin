import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import callAPI from "../../utils/api/callAPI";
import { Fail, isOK } from "../../utils/sweetalert2/alert";
import { saveToLS } from "../../utils/localStorage/localStorage";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    document.title = "Đăng nhập";
    document.querySelector(".content").style.height = "auto";
  }, []);

  async function handleLogin() {
    if (!user.username.trim()) {
      Fail("Chưa nhập tên đăng nhập!");
      return false;
    }
    if (!user.password) {
      Fail("Chưa nhập mật khẩu!");
      return false;
    }
    const [error, resp] = await callAPI(
      `${process.env.REACT_APP_PROXY}/admin/login?username=${user.username}&password=${user.password}`,
      "POST"
    );
    if (error) {
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, message } = resp.data;
    if (!isOK(message)) {
      Fail(message);
      return false;
    }
    saveToLS("myData", result[0]);
    const { location } = history;
    window.location = `http://localhost:8000${
      location.state ? location.state.next : "/"
    }`;
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="/assets/img/favicon.ico"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">Okteam</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Đăng nhập bằng tài khoản admin
                      </h5>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={user.username}
                          onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                          }
                        />
                        <label className="form-label" htmlFor="form2Example17">
                          Tài khoản
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={user.password}
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                        />
                        <label className="form-label" htmlFor="form2Example27">
                          Mật khẩu
                        </label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={handleLogin}
                        >
                          Đăng nhập
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
