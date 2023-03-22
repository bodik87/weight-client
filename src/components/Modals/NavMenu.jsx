import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DARK_MODE, RECIPES, SETTINGS } from "../../assets/CONSTANTS";

export default function NavMenu({ visible, setVisible }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const closeModal = () => setVisible(false);

  const handleRecipesClick = () => {
    setVisible(false);
    navigate("recipes");
  };
  const handleSettingsClick = () => {
    setVisible(false);
    navigate("cabinet");
  };

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  const [darkMode, setDarkMode] = useState(true);

  function darkModeToggle() {
    if (darkMode) {
      // const element = document.documentElement;
      // element.classList.toggle("dark");
      localStorage.theme = "dark";
      setDarkMode(!darkMode);
    } else {
      localStorage.theme = "light";
      setDarkMode(!darkMode);
    }
  }

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="max-w-xl mx-auto relative z-30"
        onClose={closeModal}
      >
        <div className="absolute bottom-20 left-0 right-3">
          <div className="flex items-center justify-end">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-3"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-3"
            >
              <Dialog.Panel className="max-w-xs overflow-hidden rounded-2xl shadow-lg transition-all">
                <button
                  type="button"
                  onClick={darkModeToggle}
                  className="menuItem"
                >
                  {DARK_MODE}
                </button>

                {pathname !== "/userpage/recipes" && (
                  <button
                    type="button"
                    onClick={handleRecipesClick}
                    className="menuItem"
                  >
                    {RECIPES}
                  </button>
                )}

                {pathname !== "/userpage/cabinet" && (
                  <button
                    type="button"
                    onClick={handleSettingsClick}
                    className="menuItem"
                  >
                    {SETTINGS}
                  </button>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
