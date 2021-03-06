import { useState, useEffect, useCallback } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { ALL_POSTS } from "../../store/action/index";
import okteamAPI from "../../utils/api/okteamAPI";
import okteam_upload from "../../utils/api/okteam_upload";
import { Fail, isOK, Success, Approve } from "../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../utils/loading-overlay/loading-overlay";
import FormPost from "./form/FormPost";
import TablePost from "./table/TablePost";

const Post = ({ data, getAllPosts }) => {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }

  // DANH SÁCH BÀI VIẾT
  const list_posts = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI("/post/list");
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      getAllPosts([]);
      document.querySelector(".content").style.height = "auto";
      return false;
    }
    const { result } = resp.data;
    fetchingOff();
    getAllPosts(result);
    document.querySelector(".content").style.height = "auto";
    return true;
  }, [getAllPosts]);

  // check form
  function check_form(formData) {
    if (!formData.title.trim()) {
      Fail("Vui lòng nhập tiêu đề bài viết!");
      return false;
    }
    if (!formData.content.trim()) {
      Fail("Vui lòng nhập nội dung bài viết!");
      return false;
    }
    return true;
  }

  // THÊM BÀI VIẾT
  async function them_post(formData) {
    if (!check_form(formData)) return;
    fetchingOn();
    // upload anh
    if (formData.image) {
      const [error, resp] = await okteam_upload(formData.image);
      if (error) {
        fetchingOff();
        Fail("Không upload được ảnh!");
        console.log(error);
        return false;
      }
      formData.image = resp.data.secure_url;
    }
    // them
    const [error, resp] = await okteamAPI("/post/add", "POST", formData);
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, message } = resp.data;
    if (!isOK(message)) {
      fetchingOff();
      Fail(message);
      return false;
    }
    fetchingOff();
    Success("Tạo bài viết thành công!");
    setShow(false);
    getAllPosts(result);
    return true;
  }

  // XÓA BÀI VIẾT
  async function delete_post(post) {
    Approve(
      "Bạn đang thực hiện xóa bài viết này.\nTiếp tục thực hiện ?",
      async () => {
        fetchingOn();
        const [error, resp] = await okteamAPI("/post/delete", "DELETE", post);
        if (error) {
          fetchingOff();
          Fail("Không thực hiện được thao tác!");
          console.log(error);
          return false;
        }
        const { result, message } = resp.data;
        if (!isOK(message)) {
          fetchingOff();
          Fail(message);
          return false;
        }
        fetchingOff();
        Success("Xóa bài viết thành công!");
        getAllPosts(result);
        return true;
      }
    );
  }

  useEffect(() => {
    document.title = "Quản trị - Tin tức";
    document.querySelector(".content").style.height =
      window.innerHeight - 60 + "px";
    list_posts();
  }, [list_posts]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Tin tức</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(true)}
      >
        Tạo bài viết
      </Button>
      <br />
      <br />
      <TablePost data={data} deleted={delete_post} />
      <Modal
        size="lg"
        show={show}
        centered
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo bài viết</Modal.Title>
        </Modal.Header>
        <FormPost close={handleClose} add={them_post} />
      </Modal>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    data: state.posts,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllPosts: (list) => {
      dispatch(ALL_POSTS(list));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Post);
