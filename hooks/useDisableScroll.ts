import { useRef } from "react";

type UseDisableScrollReturnType = [() => void, () => void];

export const useDisableScroll = (): UseDisableScrollReturnType => {
  const scroll = useRef(false);

  const disableScroll = (): void => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    const { body } = document;

    if (!body || !body.style || scroll.current) return;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight = parseInt(window.getComputedStyle(body).getPropertyValue("padding-right")) || 0;

    html.style.position = "relative";
    body.style.position = "relative";
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

    scroll.current = true;
  };

  const enableScroll = (): void => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    const { body } = document;

    if (!body || !body.style || !scroll.current) return;

    html.style.position = "";
    html.style.overflow = "";
    body.style.position = "";
    body.style.overflow = "";
    body.style.paddingRight = "";

    scroll.current = false;
  };

  return [disableScroll, enableScroll];
};

