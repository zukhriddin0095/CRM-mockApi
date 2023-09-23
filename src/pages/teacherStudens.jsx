import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../server";
import { Checkbox, Form, Input, Modal, Space, Table, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";


const TeacherStudens = () => {
  const { idStudents } = useParams();
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState(null);
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(false)

  // table

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
              style={{ borderRadius: "50px" }}
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
          </Space>
        ),
      },
    ];

  // table

  // fetchData
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true)
      let { data } = await request.get(`categories/${idStudents}/products`);
      setData(data);
      setLoading(false);

    } catch (err) {
      message.error("malumot jonatishda hatolik yuz berdi!");
    }
  }
  // fetchData

  
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
        await request.post(`categories/${idStudents}/products`, values);
      } else {
        await request.put(`categories/${idStudents}/products/${selected}`, values);
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
    let { data } = await request.get(`categories/${idStudents}/products/${id}`);
    form.setFieldsValue(data);
  }
  // editData

  // deleteData

  async function deleteData(id) {
    const conDelete = confirm("haqiqatdan o'chirishni hohlesizmi?");

    if (conDelete) {
      await request.delete(`categories/${idStudents}/products/${id}`);
      fetchData();
    }
  }


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
              <h1>Students({data.length})</h1>
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
                onChange={(e) => setSearchText(e.target.value)}
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

export default TeacherStudens;
