// "use client"
import { deleteUser } from "@/app/lib/actions";
import { fetchUsers } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import noUser from "@/nouser.png";
import { DateTime } from "luxon";

// import { useEffect } from "react";

const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { data: users, count, errMsg } = await fetchUsers(q, page);

  if (errMsg) {
    return <h1>{errMsg}</h1>;
  }

  if (users) {
    console.log("users", users);
  }

  // const res = await fetchUsers();
  // console.log("res",res)

  // useEffect(()=>{
  //   if(users){
  //     console.log("users",users)
  //   }
  // },[users])

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
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
        {users.length <= 0 && (
            <tr style={{ fontSize: "12px", color: "grey" }}>
              There are no user yet
            </tr>
          )}
          {users?.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img || noUser}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              {/* <td> {user.createdAt && DateTime.fromISO(user.createdAt).toFormat('dd-LLL-yyyy, HH:mm')}</td> */}
              {/* <td>{user.createdAt?.toString().slice(4,24)}</td> */}

              <td>
                {user.createdAt &&
                DateTime.fromJSDate(new Date(user.createdAt)).isValid
                  ? DateTime.fromJSDate(new Date(user.createdAt)).toFormat(
                      "dd-LLL-yyyy, HH:mm"
                    )
                  : "Invalid date"}
              </td>
              <td>{user.isAdmin ? "Admin" : "Client"}</td>
              <td>{user.isActive ? "active" : "passive"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={(user._id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(users.length < count) && <Pagination count={count} />}
    </div>
  );
};

export default UsersPage;
