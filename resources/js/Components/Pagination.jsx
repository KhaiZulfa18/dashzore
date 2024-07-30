import { Link } from "@inertiajs/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function Pagination({ links, align }) {
    const alignmentClass = align === 'l' ? 'justify-start' :
                           align === 'r' ? 'justify-end' :
                           align === 'c' ? 'justify-center' : 'justify-end';

    return (
        <div className={`flex ${alignmentClass} join mt-4`}>
            {links.map(link => {
                const isPrevious = link.label.includes("Previous");
                const isNext = link.label.includes("Next");
                const isDisabled = !link.url;
                
                return (
                    <Link 
                        preserveScroll
                        href={link.url || ""}
                        key={link.label}
                        className={
                            "join-item px-3 py-1 text-sm border border-gray-400 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900 dark:border-gray-900 " + 
                            (link.active ? "bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-50" : "") + 
                            (isDisabled ? "!text-gray-400 cursor-not-allowed" : "hover:bg-gray-300")
                        }
                        style={isDisabled ? { pointerEvents: 'none' } : {}}
                    >
                        {isPrevious ? (
                            <IconChevronLeft size={20}/>
                        ) : isNext ? (
                            <IconChevronRight size={20}/>
                        ) : (
                            <span dangerouslySetInnerHTML={{__html: link.label}} />
                        )}
                    </Link>
                );
            })}
        </div>
    );
}