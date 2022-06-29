import { defineStore } from "pinia";

import axios, { type AxiosRequestConfig } from "axios";
import qs from "qs";

interface user {
  _id: string;
  googleId: string;
  avatar: string;
  username: string;
  planner: [planner];
}

interface planner {
  _id: string;
  name: string;
  link: string;
  users: any;
}

interface PromisePlanner {
  _id?: string;
  name?: string;
  link?: string;
  users?: [{ username: string; userId: string; datezone: [string?] }];
}

interface PromiseUser {
  _id: string;
  datezone?: Array<string>;
}

export const useStore = defineStore("main", {
  state: () => ({
    userData: {} as user,
  }),
  getters: {
    getUsername(state) {
      return state.userData.username;
    },
    getAvatar(state) {
      return state.userData.avatar;
    },
    getUserId(state) {
      return state.userData._id;
    },
  },
  actions: {
    async fetchProfile() {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/users/myprofile",
        {
          withCredentials: true,
        }
      );
      this.userData = response.data;
      console.log("fetch profile");
      console.log(this.userData);
    },
    async fetchUserPlanners(userid: string) {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/planner/" + userid,
        {
          withCredentials: true,
        }
      );
      console.log("fetch User planners");
      console.log(response.data);
      this.userData.planner = response.data;
    },
    async putPlanner(data: PromisePlanner) {
      console.log(data);
      const options: AxiosRequestConfig = {
        method: "PUT",
        url: import.meta.env.VITE_API_URL + "/planner/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        withCredentials: true,
        data: qs.stringify(data),
      };
      await axios(options);
      console.log("create card");
    },
    async updateUserDateZone(data: PromiseUser, plannerlink: string) {
      console.log(data, plannerlink);
      const options: AxiosRequestConfig = {
        method: "PATCH",
        url: import.meta.env.VITE_API_URL + "/planner/" + plannerlink,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        withCredentials: true,
        data: qs.stringify(data),
      };
      await axios(options);
      console.log("create card");
    },
    async plannerJoin(data: { _id: string,username:string }, plannerlink: string) {
      console.log(data, plannerlink);
      const options: AxiosRequestConfig = {
        method: "PATCH",
        url: import.meta.env.VITE_API_URL + "/planner/join/" + plannerlink,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        withCredentials: true,
        data: qs.stringify(data),
      };
      await axios(options);
      this.fetchUserPlanners(this.userData._id);
    },
    async saveUserDateZone(
      data: { _id: string; dateZone: Array<any> },
      plannerid: string
    ) {
      const options: AxiosRequestConfig = {
        method: "PATCH",
        url: import.meta.env.VITE_API_URL + "/users/" + plannerid,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        withCredentials: true,
        data: qs.stringify(data),
      };
      await axios(options);
      this.fetchUserPlanners(this.userData._id);
    },
    async getUsernamebyId(userid: string) {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/users/name/" + userid,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    auth(connection: string) {
      console.log(import.meta.env.VITE_API_URL + "/auth/" + connection);
      return import.meta.env.VITE_API_URL + "/auth/" + connection;
    },

    setUserData(payload: user) {
      this.userData = payload;
    },
  },
});
