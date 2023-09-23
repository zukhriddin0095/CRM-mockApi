import { Fragment, useEffect, useState } from "react";
import request from "../server";
import { message } from "antd";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);



  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await request.get("categories");
    setData(data);
  }

   useEffect(() => {
     const fetchData = async () => {
       try {
         const categoriesResponse = await request.get("/categories");
         const categoriesData = categoriesResponse.data;

         const promises = categoriesData.map((category) => {
           return request.get(`categories/${category.id}/products`);
         });

         const productLists = await Promise.all(promises);

         const allProducts = productLists.flatMap((el) => el.data);
         message.error(allProducts);

         setAllProducts(allProducts);
       } catch (error) {
         message.error(`Xatolik sodir bo'ldi: ${error}`);
       }
     };

     fetchData();
   }, []);

  return (
    <Fragment>
      <div className="ant-layout-content">
        <div className="teacher__quantity">
          <h1>Barcha Teacherlar Soni</h1>
          <h2>({data.length})</h2>
        </div>
        <div className="students__quantity">
          <div className="teacher__quantity">
            <h1>Barcha Studentlar Soni</h1>
            <h2>({allProducts.length})</h2>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
