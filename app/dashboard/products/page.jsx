import Pagination from "../../ui/dashboard/pagination/pagination"
import Search from "../../ui/dashboard/search/search"
import Link from "next/link"
import styles from "../../ui/dashboard/products/products.module.css";
import Image from "next/image";
import noProduct from "../../../noproduct.png"
import { fetchProducts } from "@/app/lib/data";

const Products = async({searchParams}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const {data:products, count, errMsg} = await fetchProducts(q,page);

  if(errMsg) {
    return <h1>{errMsg}</h1>
  }
  // const products = [
  //   {
  //     id: 1,
  //     title: "Sample Product 1",
  //     desc: "This is a description for Sample Product 1",
  //     price: 19.99,
  //     createdAt: "2024-09-19T12:34:56Z", // ISO date format
  //     stock: 25,
  //     img: "/product1.jpg"
  //   },
  //   {
  //     id: 2,
  //     title: "Sample Product 2",
  //     desc: "This is a description for Sample Product 2",
  //     price: 29.99,
  //     createdAt: "2024-08-15T11:22:33Z",
  //     stock: 12,
  //     img: "/product2.jpg"
  //   },
  //   {
  //     id: 3,
  //     title: "Sample Product 3",
  //     desc: "This is a description for Sample Product 3",
  //     price: 39.99,
  //     createdAt: "2024-07-30T09:15:47Z",
  //     stock: 5,
  //     img: "/product3.jpg"
  //   },
  //   {
  //     id: 4,
  //     title: "Sample Product 4",
  //     desc: "This is a description for Sample Product 4",
  //     price: 15.99,
  //     createdAt: "2024-09-10T10:10:10Z",
  //     stock: 0, // Out of stock
  //     img: "/product4.jpg"
  //   },
  //   {
  //     id: 5,
  //     title: "Sample Product 5",
  //     desc: "This is a description for Sample Product 5",
  //     price: 49.99,
  //     createdAt: "2024-06-19T14:25:10Z",
  //     stock: 40,
  //     img: "/product5.jpg"
  //   }
  // ];
  
    return (
      <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
          <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.length <= 0 && (
            <tr style={{"fontSize":"12px","color":"grey"}}>There is no products yet</tr>
          )}
        {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={product.img || noProduct}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {product.title}
                </div>
              </td>
              <td>{product.desc}</td>
              <td>${product.price}</td>
              <td>{product.createdAt?.toString().slice(4, 16)}</td>
              <td>{product.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${product.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  {/* <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
    )
  }
  
  export default Products