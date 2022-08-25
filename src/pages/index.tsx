import type { NextPage } from "next";
import { useUser } from "@auth0/nextjs-auth0";
import CreateOrganizationForm from "../forms/createOrganization";
import Link from "next/link";
import { useState } from "react";
import CreateUserForm from "../forms/createUser";

const Home: NextPage = () => {
  const [organizations, setOrganizations] = useState<{
    data: Array<{ id: string; name: string; display_name: string }>;
  } | null>(null);
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const viewOrganizations = async () => {
    try {
      const res = await fetch("/api/getOrganizations");
      if (res.status === 201) {
        const data = await res.json();
        console.log(data);
        setOrganizations(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("org..", organizations);

  if (user) {
    return (
      <div className="m-12">
        <div className="text-red-500">Welcome {user.name}!</div>
        {/* <button
          onClick={async () => {
            try {
              const response = await fetch("/api/createOrganization", {
                method: "POST",
              });
              const data = await response.json();
              console.log("data...", data);
            } catch (error) {
              console.log("error...", error);
            }
          }}
        >
          Create organization
        </button> */}

        <div>
          <button
            type="button"
            onClick={viewOrganizations}
            className="py-2 px-8 border-2 text-white rounded-md font-normal bg-violet-500 my-6"
          >
            View Organizations
          </button>
        </div>
        <div>
          {organizations &&
            organizations.data.map((item) => {
              return (
                <div className="py-4" key={item.id}>
                  <div>ID: {item.id}</div>
                  <div>Name: {item.display_name}</div>
                </div>
              );
            })}
        </div>
        {/* <div>
          <button
            type="button"
            onClick={viewConnections}
            className="py-2 px-8 border-2 text-white rounded-md font-normal bg-pink-500 my-6"
          >
            View Connections
          </button>
        </div> */}
        <hr />
        <div>
          <CreateOrganizationForm />
        </div>
        <hr />
        <div>
          <CreateUserForm />
        </div>
        <div>
          <Link href="/api/auth/logout">
            <a className="bg-red-500 p-2 text-white rounded-md">Logout</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Link href="/api/auth/login">
      <a className="bg-red-500 p-2 m-12 text-white rounded-md">Login</a>
    </Link>
  );
};

export default Home;
