const url = "http://3.250.152.98:3000/api/item";
const API_KEY = ""; //Add your API key here

const app = Vue.createApp({
  data() {
    return {
      isListOpen: false,
      items: [],
    };
  },
  mounted: async function () {
    const res = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
    });
    const data = await res.json();
    this.items = data.data.map((item) => {
      return { ...item, isItemMenuOpen: false };
    });
  },
  methods: {
    toggleList() {
      this.isListOpen = !this.isListOpen;
    },
    async onChangeIsDone(id, value) {
      this.items.map((item) =>
        item.uuid === id ? (item.done = !value) : item
      );
      const res = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
        body: JSON.stringify({ done: !value }),
      });
      const data = await res.json();
      this.items.map((item) =>
        item.uuid === id ? (item.done = data.done) : item
      );
    },
    openItemMenu(id) {
      this.items.map((item) =>
        item.uuid === id
          ? (item.isItemMenuOpen = !item.isItemMenuOpen)
          : (item.isItemMenuOpen = false)
      );
    },
    async onDelete(id) {
      this.items.map((item) => (item.isItemMenuOpen = false));
      this.items = this.items.filter((item) => item.uuid !== id);
      await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "api-key": API_KEY,
        },
      });
    },
    onClick(e) {
      if (
        !e.target.classList.contains("moreOptionsBtnDiv") &&
        !e.target.classList.contains("moreOptionsDiv") &&
        !e.target.classList.contains("menuItemTitle") &&
        !e.target.classList.contains("menuItem1") &&
        !e.target.classList.contains("menuItem2") &&
        !e.target.classList.contains("menuItemIcon1") &&
        !e.target.classList.contains("menuItemIcon2") &&
        !e.target.classList.contains("menuItemText1") &&
        !e.target.classList.contains("menuItemText2") &&
        !e.target.classList.contains("moreOptionsTitleAndExitBtnDiv") &&
        !e.target.classList.contains("menuItemTitle")
      ) {
        this.items.map((item) => (item.isItemMenuOpen = false));
      }
    },
  },
});

app.mount("#app");
