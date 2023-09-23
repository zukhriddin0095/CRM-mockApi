
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QqOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
const { Header, Sider } = Layout;



const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation()
  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/teachers",
              icon: <UsergroupDeleteOutlined />,
              label: <Link to="/teachers">Teachers</Link>,
            },
            {
              key: "/students",
              icon: <QqOutlined />,
              label: <Link to="/students">Students</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>

        <Outlet
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Outlet>
      </Layout>
    </Layout>
  );
};
export default App;
























// import { useState, useEffect } from "react";
// import request from "../server";

// function LoginPage() {
//   const [allProducts, setAllProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const categoriesResponse = await request.get("/categories");
//         const categoriesData = categoriesResponse.data;

//         const promises = categoriesData.map((category) => {
//           return request.get(`categories/${category.id}/products`);
//         });

//         const productLists = await Promise.all(promises);

//         const allProducts = productLists.flatMap((el) => el.data);
//         console.log(allProducts);

//         setAllProducts(allProducts);
//       } catch (error) {
//         console.error(`Xatolik sodir bo'ldi: ${error}`);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Barcha studentlar</h1>
//       <ul>
//         {allProducts.map((product, i) => (
//           <li key={product.id}>
//             {product.name} {i} <img src={product.avatar} alt="saasd" />{" "}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default LoginPage;