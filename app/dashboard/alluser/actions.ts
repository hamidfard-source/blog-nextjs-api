'use server'
import { revalidateTag } from "next/cache";

interface UpdateRoleResponse{
    statusData:number;
    data:{
        message:string;
        result:any;
    }
}

export const UpdateRole = async (id: any, role: string):Promise<UpdateRoleResponse> => {
    try {
      const response = await fetch('http://localhost:3000/api/change-role', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, role }),
      });
  
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const statusData = response.status; 
      const data = await response.json(); 
  
      revalidateTag('users-data');
  
      return { statusData , data};
    } catch (error) {
      console.error('Error in UpdateRole:', error);
      throw error; 
    }
  };