import { subscription } from "./subscription";
import { initializeBinding } from "./utils";

const defaultPosition = "bottom";
let current = null;

const addActiveStyle = (target) => {
  target.classList.add("button--active");
  current = target;
};

const removeActiveStyle = (target) => {
  target.classList.remove("button--active");
};

const addClickEventListener = (target, params) => {
  const onClick = (currentEvent) => {
    if (current) removeActiveStyle(current);

    addActiveStyle(target);

    subscription.$emit("show:click", {
      ...params,
      target,
      currentEvent,
    });

    const onClickOutside = (currentEvent) => {
      subscription.$emit("hide:click", {
        ...params,
        target,
        currentEvent,
      });

      removeActiveStyle(target);

      document.removeEventListener("click", onClickOutside);
    };

    document.addEventListener("click", onClickOutside);
    currentEvent.stopPropagation();
  };

  target.addEventListener("click", onClick);

  target.popoverRemoveHandlers = () =>
  target.removeEventListener("click", onClick);
};

export const directive = () => {
  return {
    bind: function(target, binding) {
      const params = initializeBinding(defaultPosition, binding);
      addClickEventListener(target, params);
    },
    unbind: function(target) {
      target.popoverRemoveHandlers();
    },
  };
};
