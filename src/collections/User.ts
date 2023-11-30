import { CollectionConfig } from "payload/types";

export const Users :CollectionConfig={
 slug: "users",
auth:{
  verify:{
    generateEmailHTML: ({token}) => {
      return `<p>Click <a href="http://localhost:3000/confirm?token=${token}">here</a> to confirm your email.</p>`
    },
  }
},
access:{
  create: () => true,
  read: () => true,
},
 fields: [
  {
   name: "role",
   // admin:{
  // condition: ({req}) => req.user?.role === "admin",
   // },
   required:true,
   defaultValue:"user",
   type: "select",
   options:[
    {label:"Admin", value:"admin"},
    {label:"User", value:"user"},
   ]
  },

 ],
}