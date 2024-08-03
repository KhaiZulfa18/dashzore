import * as Icons from "@tabler/icons-react";

export default function GetIcons({name, size = 20, className = '', ...props}) {
    const Component = Icons[name];
        
    return Component ? <Component size={size} className={className} /> : null;
}