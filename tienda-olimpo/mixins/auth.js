export const auth = {
  methods: {
    async verifyToken() {
      try {
        let url = "http://localhost:3001/verify";
        let { data } = await this.$axios.get(url);
        console.log(data);
      } catch (error) {
        this.$router.push("/login");
      }
    },
  },
};
