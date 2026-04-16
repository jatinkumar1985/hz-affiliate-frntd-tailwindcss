"use client";

import { pushToDataLayer } from "@/components/utils/dataLayer";

const GlobalButton=({children,type='button',name='button',className, data, eventName, onClick, ...props})=>{
  const handleClick=(e)=>{
    if(data && eventName){
      const eventData = {'event': eventName, ...data}
      pushToDataLayer(eventData);
    }
    if(onClick){onClick(e)}
  };
  return (<button className={className} type={type} aria-label={name} onClick={handleClick} {...props}>{children}</button>);
};
export default GlobalButton;
