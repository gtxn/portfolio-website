import create from "zustand";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

const useStore = create((set) => ({
  scrollPos: 0,
  deviceType: "",
  mousePos: {
    x: 0,
    y: 0,
  },
  isJoystickStopped: false,
  pages: {
    home: {
      component: <Home />,
      title: "Home",
    },
    about: {
      component: <About />,
      title: "About",
    },
    projects: {
      component: <Projects />,
      title: "Projects",
    },
    contact: {
      component: <Contact />,
      title: "Contact",
    },
  },
  windowWidth: window.innerWidth,
  setScrollPos: (scrollPos) => set((state) => ({ ...state, scrollPos })),
  setDeviceType: (deviceType) => set((state) => ({ ...state, deviceType })),
  setMousePos: (mousePos) => set((state) => ({ ...state, mousePos })),
  setIsJoystickStopped: (isJoystickStopped) =>
    set((state) => ({ ...state, isJoystickStopped })),
  setWindowWidth: (windowWidth) => set((state) => ({ ...state, windowWidth })),
}));

export default useStore;
