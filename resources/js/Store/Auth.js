import { defineStore } from "pinia";

export const useStore = defineStore("main", {
    state:()=>({
        token:'sasas',
        user:{role:'admin'},
        // token:null,
        // user:null,
        permissions:[],
    }),
    getters:{
        GetToken:state=>state.token,
        GetUser:state=>state.user,
        GetPermissions:state=>state.permissions,
    },
    actions:{
        SetToken(token){
            this.token=token;
        },
        SetUser(user){
            this.user=user;
        },
        SetPermissions(permissions){
            this.permissions=permissions;
        },
    }
});