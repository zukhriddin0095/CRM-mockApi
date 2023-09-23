import { Fragment, useEffect, useState } from "react"
import request from "../server";
import {  Table, message } from "antd";


const StudentsPage = () => {
  
  const [allStudents, setallStudents] = useState([]);
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
      render: (allStudents) => (allStudents ? "yes" : "no"),
    },
  ];



   useEffect(() => {
    const fetchData = async () => {
      try {
          setLoading(true)
        const categoriesResponse = await request.get("/categories");
        const categoriesData = categoriesResponse.data;

        const promises = categoriesData.map((category) => {
          return request.get(`categories/${category.id}/products`);
        });
        
        const studentsLists = await Promise.all(promises);
        setLoading(false)

        const allStudents = studentsLists.flatMap((el) => el.data);
        message.log(allStudents);

        setallStudents(allStudents);
      } catch (error) {
        message.error(`Xatolik sodir bo'ldi: ${error}`);
      }
    };

    fetchData();
  }, []);

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
              <h1>Students({allStudents.length})</h1>
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
            </div>
          )}
          columns={columns}
          dataSource={allStudents}
          rowKey={(record) => record.id}
        />
        ;
      </div>
    </Fragment>
  );
}

export default StudentsPage