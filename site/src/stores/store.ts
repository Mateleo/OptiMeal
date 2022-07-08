import { defineStore } from "pinia";

import axios, { type AxiosRequestConfig } from "axios";
import qs from "qs";

interface user {
  _id: string;
  googleId: string;
  avatar: string;
  username: string;
  profile: "Gain" | "Normal" | "Lose";
  age: "teen" | "adult";
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
  profile: "Gain" | "Normal" | "Lose";
  age: "teen" | "adult";
}

interface menu {
  _id: string;
  Recette: string;
  type: string;
  repas: [];
  Image: string;
  apports: { Calories: number; proteines: number; glucide: number; lipide: number };
  name: string;
}

export const useStore = defineStore("main", {
  state: () => ({
    userData: {} as user,
    weekApport: [] as any,
    weekMenu: [] as menu[][],
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
    getAge(state) {
      return state.userData.age;
    },
    getProfile(state) {
      return state.userData.profile;
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
    async fetchWeekMenu() {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/plat/random/" + this.getAge + this.getProfile,
        {
          withCredentials: true,
        }
      );
      this.weekMenu = response.data[0];
      this.weekApport = response.data[1];
      console.log("fetch week menu");
      console.log(response.data);
    },
    async updateUserProfile(data: PromiseUser) {
      console.log(data);
      const options: AxiosRequestConfig = {
        method: "PUT",
        url: import.meta.env.VITE_API_URL + "/user",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        withCredentials: true,
        data: qs.stringify(data),
      };
      await axios(options);
      console.log("update profile");
    },
    getPetitDej(index: number) {
      const menu = this.weekMenu[index];
      return menu.filter((plat) => plat.repas[0] == "petit dej");
    },
    getDej(index: number) {
      const menu = this.weekMenu[index];
      return menu.filter((plat) => plat.repas[0] == "dej");
    },
    getDiner(index: number) {
      const menu = this.weekMenu[index];
      return menu.filter((plat) => plat.repas[0] == "diner");
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
    getRecete(recettelink: string) {
      for (let x = 0; x < 7; x++) {
        for (let i = 0; i < this.weekMenu[x].length; i++) {
          console.log(this.weekMenu[x][i]);
          if (this.weekMenu[x][i]._id == recettelink) {
            return this.weekMenu[x][i].Recette;
          }
        }
      }
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
    async plannerJoin(data: { _id: string; username: string }, plannerlink: string) {
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
