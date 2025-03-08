import UserTable from "@/components/userTable";
import { Metadata } from "next";

export const metadata: Metadata = {
    title:'blog.io | all users'
}

const Page = async () => {
    const response = await fetch('http://localhost:3000/api/users'
    ,{   method: 'GET' 
        ,next:{tags:['users-data']}
    });

    const allUsers = await response.json();
    return (
        <div className="p-6">
            <h3>all user get : </h3>
            <UserTable data={allUsers} />
        </div>
    );
}

export default Page;
