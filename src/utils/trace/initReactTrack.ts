import React from 'react';

interface InitReactTrack {
  onClickEvent?: (message: any) => void;
}

const getReactFCInitializer = ({ onClickEvent }: InitReactTrack) => {
  const originalCreateElement = React.createElement;

  const propsWithTrackEvents = (props: any) => {
    if (props.track) {
      const reactClick = props.onClick;
      props.onClick = (e: any) => {
        onClickEvent?.(props.track);
        reactClick?.(e);
      };
    }
    return props;
  };

  React.createElement = (...reset) => {
    const args = Array.prototype.slice.call([...reset]);

    let props = args[1];

    if (props && props.track) {
      props = propsWithTrackEvents(props || {});
    }

    return originalCreateElement.apply(null, [...args]);
  };
};

export const initReactTrack = ({ onClickEvent }: InitReactTrack) => getReactFCInitializer({ onClickEvent });

/* 第二种方法 */
export const injectReportEvent = (callback: (any) => void) => {
  ['mousedown', 'touchstart'].forEach(eventType => {
    let timer;
    window.addEventListener(eventType, event => {
      clearTimeout(timer);
      const elementsPath = createEventPath(event);
      const dataSet = getDateSet(elementsPath);
      timer = setTimeout(() => {
        const target = event.target;
        callback({
          eventType,
          target,
          subType: 'click',
          reportData: dataSet || parse(dataSet),
          paths: (event as any).path?.map(item => item.tagName).filter(Boolean),
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
          },
          navigator: window.navigator,
        });
      }, 100);
    });
  });
};

function getDateSet(elements: HTMLElement[]) {
  let result = null;
  for (const ele of elements) {
    if (ele.dataset && Object.keys(ele.dataset).length > 0) {
      result = ele.dataset;
      break;
    }
  }
  return result;
}

function createEventPath(event: Event) {
  const res = [];
  let pointer = event.target;
  while (pointer) {
    res.push(pointer);
    pointer = (pointer as any).parentElement;
  }
  return res;
}

function parse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}
