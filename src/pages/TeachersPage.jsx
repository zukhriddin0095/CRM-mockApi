import { Checkbox, Form, Input, Modal, Space, Table, message } from "antd";
import { Fragment, useEffect, useState } from "react";
import request from "../server";
import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

const TeachersPage = () => {
  // tableee
  const [form] = Form.useForm();
  const [selected, setSelected] = useState(null);
  const [searchText, setsearchText] = useState("");
  const [loading, setLoading] = useState(false)

  const columns = [
    {
      title: "first Name",
      dataIndex: "firstName",
      key: "firstName",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record.firstName.toLowerCase().includes(value) ||
          record.lastName.toLowerCase().includes(value)
        );
      },
    },
    {
      title: "last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "image",
      dataIndex: "avatar",
      key: "avatar",
      render: (data, row) => {
        return (
          <img
            style={{ borderRadius: "10px" }}
            height={50}
            src={data}
            alt={row.firstName + row.lastName}
          />
        );
      },
    },
    {
      title: "isMarried",
      key: "isMarried",
      dataIndex: "isMarried",
      render: (data) => (data ? "yes" : "no"),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <button
            className="button__control"
            onClick={() => editData(record.id)}
          >
            <EditOutlined />
          </button>
          <button
            className="button__control"
            onClick={() => deleteData(record.id)}
          >
            <DeleteOutlined />
          </button>
          <button
            onClick={() => redrictStudent(record.id)}
            className="button__control"
          >
            <UserSwitchOutlined />
          </button>
        </Space>
      ),
    },
  ];
  // tableee

  // fetchData
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  async function fetchData() {
    try {
      setLoading(true)
      let { data } = await request.get("categories");
      setData(data);
      setLoading(false)
    } catch (err) {
      message.error("malumot jo'natishda hatolik roy berdi");
    }
  }
  // fetchData

  // modal

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setSelected(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("categories", values);
      } else {
        await request.put(`categories/${selected}`, values);
      }
      fetchData();
      setIsModalOpen(false);
    } catch (err) {
      message.error("hato");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // modal
  // editData
  async function editData(id) {
    setSelected(id);
    setIsModalOpen(true);
    let { data } = await request.get(`categories/${id}`);
    form.setFieldsValue(data);
    console.log(data);
  }
  // editData

  // deleteData

  async function deleteData(id) {
    const conDelete = confirm("haqiqatdan o'chirishni hohlesizmi?");

    if (conDelete) {
      await request.delete(`categories/${id}`);
      fetchData();
    }
  }

  // deleteData

  function redrictStudent(id) {
    navigate(`/teacherstudents/${id}`);
  }

  // searchTeacher
  // searchTeacher

  return (
    <Fragment>
      <div className="ant-layout-content">
        <Table
          loading={loading}
          bordered
          title={() => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1>Teachers({data.length})</h1>
              <input
                placeholder="searching ...."
                style={{
                  paddingLeft: "10px",
                  width: "50%",
                  height: "40px",
                  borderRadius: "15px",
                  border: "1px solid #888",
                  outline: "none",
                }}
                type="text"
                onChange={(e) => setsearchText(e.target.value)}
              />
              <button
                onClick={showModal}
                className="addButton"
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Add Teacher
              </button>
            </div>
          )}
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
        />
        ;
      </div>

      <Modal
        title="Add Teacher"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={selected === null ? "Add Teacher" : "Save Teacher"}
      >
        <Form
          form={form}
          name="modal"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="FirstName"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please Fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="LastName"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please Fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please Fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="isMarried"
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
          >
            <Checkbox>isMarried</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};
export default TeachersPage;
