const globals = {
  colors: {
    primary: {
      1: "#FFE4A3",
      2: "#FFC947",
      3: "#C5AA6B",
    },
    secondary: {
      0: "#C4F2FC",
      1: "#7BCADB",
      2: "#6FABB8",
      3: "#486E76",
    },
    accent: {
      1: "#C1A2F5",
      2: "#9E80CF",
      3: "#4C2E80",
    },
    brown: {
      100: "#FFFCEB",
      200: "rgba(243, 238, 208, 0.5)",
      300: "#DBCEAF",
      400: "#AE9E79",
      500: "#806854",
      600: "#635243",
      700: "#382B20",
    },
  },
  boxShadow: {
    standard: "2px 2px 4px 2px #DBCEAF",
    hover: "6px 6px 2px 0px #DBCEAF",
  },
  borderRadius: {
    standard: "5px",
    large: "7.5px",
  },
  thickness: {
    standard: "8px",
  },
  fontSize: (width = window.innerWidth) => {
    if (width > 1300) {
      return {
        header: "72px",
        subheader: "64px",
        standard: "32px",
        body: "20px",
      };
    } else if (width > 1000) {
      return {
        header: "60px",
        subheader: "38px",
        standard: "24px",
        body: "16px",
      };
    } else if (width > 768) {
      return {
        header: "54px",
        subheader: "36px",
        standard: "22px",
        body: "16px",
      };
    } else {
      return {
        header: "48px",
        subheader: "38px",
        standard: "20px",
        body: "16px",
      };
    }
  },
  screen: {
    mobile: "500px",
    tablet: "1000px",
    desktop: "1300px",
    large: "1920px",
  },
  timings: {
    fast: "0.2s",
    standard: "0.4s",
    slow: "0.6s",
  },
};

export default globals;
